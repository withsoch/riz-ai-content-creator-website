import Link from "next/link";
import type { Metadata } from "next";

import "../creator.css";
import { bebasNeue } from "@/components/displayFont";
import Reveal from "@/components/v3/Reveal";
import V3Nav from "@/components/v3/V3Nav";
import V3Footer from "@/components/v3/V3Footer";
import V3Faq from "@/components/v3/V3Faq";
import StickyCta from "@/components/v3/StickyCta";
import PartnerEnquiry from "@/components/v3/PartnerEnquiry";
import { PLATFORMS, PRESS, REACH, TOOLS } from "@/components/v3/audience";

/* ============================================================
   /brands — the media kit.

   A separate page on purpose. A brand manager evaluating a
   creator wants one URL they can paste into a Slack thread and
   have their colleague understand the offer in ninety seconds:
   who the audience is, what the formats are, what it costs, and
   what the creator won't do. That document shouldn't be buried
   three-quarters of the way down a page about free guides.

   Structurally this follows buildwithnav.com/brands — hero,
   stat bar, "not an influencer, an operator", format cards,
   audience table, rates, enquiry. What's different is the
   honesty policy: every number is read from
   components/v3/audience.ts, and the five I don't have render
   as visible TBC slots rather than plausible inventions.
   ============================================================ */

export const metadata: Metadata = {
  title: "Brand partnerships · Riz",
  description:
    "AI tool partnerships with an operator, not an influencer. Ten years of ops at Careem, Bolt and Wise. Formats, audience, rates, and what I won't do.",
};

const CRED = [
  {
    n: "10+ yrs",
    title: "Careem · Bolt · Wise",
    desc: "Ops leadership across four continents. I have been the buyer your tool is trying to reach, sitting in the meeting where it gets rejected.",
  },
  {
    n: "$3.9M",
    title: "Cut from one cost line",
    desc: "One automation programme at Bolt, courier cost from 21% to 14% of GMV. I know what “it works” has to look like on a P&L, not a demo.",
  },
  {
    n: "Partner",
    title: "Anthropic Claude Partner Network",
    desc: "I build on this stack commercially through Soch, not just on camera. Client systems run on it every week.",
  },
  {
    n: "Zero code",
    title: "Still shipped the thing",
    desc: "Built and launched a browser hand-tracking game with no coding background. If I can't get your tool working, neither can the audience you're aiming at.",
  },
];

const FORMATS = [
  {
    n: "01",
    title: "Reel integration",
    desc: "Your tool inside a real task, cut to 9:16. The kind people send to a colleague rather than scroll past. Instagram-native, cross-posted to LinkedIn where the operators are.",
    meta: [
      ["Format", "9:16 vertical, Instagram + LinkedIn"],
      ["Turnaround", "10 working days from access"],
      ["You get", "The reel, raw files, and usage rights on your own channels"],
      ["Best for", "A product with one clear moment that lands in 30 seconds"],
    ],
    featured: true,
    badge: "Most booked",
  },
  {
    n: "02",
    title: "Build video",
    desc: "Long-form. Your tool doing an actual job start to finish, including the part where it doesn't work first time. This is where a product that needs eight minutes gets eight minutes.",
    meta: [
      ["Format", "YouTube long-form, chaptered"],
      ["Turnaround", "3 weeks"],
      ["You get", "The video, timestamps, a pinned link, and the clips cut from it"],
      ["Best for", "Tools with depth that short-form flattens"],
    ],
    featured: false,
  },
  {
    n: "03",
    title: "Written teardown",
    desc: "A LinkedIn post and a Substack piece on where your tool fits, what it replaces, and who it isn't for. Read by operators making buying decisions rather than viewers killing time.",
    meta: [
      ["Format", "LinkedIn post + Substack essay + graphics"],
      ["Turnaround", "2 weeks"],
      ["You get", "Both pieces, the graphics, and the comment thread"],
      ["Best for", "Positioning, not just awareness"],
    ],
    featured: false,
  },
  {
    n: "04",
    title: "Live session",
    desc: "A workshop or webinar with your product in the room and a real audience building on it. They leave having used it, which is a different thing from having seen it.",
    meta: [
      ["Format", "Live workshop or co-hosted webinar"],
      ["Turnaround", "4 weeks, scheduling-dependent"],
      ["You get", "The session, the recording, and everything built during it"],
      ["Best for", "Launches and activation, not top-of-funnel"],
    ],
    featured: false,
  },
];

const WONT = [
  "Post about a tool I haven't used on real work first",
  "Read your script — you get my voice, or something nobody watches",
  "Hide the partnership. Every paid piece is labelled, in the caption, every time",
  "Promise view counts. I'll show you what past pieces did; I won't guarantee the next one",
  "Claim a product does something it doesn't, however the brief is worded",
];

