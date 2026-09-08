"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only sticky CTA, revealed once you're past the hero so it never
 * covers the hero's own buttons.
 *
 * The label differs per page: on / it's the newsletter (the reader isn't
 * buying), on /brands it's the enquiry (they are).
 */
export default function StickyCta({ href, label }: { href: string; label: string }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`v3-sticky${on ? " is-in" : ""}`}>
      <a href={href}>{label}</a>
    </div>
  );
}
