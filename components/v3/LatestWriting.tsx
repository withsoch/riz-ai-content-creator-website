"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/v3/Reveal";
import { type SubstackPost, FALLBACK_POSTS } from "@/lib/substack";

/**
 * Latest Substack posts, pulled client-side through the existing
 * /api/writing-posts route so this stays a small client island inside an
 * otherwise server-rendered page. Falls back to FALLBACK_POSTS if the feed
 * is unreachable, exactly like the live homepage does.
 */

function formatDate(pubDate: string): string {
  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export default function LatestWriting() {
  const [posts, setPosts] = useState<SubstackPost[]>(FALLBACK_POSTS);

  useEffect(() => {
    fetch("/api/writing-posts")
      .then((res) => (res.ok ? res.json() : null))
      .then((p: SubstackPost[] | null) => {
        if (p && p.length) setPosts(p);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="v3-sec v3-sec--white" id="writing">
      <div className="v3-w">
        <Reveal>
          <div className="v3-head">
            <span className="v3-label">Longer form</span>
            <h2 className="v3-h2">
              I think <span className="oh">out loud.</span>
            </h2>
            <p className="v3-sub">
              The essays that don&apos;t fit in a caption. Automation, operations, and what
              happened when I took my former employer to the Labour Dispute Committee and won.
            </p>
          </div>
        </Reveal>

        <Reveal variant="stagger" className="v3-guides">
          {posts.slice(0, 3).map((post) => (
            <a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="v3-guide"
            >
              <div className="v3-guide-top">
                {post.categories[0] && <span className="v3-pill">{post.categories[0]}</span>}
                <span className="v3-pill v3-pill--muted">{formatDate(post.pubDate)}</span>
              </div>
              <div className="v3-guide-t">{post.title}</div>
              <p className="v3-guide-e">{post.excerpt}</p>
              <span className="v3-guide-m">Read on Substack ↗</span>
            </a>
          ))}
        </Reveal>

        <Reveal>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/blog" className="v3-btn-g">
              Read everything <span className="v3-arr">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
