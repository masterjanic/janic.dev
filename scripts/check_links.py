#!/usr/bin/env python3
"""Fail if any internal link or asset in the built site points at a missing file.

Usage: check_links.py [public_dir]
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

SITE_HOST = "janic.dev"


class Refs(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.add(attrs["id"])
        for key in ("href", "src"):
            if attrs.get(key):
                self.refs.append(attrs[key])
        for part in (attrs.get("srcset") or "").split(","):
            if part.strip():
                self.refs.append(part.split()[0])


def resolve(root, page, path):
    target = (root / path.lstrip("/")) if path.startswith("/") else (page.parent / path)
    if target.is_dir():
        target = target / "index.html"
    return target


def main():
    root = Path(sys.argv[1] if len(sys.argv) > 1 else "public").resolve()
    pages = sorted(root.rglob("*.html"))
    if not pages:
        sys.exit(f"no HTML files found in {root}")

    parsed = {}
    for page in pages:
        parser = Refs()
        parser.feed(page.read_text(encoding="utf-8"))
        parsed[page] = parser

    broken = []
    for page, parser in parsed.items():
        for ref in parser.refs:
            url = urlsplit(ref)
            if url.scheme and url.scheme not in ("http", "https"):
                continue
            if url.netloc and url.netloc != SITE_HOST:
                continue
            path = unquote(url.path)
            target = resolve(root, page, path) if path else page
            if not target.exists():
                broken.append((page, ref))
            elif url.fragment and target in parsed and url.fragment not in parsed[target].ids:
                broken.append((page, ref))

    for page, ref in broken:
        print(f"{page.relative_to(root)}: broken link {ref}")
    print(f"checked {len(pages)} pages, {len(broken)} broken links")
    sys.exit(1 if broken else 0)


if __name__ == "__main__":
    main()
