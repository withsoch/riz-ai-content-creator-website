# Design notes — the creator pages

Why `/` and `/brands` look the way they do.

They were built as `/v3` and `/v3/brands` in
[`withsoch/riz-web-new`](https://github.com/withsoch/riz-web-new), a third
homepage sitting beside the old one and beside the business cut (now
[`withsoch/riz-ai-business-website`](https://github.com/withsoch/riz-ai-business-website)),
so the three could be compared rather than argued about.

They serve the two audiences the business site doesn't: **automation
enthusiasts** who want to learn the thing rather than hire someone to do it,
and **brands** looking for someone who can explain their AI product without
embarrassing them.

The notes below are kept as written, so the reasoning survives. They refer to
the pages by their old prototype paths — `/v3` is now `/`, `/v3/brands` is now
`/brands`, and `/v2` is the business site.

---

## Why it's two pages, not one

The two audiences want opposite things. An enthusiast wants everything free
and no pitch. A brand wants rates, formats, audience size and a way to start a
conversation. A single page that asks readers to subscribe while selling
campaign slots does neither job — and buries the media kit three-quarters of
the way down a page about free guides.

buildwithnav.com solves this the same way: `/` is the audience, `/brands` is a
full media-kit page with its own nav (The Work / Audience / Rates / Work With
Me). That's the right architecture and this site copies it.

- **`/`** — free-first. Guides, reels, newsletter, nothing gated. One dark
  band near the bottom points brands at the media kit; the nav CTA does the
  same permanently.
- **`/brands`** — a sendable URL. One link a brand manager can paste into a
  Slack thread and have a colleague understand the offer in ninety seconds.

## What changed from /v2, and why

| | Business site (owner) | This site (creator) |
|---|---|---|
| Hero right side | Static portrait | **Autoplaying 9:16 reel**, sound opt-in |
| Headline | Names a business problem | Names what I do and what you get |
| Bar under hero | Outcomes — $3.9M, 92%, 20s | **Reach** — impressions, guides, press |
| Nav CTA | "Book a call" | **"Brand partnerships"** — the reader isn't buying; the one visitor who is, is a brand |
| Main offer | Three ways to hire me | **Three ways in, all free** |
| Body | Case studies, testimonials | **16 guides, tools ticker, reels, newsletter** |
| Close | Booking form | **Newsletter** (`/`) / **campaign brief** (`/brands`) |
| Footer | Site footer, "Got a process worth fixing?" | `V3Footer` — free stuff first |

Everything else — palette, Bebas display face, pill buttons, hairline section
rhythm, grain, mask headline reveals — is shared with the business site on purpose. Whichever
direction wins, the two agree, and switching display faces is still one line
(`--v3-display` in `app/creator.css`).

## The honesty policy — read this before sending the media kit anywhere

**Every number on both pages is read from `components/v3/audience.ts`.** Nothing
is estimated, rounded up or inferred.

Four figures are documented and safe to send today:

| Figure | Where it comes from |
|---|---|
| 1M+ cross-platform impressions | The Bolt / Labour Dispute Committee story |
| 160K members reached | LinkedIn reach on the same story |
| 16 free guides | Counted from `public/guides` at build time |
| 3 press features | Äripäev, Delfi, Sifted |

**Five are missing, and they render as visible dashed "Add number" slots**
rather than plausible-looking inventions: LinkedIn, Instagram, YouTube and
Substack follower counts, plus the monthly-views total. They're the ones only
you can see. Fill in the value, flip `verified` to `true`, done — nothing else
needs to change.

I left them visible rather than hiding the rows because a media kit is a
document brands will hold you to. An obvious gap costs you nothing; a number
you can't defend in the follow-up call costs you the account.

## What I did NOT invent

- **No follower counts, engagement rates or view totals.** Nav's `/brands`
  leads with "80+ brands, 4 million monthly views, 10.2% avg engagement". Those
  are his and they're real. I have no equivalent figures for you, so the page
  argues from what is documented — a decade of operating experience, the
  Anthropic partnership, the press, and the guides — instead of a follower
  count.
- **No past brand campaigns.** Nav's strongest section is six named sponsored
  posts with results (Higgsfield 2.45M views, Submagic 109 tracked signups).
  That section isn't in `/brands` because there's nothing true to put in it
  yet. **It is the single highest-value thing you could add** — one named
  campaign with a real number beats every other paragraph on the page. Slot it
  between "Not an influencer" and "Four formats".
- **No rate card.** The rates block explains how pricing works and promises a
  real figure in 48 hours. Numbers there are yours to set.

## Content that came from the repo, not from me

The guides grid, tool ticker and counts are all read from real files:
`getAllGuides()` parses `public/guides/*.html` at build time, and the tools
ticker is built from those files' `guide-tool` meta tags (Claude ×6, ChatGPT
×3, Gemini ×2, n8n ×2, Zapier, Make, ElevenLabs). Add a guide, the page updates.

## Things worth fixing in the source data

- **`fix-chatgpt-s-memory-in-60-seconds.html`** has the excerpt `"ChatGPT"` —
  a stub, not a sentence. It renders as a one-word card.
- **One guide has no `guide-tool`, `guide-category` or excerpt at all**
  (`cinematic-film-portrait-prompts`), so it never appears in the featured six.
- **Two guides say "a Soch Consulting guide"** in their titles. Per your own
  naming note the company is **Soch**, not Soch Consulting.
- **`public/videos` is 109MB in git.** The homepage uses the smallest file
  (`riz-reel.mp4`, 2.7MB) above the fold deliberately; the next smallest is
  5.4MB and `riz-reel-6.mp4` is 49MB. If the reel hero survives, those want to
  move to Vercel Blob and get a proper poster frame rather than reusing the
  portrait.

## Open decisions

1. **The reel is a placeholder pick.** It's the only file small enough to
   autoplay above the fold, not necessarily the right one. A purpose-cut 6–8
   second loop with a real poster frame would be much stronger.
2. **YouTube URL is a stub.** `audience.ts` points at `youtube.com` because I
   don't have the "Life of Riza" channel URL.
3. **Soch Academy isn't on the page.** It's arguably a fourth "way in" for the
   enthusiast audience, but it was still WIP at last mention — add it when
   `academy.withsoch.com` is live.
4. **The overlap with the business repo is unresolved.** Both repos still
   serve `/about`, `/guides`, `/blog`, `/case-studies` and `/services/*`.
   See `README.md` — it's the first thing in it.

## Not yet verified

Checked in a desktop browser at ~1470px, including the reel autoplay, the FAQ
accordion, the format checkboxes and the TBC slots. **Mobile breakpoints were
not visually confirmed** — the browser window wouldn't resize during the
session they were built in. The business site carries the same caveat.

---

## Blast radius

Not applicable any more — these are the whole creator site, not prototype
routes beside something else.

For the record, when they shipped in `riz-web-new` they added `app/v3/**` and
`components/v3/**`, plus `components/displayFont.ts`, and gave `ChromeGate` a
`slot` prop so the footer could be replaced as well as the nav. Every other
route rendered identically. Those routes came across to this repo unchanged,
which is why the seam described in `README.md` → *Two design systems* — and the
overlap with the business repo — both exist.
