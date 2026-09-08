"use client";

import { useState } from "react";
import Reveal from "@/components/v3/Reveal";

/**
 * Newsletter block. Substack owns the actual subscribe flow, so rather than
 * fake an inline signup this pre-fills the email into Substack's own subscribe
 * URL and hands off — the same trick buildwithnav.com uses for Beehiiv. One
 * field, no backend, no list to keep in sync, and the confirmation email comes
 * from the platform the reader will actually receive posts from.
 */

const SUBSTACK = "https://conversationswithriz.substack.com/subscribe";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handle(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    window.open(
      `${SUBSTACK}?email=${encodeURIComponent(value)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSent(true);
    setEmail("");
  }

  return (
    <section className="v3-sec v3-sec--off2" id="newsletter">
      <div className="v3-nl-block">
        <Reveal>
          <span className="v3-label v3-label--center">The newsletter</span>
          <h2 className="v3-h2">
            Money. Machines. <span className="oh">Meaning.</span>
          </h2>
          <p className="v3-sub v3-sub--center">
            Conversations with Riz. What I actually built that week, what broke, and what it cost
            — plus the occasional detour into money, machines and what any of it is for.
          </p>
        </Reveal>

        <Reveal>
          <form className="v3-nl-form" onSubmit={handle}>
            <input
              type="email"
              required
              placeholder="you@company.com"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="v3-btn-o">
              Subscribe <span className="v3-arr">→</span>
            </button>
          </form>
          <p className="v3-nl-meta">
            {sent
              ? "Opened Substack in a new tab — confirm there and you're in."
              : "Free. Unsubscribe whenever. No sequence, no funnel."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
