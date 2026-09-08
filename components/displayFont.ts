import { Bebas_Neue } from "next/font/google";

/**
 * The condensed display face used by / and /brands.
 *
 * Loaded here rather than in app/layout.tsx so it only ships on the two
 * routes that opt in — the older routes keep the three-face system
 * (Archivo / Inter Tight / IBM Plex Mono) from app/globals.css untouched.
 *
 * To drop it and run the creator pages on Archivo instead, change
 * --v3-display in app/creator.css. Nothing else moves.
 */
export const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
  display: "swap",
});
