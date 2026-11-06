---
title: "Hello World"
date: 2026-11-06T12:00:00+01:00
lastmod: 2026-11-06T12:00:00+01:00
draft: true
description: "A template post showing the Markdown features this blog supports. Replace it before publishing."
tags: ["meta"]
---

This draft shows what posts can use. It is never published while `draft: true` is set.

## Code

```bash
# Blank lines survive the copy button.
hugo server --buildDrafts

hugo --minify
```

## Text

Regular paragraphs, `inline code`, and [links](/about/) work as usual.

> Quotes look like this.

| Column | Value |
|---|---|
| One | 1 |
| Two | 2 |

## Virtbase promo box

Set `virtbase: true` in the front matter to show the disclosure at the top of a post.

{{< cta title="Virtbase VPS" button="See plans" >}}One sentence on why it fits this post.{{< /cta >}}
