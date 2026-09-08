"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Suppresses shared page chrome on routes that ship their own.
 *
 * The two creator routes do: / and /brands render components/v3/V3Nav.tsx and
 * components/v3/V3Footer.tsx. Without this gate they'd stack under
 * components/Navbar.tsx and components/Footer.tsx, which still serve every
 * other route.
 *
 * The footer is gated as well as the nav because the shared one closes on
 * "Got a process worth fixing? Book a call" — right for a consulting site,
 * wrong on pages whose reader is a subscriber and whose buyer is a brand.
 *
 * Note `exact` rather than a prefix match. "/" as a prefix matches every path
 * on the site, which would strip the chrome from the whole thing.
 *
 * Root layouts are server components and can't read the pathname, so the
 * check has to happen in a client boundary like this one.
 */
const SELF_CHROMED: Record<"nav" | "footer", { exact: string[]; prefix: string[] }> = {
  nav: { exact: ["/", "/brands"], prefix: [] },
  footer: { exact: ["/", "/brands"], prefix: [] },
};

export default function ChromeGate({
  slot,
  children,
}: {
  slot: "nav" | "footer";
  children: ReactNode;
}) {
  const pathname = usePathname();
  const rules = SELF_CHROMED[slot];
  const owned =
    rules.exact.includes(pathname) ||
    rules.prefix.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (owned) return null;
  return <>{children}</>;
}
