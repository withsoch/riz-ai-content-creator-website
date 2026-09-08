import Link from "next/link";
import type { Metadata } from "next";

import "./creator.css";
import { bebasNeue } from "@/components/displayFont";
import Reveal from "@/components/v3/Reveal";
import V3Nav from "@/components/v3/V3Nav";
import V3Footer from "@/components/v3/V3Footer";
import ReachBar from "@/components/v3/ReachBar";
import HeroReel from "@/components/v3/HeroReel";
import Newsletter from "@/components/v3/Newsletter";
import V3Faq from "@/components/v3/V3Faq";
import StickyCta from "@/components/v3/StickyCta";
import LatestWriting from "@/components/v3/LatestWriting";

import PersonalityCarousel from "@/components/PersonalityCarousel";
import { getAllGuides } from "@/lib/guides";
import { REACH, PRESS, TOOLS } from "@/components/v3/audience";

/* ============================================================
   Homepage — the creator cut.

   The business site (withsoch/riz-ai-business-website) speaks to
   an owner with a broken process. This one speaks to the two
   audiences that show up here instead:

     1. automation enthusiasts — people who want to learn the
        thing, not hire someone to do it
     2. brands — AI tool companies looking for someone who can
        explain their product without embarrassing them

   Those wants are different enough that they get different pages.
   This one is free-first: guides, reels, newsletter, nothing
   gated. The brand pitch lives on /brands as a sendable media
   kit, with a band near the bottom here pointing at it and a
   permanent door in the nav.

   That split is buildwithnav.com's actual architecture — / for
   the audience, /brands for the media kit — and it's the right
   call. A page that sells to brands while asking readers to
   subscribe does neither job. See DESIGN-NOTES.md.
   ============================================================ */

export const metadata: Metadata = {
  title: "Riz · AI builder, writer, occasional stand-up",
  description:
    "I build AI automations for a living and publish the working parts. Free guides on Claude, ChatGPT, Gemini and n8n. No hype, no affiliate links, no tool I haven't broken myself.",
};

const WAYS = [
  {
    n: "01",
    title: "The guides",
    desc: "Practical walkthroughs on Claude, ChatGPT, Gemini and n8n. Written from builds that actually shipped, which is why several of them are mostly about what went wrong.",
    cta: "Read the guides",
    href: "/guides",
  },
  {
    n: "02",
    title: "The reels",
    desc: "Short breakdowns, live builds, and the occasional stand-up bit about AI. Including the one calling out what ships versus what gets posted.",
    cta: "Watch on Instagram",
    href: "https://www.instagram.com/etz.riz/reels/",
    external: true,
  },
  {
    n: "03",
    title: "The newsletter",
    desc: "Conversations with Riz. Money. Machines. Meaning. What I built that week, what broke, and what it cost.",
    cta: "Subscribe free",
    href: "#newsletter",
  },
];

const FAQ = [
  {
    q: "Is any of this actually free?",
    a: "All sixteen guides, the whole back catalogue of writing, and the newsletter. No email wall on the guides — they're static pages, you can read them without telling me anything. The newsletter asks for an email because that's how a newsletter works.",
  },
  {
    q: "Do you take money from the tools you cover?",
    a: "Sometimes, and when I do it says so on the piece. Paid work is labelled every time, including in the caption, not just in a hashtag at the bottom. If it isn't labelled, nobody paid for it.",
  },
  {
    q: "Why should I trust a guide over the official docs?",
    a: "You shouldn't, for reference material — the docs are better. The guides are for the part docs never cover: what breaks in practice, what the thing costs to run once it's live, and which of the three obvious approaches is the one that survives contact with real data.",
  },
  {
    q: "Do you teach this properly, or just publish about it?",
    a: "Both. The publishing is free. The teaching runs through Soch Academy — hands-on sessions with a team on their own work rather than a course nobody finishes. Different page, different thing.",
  },
];

