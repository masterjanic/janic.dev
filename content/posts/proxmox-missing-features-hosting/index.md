---
title: "The Two Features Proxmox Is Still Missing for Hosting"
date: 2026-11-06T22:52:10+01:00
lastmod: 2026-11-06T22:52:10+01:00
virtbase: false
description: "Proxmox still can't upload snippets through the API or let non-root users set hookscripts. Why that hurts hosting providers, and how I patched it."
tags: ["proxmox", "hosting", "virtualization"]
---

During my development of the open-source hosting platform [Virtbase](https://virtbase.com/), I started hitting unexpected issues around the Proxmox VE API:

- You can't upload a snippet through the API.
- You can't set a hookscript unless you are `root@pam`.

I ended up patching Proxmox VE 9 to fix both. After checking the upstream source again in November 2026, there is still no solution in sight.

## Snippets can't be uploaded through the API

Snippets are small files that Proxmox keeps on a storage. These are usually cloud-init configs and hookscripts. Hookscripts are the part that matters most to me. A hookscript is triggered on the node at each stage of a VM's life: before and after start/stop.[^1]

This is especially relevant if you want to keep track of migration states between nodes, without excessively hammering Proxmox with polling API calls.

So each VM on Virtbase gets one. It's a short Perl script which sends a webhook to our platform at each stage. The `post-stop` stage also executes when a guest crashes.

To attach that script, it first has to exist on the node. This is where the API stops. The upload endpoint[^2] accepts three content types, and snippets aren't one of them:

```perl
enum => ['iso', 'vztmpl', 'import'],
```

So you can upload a whole ISO through the API, but not a small script.

Possible workarounds include copying the files over SSH or putting them on a shared storage from outside Proxmox. Both are annoying on a platform that does everything else through one API. A web app holding root SSH access to hypervisors is exactly what I'm trying to avoid.

I'm not the only one who ran into this. People asked about it on the forum in 2019,[^3] it's tracked as bug 2208,[^4] and patches reached the mailing list in 2022[^5] and 2024.[^6]

The fix itself is simple. Add `snippets` to the list and point it at the snippet directory:

```diff
--- a/API2/Storage/Status.pm
+++ b/API2/Storage/Status.pm
-                enum => ['iso', 'vztmpl', 'import'],
+                enum => ['iso', 'vztmpl', 'import', 'snippets'],
```

That wasn't enough, though. Proxmox forces uploaded files to mode `0644`, and it refuses a hookscript that isn't executable. Unfortunately, the upload API has no way to set a file mode. That means a script uploaded this way could never be used.

A second patch is needed. If the first line of an uploaded snippet starts with `#!`, the mode should become `0755`. Everything else stays at `0644` (cloud-init configs).

```perl
if ($content eq 'snippets') {
    my $head = '';
    if (open(my $fh, '<', $tmpfilename)) {
        $head = <$fh> // '';
        close($fh);
    }
    chmod 0755, $tmpfilename if $head =~ m/^#!/;
}
```

The final copy step also needed `cp --preserve=mode`, otherwise the mode gets lost on the way to the storage.

## Only root can set a hookscript

With the script on the node, it still has to be attached to the VM. The stock permission check[^7] sorts every VM option into a category with its own privilege. `hookscript` isn't in any category, so it falls through to the end:

```perl
# catches args, lock, etc.
# new options will be checked here
die "only root can set '$opt' config\n";
```

An insecure root API token sounds like the way out, but that doesn't work either. The check at the top is an exact match:

```perl
return 1 if $authuser eq 'root@pam';
```

A token isn't `root@pam`. It's `root@pam!token-name`, and people on the forum report the same error with root tokens.[^8] The only API possibility left is logging in as `root@pam` by password. This doesn't fit an automated platform, least of all with two-factor authentication on that account.

So even with the file in place, every new VM would need `qm set` run as root on the node. For a platform that creates customer VMs on demand, that isn't an option.

This fix is one line. It moves `hookscript` into the general options, so `VM.Config.Options` is sufficient:

```diff
--- a/API2/Qemu.pm
+++ b/API2/Qemu.pm
     'template' => 1,
+    'hookscript' => 1,
 };
```

## Keeping the patches alive

Patching is the easy part. Keeping the patches applied is the actual work, because any update to `libpve-storage-perl` or `qemu-server` overwrites the patched files without telling you.

I shipped the patches as a Debian package, [virtbase-pve-patches](https://github.com/virtbase/virtbase/tree/main/tooling/pve-patches), including four layers of protection:

1. **A dpkg file trigger** on `/usr/share/perl5/PVE` reapplies the patches whenever a package writes there, including during unattended upgrades.

2. **A daily systemd timer** catches anything that bypassed dpkg. It has a randomized delay, so the nodes of a cluster don't all restart `pvedaemon` at once.

3. **Prometheus metrics** report each patch as applied, pending or unknown. Unknown means the patch no longer matches upstream and retrying is not possible.

4. **A daily CI job** tests the patches against the newest packages in `pve-no-subscription` and `pve-test`. This enables me to update the repo before any breakage.

The trigger itself is one line:

```text
interest-noawait /usr/share/perl5/PVE
```

The `noawait` part[^9] is an important decision in the package. Without it, a mismatched patch could leave `qemu-server` unconfigured in the middle of an upgrade. A failed reapply is logged and shows up in your metrics, but it never fails the dpkg transaction.

Patches also apply with `--fuzz=0`. If the code around a patch changes, it should fail loudly instead of landing in the wrong place in a file with root-level permissions.

## The trade-off

I don't think Proxmox is at fault. A hookscript runs as root on the node, so the restriction exists for a good reason.

My patches remove that protection. Anyone who can upload snippets (`Datastore.AllocateTemplate`) and edit a VM's options (`VM.Config.Options`) can now run code as root on that node. In practice, those two privileges together equal root, so make sure your groups and permissions are set up correctly.

This isn't a security gain over SSH. What I get is one authenticated path for everything, with no root SSH keys for the platform to manage.

## What I'd like to see upstream

I'd happily delete this package. Two changes would be enough:

1. **Snippets in the upload API**, with a way to mark a file as executable.
2. **A dedicated privilege for hookscripts**, separate from `VM.Config.Options` and clearly documented as root-equivalent. Admins could then grant it on purpose, and tokens could use it.

Until then, the [patches are open source](https://github.com/virtbase/virtbase/tree/main/tooling/pve-patches). If you run Proxmox behind an API and have solved this differently, I'd like to hear how: [contact@janic.dev](mailto:contact@janic.dev).

[^1]: Proxmox VE Administration Guide, [Hookscripts](https://pve.proxmox.com/pve-docs/pve-admin-guide.html#_hookscripts).
[^2]: Proxmox VE source, `pve-storage`: [`src/PVE/API2/Storage/Status.pm`](https://github.com/proxmox/pve-storage/blob/master/src/PVE/API2/Storage/Status.pm).
[^3]: Proxmox forum, [Creating snippets using PVE API](https://forum.proxmox.com/threads/creating-snippets-using-pve-api.54081/), 2019.
[^4]: Proxmox Bugzilla, [bug 2208](https://bugzilla.proxmox.com/show_bug.cgi?id=2208).
[^5]: pve-devel mailing list, [snippet upload patch thread](https://lore.proxmox.com/pve-devel/1649671205.6346.35.camel@guerby.net/T), 2022.
[^6]: pve-devel mailing list, [storage: enable upload for snippets](https://lists.proxmox.com/pipermail/pve-devel/2024-July/064937.html), July 2024.
[^7]: Proxmox VE source, `qemu-server`: [`src/PVE/API2/Qemu.pm`](https://github.com/proxmox/qemu-server/blob/master/src/PVE/API2/Qemu.pm).
[^8]: Proxmox forum, [PVE Tokens, API, and Hookscripts](https://forum.proxmox.com/threads/pve-tokens-api-and-hookscripts.160435).
[^9]: Debian manual, [deb-triggers(5)](https://manpages.debian.org/trixie/dpkg-dev/deb-triggers.5.en.html).
