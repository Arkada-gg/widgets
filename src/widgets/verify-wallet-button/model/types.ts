/**
 * Verify Wallet Button — Variant & State Types
 *
 * Naming convention:
 *   variant = structural layout (how elements are arranged)
 *   theme   = dark | light (inherited from parent context)
 *   state   = verified | unverified (wallet verification status)
 */

export const VerifyWalletVariants = {
  /** Chain icon group + gradient text, gradient border */
  COMPACT: "compact",
  /** Toggle icon + gradient text, flat solid bg */
  COMPACT_MINIMAL: "compact-minimal",
  /** Full gradient background — premium look */
  COMPACT_GRADIENT: "compact-gradient",
  /** Icon + full-width CTA gradient bar */
  BANNER: "banner",
  /** 60px circle overlapping a solid-color bar, gradient text */
  FLOATING: "floating",
  /** 60px circle overlapping a gradient CTA bar */
  FLOATING_GRADIENT: "floating-gradient",
  /** Gradient icon zone left + text right */
  PILL: "pill",
  /** Full-width gradient with chevrons */
  PILL_WIDE: "pill-wide",
  /** Pill with status-colored border */
  OUTLINED: "outlined",
  /** Full gradient bar inside status border */
  OUTLINED_WIDE: "outlined-wide",
} as const;

export type VerifyWalletVariant =
  (typeof VerifyWalletVariants)[keyof typeof VerifyWalletVariants];

export type VerifyWalletState = "verified" | "unverified";
