/**
 * Verify Wallet Button — Variant & State Types
 *
 * Naming convention:
 *   variant = structural layout (how elements are arranged)
 *   theme   = dark | light (inherited from parent context)
 *   state   = verified | unverified (wallet verification status)
 */

export const VerifyWalletVariants = {
  /** Chain icon group + gradient text, gradient border (Groups 1–2) */
  COMPACT: "compact",
  /** Toggle icon + gradient text, flat solid bg (Groups 3–4) */
  COMPACT_MINIMAL: "compact-minimal",
  /** Icon + full-width CTA gradient bar (Groups 5–6) */
  BANNER: "banner",
  /** 60px circle overlapping a gradient CTA bar (Group 7) */
  FLOATING: "floating",
  /** 60px circle overlapping a solid-color bar, gradient text (Groups 8–9) */
  FLOATING_SUBTLE: "floating-subtle",
  /** Gradient icon zone left + text right (Groups 10–11) */
  PILL: "pill",
  /** Full-width gradient with chevrons (Group 12) */
  PILL_WIDE: "pill-wide",
  /** Pill with status-colored border (Groups 13–14) */
  OUTLINED: "outlined",
  /** Full gradient bar inside status border (Group 15) */
  OUTLINED_WIDE: "outlined-wide",
  /** Full gradient background — premium look (Group 16) */
  GRADIENT: "gradient",
} as const;

export type VerifyWalletVariant =
  (typeof VerifyWalletVariants)[keyof typeof VerifyWalletVariants];

export type VerifyWalletState = "verified" | "unverified";
