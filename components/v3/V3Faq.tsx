"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/v3/Reveal";

/**
 * Accordion, reused across / and /brands with different question sets.
 *
 * The brands set is deliberately the awkward questions — exclusivity,
 * disclosure, guaranteed views, scripts — because those are what a brand
 * manager is actually weighing, and answering them before they ask is the
 * cheapest trust you can buy on a page like this.
 */

export type QA = { q: string; a: string };

function Row({ q, a }: QA) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Measured on click, not during render: on first paint the ref is null, and
  // a hard-coded fallback either clips long answers or leaves dead space.
  const toggle = () => {
    const el = bodyRef.current;
    if (el) el.style.maxHeight = open ? "0px" : `${el.scrollHeight}px`;
    setOpen((v) => !v);
  };

  return (
    <div className={`v3-qa${open ? " is-open" : ""}`}>
      <button type="button" onClick={toggle} aria-expanded={open}>
        <span>{q}</span>
        <span className="v3-qa-icon" aria-hidden="true">
          +
        </span>
      </button>
      <div className="v3-qa-a" ref={bodyRef} role="region">
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function V3Faq({
  eyebrow,
  heading,
  accent,
  items,
  id = "faq",
  surface = "off2",
}: {
  eyebrow: string;
  heading: string;
  accent: string;
  items: QA[];
  id?: string;
  surface?: "off" | "off2" | "white";
}) {
  return (
    <section className={`v3-sec v3-sec--${surface}`} id={id}>
      <div className="v3-faq-in">
        <Reveal>
          <div className="v3-head v3-head--center">
            <span className="v3-label v3-label--center">{eyebrow}</span>
            <h2 className="v3-h2">
              {heading} <span className="oh">{accent}</span>
            </h2>
          </div>
        </Reveal>
        <div className="v3-qa-list">
          {items.map((item) => (
            <Row key={item.q} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