export default function V3Home() {
  // Server component: lib/guides.ts reads the filesystem, so the guide list is
  // built here rather than fetched.
  const guides = getAllGuides();
  const total = guides.length;
  // Cards need an excerpt to look right; the count must not be filtered by
  // that or the copy contradicts the button ("Sixteen guides" / "All 15").
  const featured = guides
    .filter((g) => g.excerpt)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6);

  return (
    <div className={`v3 ${bebasNeue.variable}`}>
      <div className="v3-grain" aria-hidden="true" />

      {/* ---------- ANNOUNCEMENT BAR ---------- */}
      <div className="v3-bar">
        <a
          href="https://conversationswithriz.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="v3-bar-tag">Newsletter</span>
          <span className="v3-bar-txt">Conversations with Riz — Money. Machines. Meaning.</span>
          <span className="v3-bar-arrow">→</span>
        </a>
      </div>

      <V3Nav />

      {/* ---------- HERO ---------- */}
      <section className="v3-hero">
        <div className="v3-hero-dots" aria-hidden="true" />
        <div className="v3-hero-frame" aria-hidden="true" />

        <div className="v3-hero-inner">
          <div className="v3-hero-grid">
            <div>
              <Reveal>
                <p className="v3-eyebrow">
                  <span className="dot" />
                  Tallinn · AI builder, writer, occasional stand-up
                </p>
              </Reveal>

              {/* The creator version of the two-beat headline. /v2's names a
                  business problem; this one names what I do and what you get
                  out of it, because the reader here isn't buying anything. */}
              <h1 className="v3-h1">
                <Reveal variant="mask" as="span">
                  <span>I build the automations.</span>
                </Reveal>
                <Reveal variant="mask" as="span">
                  <span>
                    <span className="v3-h1-2">
                      Then I show you exactly how.
                      <span className="v3-sweep" aria-hidden="true" />
                    </span>
                  </span>
                </Reveal>
              </h1>

              <Reveal>
                <p className="v3-hero-sub">
                  Ten years running operations at Careem, Bolt and Wise. Now I build AI systems
                  for a living and publish the working parts — guides, teardowns, and the
                  occasional joke about all of it.{" "}
                  <b>No hype, no affiliate links, no tool I haven&apos;t broken myself.</b>
                </p>
              </Reveal>

              <Reveal>
                <div className="v3-cta-row">
                  <Link href="/guides" className="v3-btn-o">
                    Start with the guides <span className="v3-arr">→</span>
                  </Link>
                  <a href="#newsletter" className="v3-btn-g">
                    Get the newsletter <span className="v3-arr">→</span>
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal>
              <HeroReel />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- REACH ---------- */}
      <ReachBar stats={REACH} />

      {/* ---------- PRESS ---------- */}
      <div className="v3-press">
        <div className="v3-press-row">
          <span className="v3-press-k">Written about in</span>
          {PRESS.map((p) => (
            <span className="v3-press-n" key={p}>
              {p}
            </span>
          ))}
          <span className="v3-press-partner">Anthropic Claude Partner Network</span>
        </div>
      </div>

      {/* ---------- THREE WAYS IN ---------- */}
      <section className="v3-sec v3-sec--white" id="start">
        <div className="v3-w">
          <Reveal>
            <div className="v3-head">
              <span className="v3-label">Start here</span>
              <h2 className="v3-h2">
                Three ways in.
                <br />
                <span className="oh">All of them free.</span>
              </h2>
              <p className="v3-sub">
                Most people arrive from a reel and want the long version, or arrive from a guide
                and want the short one. Pick whichever end you&apos;re at.
              </p>
            </div>
          </Reveal>

          <Reveal variant="stagger" className="v3-ways">
            {WAYS.map((w) =>
              w.external ? (
                <a
                  key={w.n}
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v3-way"
                >
                  <div className="v3-way-n">{w.n}</div>
                  <div className="v3-way-t">{w.title}</div>
                  <p className="v3-way-d">{w.desc}</p>
                  <span className="v3-way-cta">
                    {w.cta} <span className="v3-arr">↗</span>
                  </span>
                </a>
              ) : (
                <Link key={w.n} href={w.href} className="v3-way">
                  <div className="v3-way-n">{w.n}</div>
                  <div className="v3-way-t">{w.title}</div>
                  <p className="v3-way-d">{w.desc}</p>
                  <span className="v3-way-cta">
                    {w.cta} <span className="v3-arr">→</span>
                  </span>
                </Link>
              )
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------- GUIDES ---------- */}
      <section className="v3-sec v3-sec--off" id="guides">
        <div className="v3-w">
          <Reveal>
            <div className="v3-head">
              <span className="v3-label">The library</span>
              <h2 className="v3-h2">
                {total} guides.
                <br />
                <span className="oh">No email wall.</span>
              </h2>
              <p className="v3-sub">
                Each one is a thing I actually needed to work, written up while it was still
                annoying me. Claude, ChatGPT, Gemini, n8n, ElevenLabs.
              </p>
            </div>
          </Reveal>

          <Reveal variant="stagger" className="v3-guides">
            {featured.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="v3-guide">
                <div className="v3-guide-top">
                  <span className="v3-pill">{g.tool}</span>
                  <span className="v3-pill v3-pill--muted">{g.category}</span>
                </div>
                <div className="v3-guide-t">{g.title}</div>
                <p className="v3-guide-e">{g.excerpt}</p>
                <span className="v3-guide-m">{g.readingTime} min read</span>
              </Link>
            ))}
          </Reveal>

          <Reveal>
            <div style={{ marginTop: 40, textAlign: "center" }}>
              <Link href="/guides" className="v3-btn-g">
                All {total} guides <span className="v3-arr">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- TOOLS TICKER ----------
          Two rows scrolling opposite ways: the tools covered in the guides,
          and the stack the client builds actually run on. Every name is
          defensible — see components/v3/audience.ts. */}
      <div className="v3-ticker">
        <div className="v3-ticker-head">
          <span className="v3-ticker-eyebrow">Tools I&apos;ve put through real work</span>
        </div>
        <div className="v3-ticker-wrap">
          <div className="v3-ticker-track v3-ticker-track--a">
            {[...TOOLS.covered, ...TOOLS.covered].map((t, i) => (
              <span className="v3-ti v3-ti--strong" key={`c-${t}-${i}`}>
                {t}
              </span>
            ))}
          </div>
          <div className="v3-ticker-track v3-ticker-track--b">
            {[...TOOLS.built, ...TOOLS.built].map((t, i) => (
              <span className="v3-ti" key={`b-${t}-${i}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- WATCH ---------- */}
      <section className="v3-sec v3-sec--white" id="watch">
        <div className="v3-w" style={{ marginBottom: 40 }}>
          <Reveal>
            <div className="v3-head">
              <span className="v3-label">Watch</span>
              <h2 className="v3-h2">
                Systems, and the
                <br />
                <span className="oh">person building them.</span>
              </h2>
              <p className="v3-sub">
                Live builds, breakdowns, the podcast, and the stand-up. The automations are the
                job; this is the rest of it.
              </p>
            </div>
          </Reveal>
        </div>
        <PersonalityCarousel />
      </section>

      {/* ---------- BRAND TEASER ----------
          The bridge to /brands. Deliberately one band rather than a full
          pitch: a reader who came for a guide shouldn't have to scroll past
          a media kit, and a brand shouldn't have to guess whether I do this. */}
      <section className="v3-sec v3-sec--ink" id="brands-teaser">
        <div className="v3-w v3-teaser-grid">
          <div>
            <Reveal>
              <span className="v3-label">For brands</span>
              <h2 className="v3-h2">
                I don&apos;t review tools.
                <br />
                <span className="oh">I put them through real work.</span>
              </h2>
              <p className="v3-sub">
                If you make an AI product and you&apos;re tired of creators who read the
                talking points off your one-pager: I spent a decade as the operator your tool is
                trying to reach, and I still ship systems on this stack every week. Your product
                gets used before it gets filmed.
              </p>
            </Reveal>
            <Reveal>
              <div style={{ marginTop: 30, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/brands" className="v3-btn-o">
                  See the partnership options <span className="v3-arr">→</span>
                </Link>
                <Link href="/brands#enquire" className="v3-btn-d">
                  Start a campaign <span className="v3-arr">→</span>
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal variant="stagger" className="v3-teaser-chips">
            <div className="v3-chip">
              <span className="v3-chip-n">10+ yrs</span>
              <span className="v3-chip-t">
                <b>Careem · Bolt · Wise</b>I&apos;ve been the buyer your tool is pitching to.
              </span>
            </div>
            <div className="v3-chip">
              <span className="v3-chip-n">Partner</span>
              <span className="v3-chip-t">
                <b>Anthropic Claude Partner Network</b>I build on this stack commercially, not
                just on camera.
              </span>
            </div>
            <div className="v3-chip">
              <span className="v3-chip-n">Labelled</span>
              <span className="v3-chip-t">
                <b>Every paid piece, every time</b>Disclosure protects your credibility as much
                as mine.
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- WRITING ---------- */}
      <LatestWriting />

      {/* ---------- FAQ ---------- */}
      <V3Faq
        eyebrow="Questions"
        heading="Before you"
        accent="go digging."
        items={FAQ}
        surface="off"
      />

      {/* ---------- NEWSLETTER ---------- */}
      <Newsletter />

      <V3Footer />

      <StickyCta href="#newsletter" label="Get the newsletter →" />
    </div>
  );
}
