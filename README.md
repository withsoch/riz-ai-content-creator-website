# riz-ai-content-creator-website

Rizwan Mahmood's creator site — free guides, reels, the newsletter, and a media
kit for AI-tool brand partnerships. Next.js App Router, TypeScript, Tailwind v4.

The two creator pages are the design prototyped as `/v3` and `/v3/brands` in
[`withsoch/riz-web-new`](https://github.com/withsoch/riz-web-new), promoted here
to `/` and `/brands`. `DESIGN-NOTES.md` records the reasoning.

## ⚠️ Read this first — the overlap with the business repo

This repo and
[`withsoch/riz-ai-business-website`](https://github.com/withsoch/riz-ai-business-website)
were both cut from the same source, so **they currently serve the same
secondary routes**: `/about`, `/blog`, `/writing`, `/guides`, `/guides/[slug]`,
`/case-studies`, `/booking` and `/services/*`.

That is a decision waiting to be made, not a design. Two sites publishing
identical `/about` and `/guides` pages will compete with each other in search
and double the maintenance. The reason it's like this is that neither site has a
domain yet, so pointing one at the other would have produced dead links.

Three ways out, whenever you pick domains:

1. **Split by audience.** This repo keeps `/`, `/brands`, `/guides`, `/blog`,
   `/writing`, `/about`. The business repo keeps `/`, `/services/*`,
   `/case-studies`, `/booking`. Cross-link absolutely between the two domains.
   Cleanest, and what the two repos are actually for.
2. **One site, two front doors.** Merge back into one deployment where `/` is
   the creator homepage and `/business` (or a subdomain) is the business one.
   Everything shared stays shared.
3. **Leave it and add canonical tags.** Cheapest, worst for maintenance.

Until then: **any edit to a shared route has to be made twice.** The routes that
are genuinely only in this repo are `/` and `/brands`.

## Getting started

```bash
npm install
cp .env.example .env.local     # then fill in the webhook, see Brand enquiries
npm run dev                    # http://localhost:3000
```

```bash
npm run build
npm run start
npm run lint
```

## Routes

```
/            the creator homepage — guides, reels, newsletter, reach
/brands      the media kit — formats, audience, rates, enquiry
/about       /guides        /blog       /booking      /services
             /guides/[slug] /writing    /case-studies /services/{consulting,projects,speaking}
```

Plus `app/api/writing-posts` — a JSON endpoint `LatestWriting` calls to refresh
the Substack list client-side. `/writing` is an intentional 307 to `/blog`.

## ⚠️ Audience numbers — five are missing on purpose

**Every figure on `/` and `/brands` is read from
`components/v3/audience.ts`.** Nothing is estimated, rounded up or inferred,
because a media kit is a document brands will hold you to.

Four are documented and safe to send today:

| Figure | Source |
|---|---|
| 1M+ cross-platform impressions | The Bolt / Labour Dispute Committee story |
| 160K members reached | LinkedIn reach on the same story |
| 16 free guides | Counted from `public/guides` at build time |
| 3 press features | Äripäev, Delfi, Sifted |

**Five are missing and render as visible dashed "Add number" slots** rather
than plausible-looking inventions: the LinkedIn, Instagram, YouTube and
Substack follower counts, plus the monthly-views total. Fill in the value, flip
`verified` to `true`, and nothing else needs to change.

They were left visible rather than hidden because an obvious gap costs you
nothing, while a number you can't defend on the follow-up call costs you the
account. **Don't send `/brands` to a brand until they're filled in.**

`audience.ts` also carries a `source` note on each figure, so any claim can be
traced back. Keep that up to date.

## Two design systems, on purpose

| | `/` and `/brands` | Every other route |
|---|---|---|
| Styles | `app/creator.css` | `app/globals.css` |
| Nav | `components/v3/V3Nav.tsx` — sticky, CTA is "Brand partnerships" | `components/Navbar.tsx` — hides on scroll-down |
| Footer | `components/v3/V3Footer.tsx` — free stuff first | `components/Footer.tsx` — "Got a process worth fixing?" |
| Display face | Bebas Neue, condensed uppercase | Archivo |
| Buttons | 100px pills with a coral shadow | 8px rectangles |

Both share the colour tokens in `app/globals.css`, so they don't clash on
colour — but they are visibly different systems, and the creator pages are the
newer one. **The other routes have not been brought across.** That's the main
outstanding work here; see *Known issues*.

`components/ChromeGate.tsx` keeps the two navs and two footers from stacking: it
suppresses the shared `Navbar` and `Footer` on `/` and `/brands` only. It
matches those paths **exactly** — as a prefix, `/` would match every path on the
site and strip the chrome from all of them.

### The `v3-` prefix

Creator class names and the `components/v3/` directory all carry a `v3-`
prefix. Historical: this started as a third homepage sitting beside two others.
Kept rather than swept, because renaming ~350 selectors buys tidiness and risks
one silent miss. Read it as a namespace. Everything is scoped under `.v3`, so
creator styles cannot leak into the older routes.

## Type system

| Role | Font | Variable |
|---|---|---|
| Display — headings | **Archivo** | `--font-display` |
| Body | **Inter Tight** | `--font-body` |
| Mono — figures, labels | **IBM Plex Mono** | `--font-mono` |

Plus **Bebas Neue** from `components/displayFont.ts`, applied only on `/` and
`/brands` via `--v3-display`. To run them on Archivo instead, change that one
line in `app/creator.css`.

**Watch out:** many declarations still use older variable names —
`--font-playfair`, `--font-fraunces`, `--font-inter-tight`, `--font-montserrat`,
`--font-dm-sans`, `--font-geist-mono`, `--font-dm-mono`, `--font-bebas`. Those
fonts are **not** loaded; each is aliased to one of the three roles in
`app/globals.css`. Map by **role**, not name — `--font-inter-tight` resolves to
the *display* face.

### Size rule

Every `font-size` in `app/` and `components/`: **minimum 14px, rounded up to
the next even number.** Nothing below 14, nothing odd, no fractions. This is why
creator labels sit at 14px where buildwithnav.com runs ~10.5px, with wider
letter-spacing buying back the small-caps read.

Sizes are declared four ways — CSS `font-size`, `clamp()`, inline
`fontSize: "14px"`, and bare numeric `fontSize: 14`. Any sweep must cover all
four. **Exception:** `public/guides/guide-styles.css` styles the standalone
guide HTML files and runs its own scale.

## Colour tokens

Defined in `:root` in `app/globals.css`. Contrast against white unless noted.

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--ink` | `#22332C` | headings, dark sections | 13.3 |
| `--body` | `#333333` | body copy | 12.6 |
| `--ink2` | `#3C4642` | secondary text | 9.8 |
| `--muted` | `#55514A` | small labels, meta | 7.9 |
| `--faint` | `#5E594E` | dates, fine print | 7.0 |
| `--coral` | `#EA6A47` | accents, CTAs | 3.2 |
| `--amber` | `#D79A36` | the TBC marker dot | 2.45 |

On the dark `--ink` blocks, "fainter" means *lighter*, not darker — darkening a
grey on a dark ground collapses its contrast. The oranges sit below WCAG AA
deliberately; don't "fix" them without asking. `rgba(34,51,44,α)` values are
floored at **α 0.72**; an audit reading `rgba()` as opaque will report them as
passing when they aren't.

## Where content comes from

| Section | Source |
|---|---|
| Guides grid, counts, tools ticker | `lib/guides.ts` parses `public/guides/*.html` at build time. The ticker is built from each file's `guide-tool` meta tag. Add a guide, the homepage updates. |
| Writing | Substack RSS via `lib/substack.ts`, through `app/api/writing-posts` |
| Reels | `components/PersonalityCarousel.tsx` + `public/videos/` |
| Hero reel | `components/v3/HeroReel.tsx` — `public/videos/riz-reel.mp4` |
| Reach, platforms, tools, press | `components/v3/audience.ts` |
| Formats, rates, FAQs, "what I won't do" | Hard-coded at the top of `app/brands/page.tsx` |

## Brand enquiries

`/brands` offers two paths: **`CalBookingButton`** (`components/CalModal.tsx`,
a Cal.com modal) and the brief form in `components/v3/PartnerEnquiry.tsx`.

The form POSTs to `NEXT_PUBLIC_N8N_CONSULTING_FORM_WEBHOOK` — the same webhook
the consulting form uses — tagged `source: "creator-brands"` so partnership
enquiries can be routed away from client work. It sends the budget band,
timeline and selected formats along with the message.

**With the env var unset the form shows an honest error and points at the
calendar. It never fakes a success.** Set it in Vercel as well as locally.

## Motion

`components/v3/Reveal.tsx` handles rise, stagger and mask headline reveals off
one `IntersectionObserver`, with `app/creator.css` owning the motion and the
`prefers-reduced-motion` opt-out. buildwithnav.com does the same with GSAP +
ScrollTrigger + SplitText + Lenis and a fonts gate that hides `<body>` until
they load; not worth the weight or the white-screen risk.

The hero reel sets `muted` imperatively in an effect. React applies `muted` as
a DOM property, but Chrome checks the *attribute* when it evaluates the autoplay
policy — the JSX prop alone leaves playback blocked silently (`readyState` 0,
paused, no error). Don't "simplify" that back.

## Layout

```
app/          routes; globals.css (older routes), creator.css (/ and /brands)
components/   shared UI; components/v3/* is the creator kit
contexts/     audio-context.tsx — the portrait track player
hooks/        useParallax.ts
lib/          guides.ts, substack.ts, sounds.ts
public/       images, videos, audio, logos, guides/*.html
DESIGN-NOTES.md  why these pages are the way they are; read before redesigning
design.md     token inventory — STALE, see below
CV-AUDIT.md   what was checked against the CV, what's still open
```

## Deployment

Not wired up yet. This repo has no Vercel project attached.

When it is: production branch `main`, and set
`NEXT_PUBLIC_N8N_CONSULTING_FORM_WEBHOOK` in the project's env vars or the brand
enquiry form fails closed.

> **If a push to `main` doesn't reach the live site,** check Vercel → Settings →
> Git → **Production Branch**. Renaming a Git branch does not update that field,
> so it can end up pointing at a branch that no longer exists — every push then
> silently builds as a *Preview* and production freezes on its last good deploy.
> This bit the original repo once.

## Known issues

- **The overlap with the business repo.** See the warning at the top. Biggest
  open decision.
- **Five audience numbers are placeholders.** See above. `/brands` is not
  sendable until they're filled in.
- **No past-campaign results section.** buildwithnav.com's equivalent page
  leads with six named sponsored posts and real numbers, and it's the strongest
  thing on it. There was nothing true to put here, so the section doesn't
  exist. **One named campaign with a real number would beat every other
  paragraph on `/brands`.** `DESIGN-NOTES.md` says where it slots in.
- **The other routes are still on the old design.** `/about`, `/guides`,
  `/blog`, `/services/*`, `/case-studies` use `app/globals.css`, the
  scroll-hiding navbar and the consulting-flavoured footer. Anyone clicking off
  the creator pages sees the seam.
- **The hero reel is a placeholder pick.** `riz-reel.mp4` is the only file small
  enough (2.7MB) to autoplay above the fold; the next smallest is 5.4MB. A
  purpose-cut 6–8 second loop with a real poster frame would be much stronger —
  it currently reuses the portrait as its poster.
- **`public/videos` is 109MB committed to git** (one file is 49MB), most of the
  repo. All 7 are used by the reels carousel. Moving them to Vercel Blob would
  make clones and deploys far cheaper.
- **YouTube URL is a stub.** `audience.ts` points at `youtube.com` — the
  "Life of Riza" channel URL was never supplied.
- **Soch Academy isn't on the page.** Arguably a fourth "way in" for the
  enthusiast audience; add it when `academy.withsoch.com` is live.
- **Guide source-data problems.** `fix-chatgpt-s-memory-in-60-seconds.html` has
  the excerpt `"ChatGPT"` — a stub, so it renders as a one-word card.
  `cinematic-film-portrait-prompts` has no tool, category or excerpt at all, so
  it never reaches the featured six. Two guides say *"a Soch Consulting
  guide"*; the company is **Soch**.
- **`design.md` is stale.** It documents Montserrat / Fraunces / Geist Mono;
  the site runs Archivo / Inter Tight / IBM Plex Mono plus Bebas Neue.
- **`components/ServicesHubDiagram.tsx`** renders a 588-unit viewBox into a
  ~300px box, so its SVG labels come out at **5.4px** — the only text on the
  site below the 14px floor. SVG `font-size` is in user units, so the size rule
  doesn't catch it.
- **`lib/sounds.ts` → `playToggleSound()` is now unreferenced.** It drove a
  workflow toggle on the old homepage, which isn't in this repo.
