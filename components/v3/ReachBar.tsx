"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/components/v3/audience";

/**
 * The reach bar. Same counting treatment as /v2's trust bar, different job:
 * /v2 proves outcomes to a buyer, this proves distribution to a reader and
 * to a brand.
 *
 * Any stat with `verified: false` renders as a dashed TBC slot instead of a
 * number. A media kit is a document people hold you to — a plausible-looking
 * invention is worse than an obvious gap.
 */

const DURATION = 900;

export default function ReachBar({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (reduced) {
          setProgress(1);
          return;
        }
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          setProgress(1 - Math.pow(1 - t, 2)); // power2.out
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="v3-reach">
      <div className="v3-reach-in" ref={ref}>
        {stats.map((s) => (
          <div className="v3-rs" key={s.label}>
            <span className="v3-rn">
              {s.verified && s.countTo != null ? (
                <>
                  {(s.countTo * progress).toFixed(s.decimals ?? 0)}
                  <span className="accent">{s.suffix}</span>
                </>
              ) : (
                <span className="v3-tbc">Add number</span>
              )}
            </span>
            <span className="v3-rl">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
