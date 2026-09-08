# riz-ai-content-creator-website

Read `README.md` first. Two things in it will bite you otherwise:

1. **Five audience numbers on `/brands` are deliberate placeholders** that
   render as visible "Add number" slots. Every figure comes from
   `components/v3/audience.ts`. Never fill one in with an estimate — a media
   kit is a document brands hold you to.
2. **This repo shares its secondary routes with
   `withsoch/riz-ai-business-website`.** An edit to `/about`, `/guides`,
   `/blog`, `/case-studies` or `/services/*` has to be made in both until that
   overlap is resolved.

`DESIGN-NOTES.md` records why `/` and `/brands` look the way they do: what was
taken from buildwithnav.com, what was deliberately left out, and the open
decisions. Read it before redesigning either page.

This is a standard Next.js App Router project. Nothing exotic — no custom
compiler, no patched framework.
