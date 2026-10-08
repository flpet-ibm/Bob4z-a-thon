# How to Update the Website

## Site structure at a glance

| What | Where |
|---|---|
| Hero, modal ("New to Bob?") | `docs/index.html` |
| Lab card content (title, steps, prompts) | `docs/tracks/setup.html`, `track-1.html` … `track-4.html` |
| Colors, layout | `docs/css/styles.css` |
| Full lab guides (GitHub / PDF reading) | `EN/*.md` |

> ⚠️ The `EN/*.md` files and the `docs/tracks/*.html` files are **independent** — editing one does not update the other.

## Quick steps to update a lab card

1. Open the matching file — e.g. `docs/tracks/track-1.html` for Lab 1.
2. Edit the text directly (titles, descriptions, prompts, step numbers).
3. Commit and push — GitHub Pages redeploys in ~1 minute.

## Quick steps to update the full lab guide

1. Open the matching file — e.g. `EN/1-LabDiscoverCBSA_EN.md`.
2. Edit in Markdown as usual.
3. Commit and push.

## Keeping them in sync with Bob

The HTML track cards and the Markdown lab guides can drift apart over time. **IBM Bob can help bridge them** — open a track HTML file alongside its matching Markdown, then ask:

> *"Sync `docs/tracks/track-1.html` with the content of `EN/1-LabDiscoverCBSA_EN.md` — update titles, descriptions, and steps to match."*

Bob will read both files and apply the changes to the HTML card for you.
