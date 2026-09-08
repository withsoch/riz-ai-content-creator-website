"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Creator-first navigation.
 *
 * Note what the CTA is and isn't: on /v2 the pill says "Book a call", because
 * that page sells an engagement. Here it says "Brand partnerships", because
 * the audience arriving on a creator page is mostly not buying — they're
 * reading, watching, subscribing. The one visitor who IS buying is a brand,
 * and they need a door that goes straight to the media kit rather than a
 * calendar they aren't ready for.
 *
 * Everything else in the nav is free: guides, videos, newsletter.
 */

const LINKS = [
  { label: "Guides", href: "/guides" },
  { label: "Watch", href: "/#watch" },
  { label: "Newsletter", href: "/#newsletter" },
  { label: "About", href: "/about" },
];

export default function V3Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onBrands = pathname?.startsWith("/brands");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`v3-nav${scrolled ? " is-scrolled" : ""}`}>
      <Link href="/" className="v3-logo">
        <span className="v3-logo-dot" />
        <span className="v3-logo-word">Riz</span>
      </Link>

      <button
        className={`v3-burger${open ? " is-open" : ""}`}
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`v3-mobile-nav${open ? " is-open" : ""}`}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href="/brands" className="v3-ncta" onClick={() => setOpen(false)}>
          Brand partnerships
        </Link>
      </div>

      <div className="v3-nl">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
        <Link href="/brands" className={`v3-ncta${onBrands ? " is-active" : ""}`}>
          Brand partnerships
        </Link>
      </div>
    </nav>
  );
}
