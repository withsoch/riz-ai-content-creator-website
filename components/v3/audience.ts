/**
 * ────────────────────────────────────────────────────────────────────────
 *  THE ONLY PLACE AUDIENCE NUMBERS LIVE
 * ────────────────────────────────────────────────────────────────────────
 *
 * Every figure shown on / and /brands is read from this file. A media
 * kit is a document brands will hold you to, so nothing here is estimated,
 * rounded up, or inferred.
 *
 * `verified: true`  — documented, sourced, safe to send to a brand.
 * `verified: false` — a real metric I don't have the number for. It renders
 *                     as a visible "TBC" slot rather than a plausible-looking
 *                     invention. Fill in the value, flip the flag, done.
 *
 * There are exactly five TBC values, all in PLATFORMS. They're the ones only
 * you can see: follower counts and the monthly view total.
 */

export type Stat = {
  /** Numeric part, animated on scroll when `countTo` is set. */
  value: string;
  /** Static suffix — "M+", "K", "%". Rendered in the accent colour. */
  suffix?: string;
  countTo?: number;
  decimals?: number;
  label: string;
  verified: boolean;
  /** Where the number comes from. Shown nowhere; here so it can be checked. */
  source?: string;
};

/** Headline reach — all four documented. Used on the homepage. */
export const REACH: Stat[] = [
  {
    value: "1",
    suffix: "M+",
    countTo: 1,
    label: "Cross-platform impressions",
    verified: true,
    source: "The Bolt/Labour Dispute Committee story, published across LinkedIn, YouTube and Substack.",
  },
  {
    value: "160",
    suffix: "K",
    countTo: 160,
    label: "Members reached, one story",
    verified: true,
    source: "LinkedIn reach on the same story.",
  },
  {
    value: "16",
    suffix: "",
    countTo: 16,
    label: "Free guides, no email wall",
    verified: true,
    source: "Counted from public/guides at build time.",
  },
  {
    value: "3",
    suffix: "",
    countTo: 3,
    label: "Press features",
    verified: true,
    source: "Äripäev, Delfi, Sifted.",
  },
];

export const PRESS = ["Äripäev", "Delfi", "Sifted"];

/**
 * Per-platform breakdown for the media kit. This is the table a brand
 * actually reads, and it's where the five unknowns live.
 */
export type Platform = {
  name: string;
  handle: string;
  href: string;
  /** Why people are there — the part that matters more than the number. */
  draw: string;
  size: string;
  verified: boolean;
};

export const PLATFORMS: Platform[] = [
  {
    name: "LinkedIn",
    handle: "consult-with-riz",
    href: "https://www.linkedin.com/in/consult-with-riz/",
    draw: "Operators and founders. Long-form teardowns, ops writing, the Bolt case.",
    size: "TBC",
    verified: false,
  },
  {
    name: "Instagram",
    handle: "@etz.riz",
    href: "https://www.instagram.com/etz.riz/reels/",
    draw: "Short-form builds and stand-up. 9:16, sound-on, no talking-head filler.",
    size: "TBC",
    verified: false,
  },
  {
    name: "YouTube",
    handle: "Life of Riza",
    href: "https://www.youtube.com/",
    draw: "Long-form walkthroughs and the podcast. Where a tool gets eight minutes, not thirty seconds.",
    size: "TBC",
    verified: false,
  },
  {
    name: "Substack",
    handle: "Conversations with Riz",
    href: "https://conversationswithriz.substack.com/",
    draw: "Money. Machines. Meaning. Weekly-ish, read start to finish rather than skimmed.",
    size: "TBC",
    verified: false,
  },
];

/** Shown on /brands above the platform table. */
export const MONTHLY_VIEWS: Stat = {
  value: "TBC",
  label: "Monthly views across platforms",
  verified: false,
  source: "Pull the trailing-30-day total from each platform's analytics.",
};

/**
 * Tools actually covered in the guides, plus the stack the client builds run
 * on. Every name here is defensible: `covered` comes from the guide-tool meta
 * tag in public/guides/*.html, `built` from the systems shipped through Soch.
 */
export const TOOLS = {
  covered: [
    "Claude",
    "ChatGPT",
    "ChatGPT Agent Mode",
    "Gemini",
    "n8n",
    "Zapier",
    "Make",
    "ElevenLabs",
  ],
  built: [
    "Claude API",
    "OpenAI API",
    "Apify",
    "Whisper",
    "Postgres",
    "Smartlead",
    "ClickUp",
    "Attio",
    "Clay",
    "Next.js",
    "Vercel",
  ],
};