const FAQ = [
  {
    q: "Can we see the script before it goes live?",
    a: "You see it, and you get one round of factual corrections — if I've described what the product does wrongly, that's my mistake and I'll fix it. What you don't get is edit rights over the opinion or the framing. That line is the whole reason the audience believes any of it, and softening it is how sponsored content stops working for everyone.",
  },
  {
    q: "Will you guarantee a number of views?",
    a: "No, and be careful with anyone who does. I'll show you what comparable pieces actually did, and I'll tell you honestly whether your product suits the format you're asking for. Guaranteed numbers usually mean paid distribution or bought engagement, and neither is what you're hiring me for.",
  },
  {
    q: "How do you handle competitors?",
    a: "I won't run two directly competing tools in the same month, and I'll tell you if a competitor has approached me while your campaign is live. I don't do blanket category exclusivity by default — if you want it, it's a separate conversation and it costs more, because it's genuinely restrictive.",
  },
  {
    q: "What does it cost?",
    a: "It depends on format and usage rights, and I'd rather give you a real number than a range you have to guess inside. Send the product and the timeline and you'll get a figure within 48 hours. As a rough shape: written work is the cheapest, reels sit in the middle, long-form video and live sessions are the top end. Perpetual usage on your own paid channels is priced separately from an organic post.",
  },
  {
    q: "What if you try it and don't like it?",
    a: "Then I'll tell you before we sign anything, and there's no invoice. That's happened, and it's better for both of us than a lukewarm video that reads as lukewarm to everyone watching. I'd rather lose the fee than spend the audience's trust on something I don't rate.",
  },
  {
    q: "Who actually watches this?",
    a: "Operators, founders and ops people in small-to-mid B2B companies, mostly in Europe, plus a working-in-AI audience that skews technical and sceptical. Not a consumer audience, and not a large one by influencer standards — it's a room where people have budget and are allergic to hype. The breakdown by platform is below.",
  },
];

