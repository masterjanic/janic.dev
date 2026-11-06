# janic.dev

Personal tech blog. Built with [Hugo](https://gohugo.io/) and hosted on Cloudflare Workers static assets.

## Local development

You need Hugo Extended 0.169.0. The version is pinned in `.github/workflows/deploy.yml`.

```bash
hugo server --buildDrafts   # preview at http://localhost:1313
hugo --minify               # production build into public/
python3 scripts/check_links.py public
```

To test the real headers and redirects, build first and then run Wrangler. It needs real Node.js and does not work through Bun's `node` shim:

```bash
PATH="$HOME/.nvm/versions/node/v24.15.0/bin:$PATH" npx wrangler@4.158.0 dev --local
```

## Writing a post

```bash
hugo new content posts/my-post/index.md
```

Put images next to `index.md`. They are converted to responsive WebP automatically. The build fails if a post has no `description`, no `tags`, or an image without alt text.

- **`date` and `lastmod`:** set both by hand. Bump `lastmod` only for real content changes, not for typo fixes.
- **`cover`:** a 1200px or wider image next to `index.md`. Without one, a title card is generated for social sharing.
- **`draft: true`:** keeps the post out of production builds. Remove it to publish.

### Mentioning Virtbase

| Mention | What to do |
|---|---|
| Editorial link in a post | Set `virtbase: true` in the front matter. It adds the founder disclosure at the top. |
| Promo box | Use the `cta` shortcode below. It is labelled as an ad and uses `rel="sponsored"`. |

```markdown
{{</* cta title="Virtbase VPS" button="See plans" */>}}Why it fits this post.{{</* /cta */>}}
```

Do not add `rel="noreferrer"` to Virtbase links.

## Project layout

| Path | Purpose |
|---|---|
| `content/` | Pages and posts in Markdown |
| `static/_headers`, `static/_redirects` | Security headers, caching, and redirects. Add a line to `_redirects` for each new top-level page. |
| `static/.well-known/security.txt` | Security contact. Its `Expires` date must be renewed before 2027-10-31. |
| `themes/terminal/` | Local copy of [panr/hugo-theme-terminal](https://github.com/panr/hugo-theme-terminal) at commit `8ef994c`, MIT licensed and edited directly. It does not track upstream. |
| `scripts/check_links.py` | Internal link check for CI |

## Deployment

Pushes to `main` deploy to production. Pull requests upload a preview version. Both need these repository secrets:

- `CLOUDFLARE_API_TOKEN`: token from the Edit Cloudflare Workers template
- `CLOUDFLARE_ACCOUNT_ID`

### Cloudflare settings

These live in the dashboard, not in this repo.

| Setting | Value | Why |
|---|---|---|
| Redirect Rule | `https://www.*` to `https://${1}`, 301, with a proxied `www` record | `_redirects` cannot redirect between hostnames |
| Always Use HTTPS | On | The redirect rule leaves `http://` alone |
| "Add security headers" Managed Transform | Off | Hides referrals to virtbase.com and adds deprecated headers |
| Email Obfuscation | Off | Crawlers and readers without JavaScript see `[email protected]` |
| Bot Fight Mode | Off | Can challenge good crawlers |
| Rocket Loader | Off | Conflicts with the Content Security Policy |
| AI crawler policies | Check the live values | Keep search crawlers allowed |
| Web Analytics | Off | The privacy policy says there is no analytics. Update it and the CSP first if this changes. |
