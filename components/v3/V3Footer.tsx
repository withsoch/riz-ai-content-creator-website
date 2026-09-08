import Link from "next/link";

/**
 * Creator footer.
 *
 * The shared Footer (components/Footer.tsx, still serving the older routes)
 * closes with "Got a process worth fixing? Book a call" — right for a
 * consulting site, wrong here, where the reader is a
 * subscriber rather than a buyer. This one ends on the free stuff and the
 * places to follow, and keeps the business links present but secondary.
 */

const COLUMNS = [
  {
    heading: "Free",
    links: [
      { label: "The guides", href: "/guides" },
      { label: "The newsletter", href: "https://conversationswithriz.substack.com/", external: true },
      { label: "Writing", href: "/blog" },
      { label: "Case studies", href: "/case-studies" },
    ],
  },
  {
    heading: "Watch",
    links: [
      { label: "Instagram reels", href: "https://www.instagram.com/etz.riz/reels/", external: true },
      { label: "YouTube", href: "https://www.youtube.com/", external: true },
      { label: "About Riz", href: "/about" },
    ],
  },
  {
    heading: "Work",
    links: [
      { label: "Brand partnerships", href: "/brands" },
      { label: "Consulting", href: "/services/consulting" },
      { label: "Speaking", href: "/services/speaking" },
      { label: "Soch → withsoch.com", href: "https://withsoch.com", external: true },
    ],
  },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/consult-with-riz/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/etz.riz/reels/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "Substack",
    href: "https://conversationswithriz.substack.com/",
    path: "M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z",
  },
];

export default function V3Footer() {
  return (
    <footer className="v3-foot">
      <div className="v3-foot-cols">
        <div className="v3-foot-col">
          <h2 className="v3-foot-h">Rizwan Mahmood</h2>
          <p className="v3-foot-blurb">
            Operator turned builder. Ten years of ops at Careem, Bolt and Wise, now building AI
            systems in Tallinn and publishing the working parts.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div className="v3-foot-col" key={col.heading}>
            <h2 className="v3-foot-h">{col.heading}</h2>
            {col.links.map((l) =>
              "external" in l && l.external ? (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ) : (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              )
            )}
          </div>
        ))}
      </div>

      <div className="v3-foot-bar">
        <span className="v3-foot-small">© 2026 · Built on proof. Not persuasion.</span>
        <div className="v3-socials">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="v3-si"
              aria-label={s.label}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
