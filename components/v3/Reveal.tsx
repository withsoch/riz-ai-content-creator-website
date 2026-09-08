"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

/**
 * Same three moves as /v2's Reveal — rise, stagger, headline lines climbing
 * out of a mask — emitting `v3-` classes so the two prototypes stay fully
 * independent. Either can be deleted without touching the other.
 *
 * IntersectionObserver flips `.is-in`; creator.css owns the motion, including the
 * reduced-motion opt-out, so there's no branch for it here.
 */

type RevealVariant = "rise" | "stagger" | "mask";

export default function Reveal({
  children,
  variant = "rise",
  as: Tag = "div",
  className = "",
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
}: {
  children: ReactNode;
  variant?: RevealVariant;
  as?: ElementType;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        io.unobserve(el);
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  const base = variant === "mask" ? "v3-mask" : variant === "stagger" ? "v3-stagger" : "v3-rise";

  return (
    <Tag ref={ref} className={`${base}${seen ? " is-in" : ""}${className ? ` ${className}` : ""}`}>
      {children}
    </Tag>
  );
}