export default function V3Brands() {
  return (
    <div className={`v3 ${bebasNeue.variable}`}>
      <div className="v3-grain" aria-hidden="true" />

      <div className="v3-bar">
        <Link href="/">
          <span className="v3-bar-tag">Media kit</span>
          <span className="v3-bar-txt">
            Everything a brand needs on one page — formats, audience, rates
          </span>
          <span className="v3-bar-arrow">→</span>
        </Link>
      </div>

      <V3Nav />

      {/* ---------- HERO ---------- */}
      <section className="v3-hero">
        <div className="v3-hero-dots" aria-hidden="true" />
        <div className="v3-hero-frame" aria-hidden="true" />

        <div className="v3-hero-inner">
          <div style={{ maxWidth: 900 }}>
            <Reveal>
              <p className="v3-eyebrow">
                <span className="dot" />
                Brand partnerships · AI tools & developer products
              </p>
            </Reveal>

            <h1 className="v3-h1">
              <Reveal variant="mask" as="span">
                <span>Your tool doesn&apos;t need another review.</span>
              </Reveal>
              <Reveal variant="mask" as="span">
                <span>
                  <span className="v3-h1-2">
                    It needs someone who&apos;ll actually use it.
                    <span className="v3-sweep" aria-hidden="true" />
                  </span>
                </span>
              </Reveal>
            </h1>

            <Reveal>
              <p className="v3-hero-sub" style={{ maxWidth: 640 }}>
                Most creators read your one-pager and guess. I spent ten years running operations
                at Careem, Bolt and Wise, and I still ship AI systems for clients every week.{" "}
                <b>Your product goes through real work before it goes on camera</b> — which is
                also why I&apos;ll tell you if it isn&apos;t ready.
              </p>
            </Reveal>

            <Reveal>
              <div className="v3-cta-row">
                <a href="#enquire" className="v3-btn-o">
                  Start a campaign <span className="v3-arr">→</span>
                </a>
                <a href="#formats" className="v3-btn-g">
                  See the formats <span className="v3-arr">↓</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- PRESS STRIP ---------- */}
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

      {/* ---------- WHY ME ---------- */}
      <section className="v3-sec v3-sec--white" id="why">
        <div className="v3-w">
          <Reveal>
            <div className="v3-head">
              <span className="v3-label">Why me</span>
              <h2 className="v3-h2">
                Not an influencer.
                <br />
                <span className="oh">An operator.</span>
              </h2>
              <p className="v3-sub">
                The difference shows up in the first thirty seconds of a video, and it shows up
                in your signup numbers a week later.
              </p>
            </div>
          </Reveal>

          <Reveal variant="stagger" className="v3-cred">
            {CRED.map((c) => (
              <div className="v3-cred-card" key={c.n}>
                <div className="v3-cred-n">{c.n}</div>
                <div className="v3-cred-t">{c.title}</div>
                <p className="v3-cred-d">{c.desc}</p>
              </div>
            ))}
          </Reveal>

          <Reveal>
            <p className="v3-cred-note">
              <b>What that means for you:</b>{" "}no hand-holding on what your product is, because I
              already use tools like it daily. A demo that reads as experience rather than
              recital. And someone who understands exactly what over-promising costs a brand,
              because I&apos;ve been on the buying side of it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- FORMATS ---------- */}
      <section className="v3-sec v3-sec--off" id="formats">
        <div className="v3-w">
          <Reveal>
            <div className="v3-head">
              <span className="v3-label">What you can book</span>
              <h2 className="v3-h2">
                Four formats.
                <br />
                <span className="oh">Pick by what the product needs.</span>
              </h2>
              <p className="v3-sub">
                Not by what&apos;s trending. A tool with one obvious wow moment wants a reel; a
                tool that takes eight minutes to understand will die in one.
              </p>
            </div>
          </Reveal>

          <div className="v3-fmt-grid">
            {FORMATS.map((f) => (
              <Reveal key={f.n}>
                <div className={`v3-fmt${f.featured ? " is-feat" : ""}`}>
                  {f.badge && <span className="v3-fmt-badge">{f.badge}</span>}
                  <div className="v3-fmt-n">{f.n}</div>
                  <div className="v3-fmt-t">{f.title}</div>
                  <p className="v3-fmt-d">{f.desc}</p>
                  <div className="v3-fmt-meta">
                    {f.meta.map(([k, v]) => (
                      <div key={k}>
                        <b>{k}</b>
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- AUDIENCE + WHAT I WON'T DO ---------- */}
      <section className="v3-sec v3-sec--white" id="audience">
        <div className="v3-w">
          <Reveal>
            <div className="v3-head">
              <span className="v3-label">Audience</span>
              <h2 className="v3-h2">
                Who you&apos;re
                <br />
                <span className="oh">actually reaching.</span>
              </h2>
              <p className="v3-sub">
                Not a consumer audience, and not a large one by influencer standards. It&apos;s
                operators, founders and ops people with budget and a low tolerance for hype —
                which is the trade: fewer eyes, better ones.
              </p>
            </div>
          </Reveal>

          <div className="v3-plat">
            {PLATFORMS.map((p) => (
              <Reveal key={p.name}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v3-plat-row"
                >
                  <span>
                    <span className="v3-plat-name">{p.name}</span>
                    <span className="v3-plat-handle">{p.handle}</span>
                  </span>
                  <span className="v3-plat-draw">{p.draw}</span>
                  <span className="v3-plat-size">
                    {p.verified ? (
                      <span className="v3-plat-name">{p.size}</span>
                    ) : (
                      <span className="v3-tbc">Add number</span>
                    )}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p
              className="v3-sub"
              style={{ marginTop: 26, maxWidth: 760, fontSize: 16 }}
            >
              Documented reach, verifiable today: <b>{REACH[0].value}M+ cross-platform
              impressions</b> and <b>{REACH[1].value}K members reached</b> on the Bolt
              wrongful-termination story, which ran in {PRESS.join(", ")}. Tool coverage to
              date: {TOOLS.covered.join(", ")}.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- WHAT I WON'T DO + RATES ---------- */}
      <section className="v3-sec v3-sec--off2">
        <div className="v3-w v3-split">
          <Reveal>
            <div className="v3-wont">
              <h3>What I won&apos;t do</h3>
              <ul>
                {WONT.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              <p>
                <b>None of this is posturing.</b>{" "}An audience that believes me is the entire
                asset you&apos;re renting. The moment I spend it on something I don&apos;t rate,
                it stops being worth buying — and you&apos;d be the one who paid for the last
                good one.
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="v3-head">
                <span className="v3-label">Rates</span>
                <h2 className="v3-h2">
                  A number,
                  <br />
                  <span className="oh">not a range.</span>
                </h2>
              </div>
            </Reveal>
            <Reveal>
              <div className="v3-rates">
                <h3>How pricing works</h3>
                <p>
                  Rates depend on the format and on usage rights, so a published price list
                  would be a fiction you&apos;d have to negotiate against anyway. Send the
                  product and the timeline and you get a real figure within 48 hours.
                </p>
                <p>
                  The rough shape: written work is the entry point, reels sit in the middle,
                  long-form video and live sessions are the top end. Organic posting is priced
                  one way; perpetual usage on your own paid channels is priced separately,
                  because it&apos;s a different thing you&apos;re buying.
                </p>
                <p>
                  Bundles across formats are cheaper than the sum of the parts, and a campaign
                  that runs over a quarter beats four one-offs on every metric I&apos;ve tracked.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <V3Faq
        eyebrow="Before you brief me"
        heading="The awkward"
        accent="questions."
        items={FAQ}
        surface="white"
      />

      {/* ---------- ENQUIRY ---------- */}
      <PartnerEnquiry />

      <V3Footer />

      <StickyCta href="#enquire" label="Start a campaign →" />
    </div>
  );
}
