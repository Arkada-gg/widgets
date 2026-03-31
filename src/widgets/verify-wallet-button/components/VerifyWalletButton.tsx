import type { WidgetTheme } from "@/shared/config";
import { DEFAULT_THEME } from "@/shared/config";
import { useTheme } from "@/shared/hooks/useTheme";
import { cn } from "@/shared/utils/cn";
import type { ButtonHTMLAttributes } from "react";
import {
  VerifyWalletVariants,
  type VerifyWalletState,
  type VerifyWalletVariant,
} from "../model/types";
import "../styles/verify-wallet-button.css";
import {
  ChainGroupIcon,
  CheckCircleIcon,
  CheckSmallIcon,
  ChevronsRightIcon,
  ShieldAlertIcon,
  ToggleIcon,
  WalletCircleIcon,
} from "./icons";

export interface VerifyWalletButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** Wallet verification status */
  state?: VerifyWalletState;
  /** Visual layout variant */
  variant?: VerifyWalletVariant;
  /** Color theme */
  theme?: WidgetTheme;
  /** Fired when user clicks the unverified button */
  onVerify?: () => void;
}

/* ------------------------------------------------------------------ */
/*  Variant inner renderers — each matches Figma pixel-for-pixel      */
/* ------------------------------------------------------------------ */

type InnerProps = { state: VerifyWalletState; theme: WidgetTheme };

/**
 * Compact
 */
function CompactInner({ state, theme }: InnerProps) {
  return (
    <div
      className={cn("rounded-2xl", theme === "dark" ? "bg-black" : "bg-white")}
    >
      <div
        className={cn(
          "rounded-2xl p-px",
          theme === "dark"
            ? "vwb-gradient-border-dark"
            : "vwb-gradient-border-light",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-[12px] rounded-[15px] px-[12px] py-[8px]",
            theme === "dark" ? "vwb-border-dark" : "vwb-border-light-compact",
          )}
        >
          <ChainGroupIcon
            verified={state === "verified"}
            className="h-[40px] w-[68px] shrink-0"
          />
          <span className="vwb-gradient-text font-semibold font-sans text-[18px] leading-none whitespace-nowrap">
            Verify Wallet
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Compact Minimal
 */
function CompactMinimalInner({ state, theme }: InnerProps) {
  return (
    <div
      className={cn("rounded-2xl", theme === "dark" ? "bg-black" : "bg-white")}
    >
      <div
        className={cn(
          "rounded-2xl p-px",
          theme === "dark"
            ? "vwb-gradient-border-dark"
            : "vwb-gradient-border-light",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-[12px] rounded-[15px] p-[12px]",
            theme === "dark" ? "bg-[#1f1f1f]" : "bg-white",
          )}
        >
          <ToggleIcon
            verified={state === "verified"}
            className="h-[32px] w-[58px] shrink-0"
          />
          <span className="vwb-gradient-text font-semibold font-sans text-[18px] leading-none whitespace-nowrap">
            Verify Wallet
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Groups 5–6: Banner
 * Gradient border container, icon (40×40), full-width CTA bar.
 * w-260, p-6, gap-6, rounded-16, border 1px white/50.
 * Unverified CTA: purple gradient bar with shadow, white text.
 * Verified CTA: green gradient bar, white text "Wallet Verified".
 */
function BannerInner({ state, theme }: InnerProps) {
  const isVerified = state === "verified";
  return (
    <div
      className={cn(
        "flex w-[260px] items-center gap-[6px] rounded-[16px] border border-white/50 p-[6px]",
        theme === "dark" ? "vwb-border-dark" : "vwb-border-light-banner",
      )}
    >
      {/* Icon */}
      <div className="shrink-0">
        {isVerified ? (
          <CheckCircleIcon className="size-[40px]" />
        ) : (
          <WalletCircleIcon className="size-[40px]" />
        )}
      </div>
      {/* CTA bar */}
      <div
        className={cn(
          "flex flex-1 items-center justify-center self-stretch rounded-[12px]",
          isVerified ? "vwb-verified-gradient" : "vwb-cta-gradient",
        )}
      >
        <span className="font-semibold font-sans text-[18px] leading-none text-white whitespace-nowrap">
          {isVerified ? "Wallet Verified" : "Verify Wallet"}
        </span>
      </div>
    </div>
  );
}

/**
 * Group 7: Floating
 * 60px circle icon overlapping a 40h×203w gradient CTA bar.
 * Bar offset: ml-[21px] from left edge of icon.
 * Unverified: gradient CTA bar, white text, gray wallet circle icon.
 * Verified: gradient CTA bar (green), white text, green check circle.
 */
function FloatingInner({ state }: InnerProps) {
  const isVerified = state === "verified";
  return (
    <div className="relative flex h-[60px] items-center">
      {/* CTA bar — behind the icon */}
      <div
        className={cn(
          "absolute left-[21px] flex h-[40px] w-[203px] items-center justify-end rounded-[12px] px-[24px]",
          isVerified ? "vwb-cta-gradient" : "vwb-cta-gradient",
        )}
      >
        <span className="font-semibold font-sans text-[18px] leading-none text-white whitespace-nowrap">
          {isVerified ? "Wallet Verified" : "Verify Wallet"}
        </span>
      </div>
      {/* Icon circle — overlaps bar on left */}
      <div className="relative z-10 size-[60px] shrink-0">
        {isVerified ? (
          <CheckCircleIcon className="size-full" />
        ) : (
          <WalletCircleIcon className="size-full" />
        )}
      </div>
    </div>
  );
}

/**
 * Groups 8–9: Floating Subtle
 * Same layout as Floating but solid-color bar with gradient text.
 * Text stays "Verify Wallet" in both states — only the icon changes.
 * Dark: black bar. Light: white bar.
 */
function FloatingSubtleInner({ state, theme }: InnerProps) {
  const isVerified = state === "verified";
  return (
    <div className="relative flex h-[60px] items-center">
      {/* Solid bar — behind the icon */}
      <div
        className={cn(
          "absolute left-[21px] flex h-[40px] w-[203px] items-center justify-end rounded-[12px] px-[24px]",
          theme === "dark" ? "bg-black" : "bg-white",
        )}
      >
        <span className="vwb-gradient-text font-semibold font-sans text-[18px] leading-none whitespace-nowrap">
          Verify Wallet
        </span>
      </div>
      {/* Icon circle */}
      <div className="relative z-10 size-[60px] shrink-0">
        {isVerified ? (
          <CheckCircleIcon className="size-full" />
        ) : (
          <WalletCircleIcon className="size-full" />
        )}
      </div>
    </div>
  );
}

/**
 * Groups 10–11: Pill
 * bg solid, rounded-16, h-54, w-220.
 * Left: 60w×46h icon zone at 4px inset, rounded-16.
 *   Unverified: gradient bg + white chevrons.
 *   Verified: green gradient bg + white check.
 * Right: label.
 *   Unverified: white (dark) or black (light) text.
 *   Verified: #14bd47 green text "Wallet Verified".
 */
function PillInner({ state, theme }: InnerProps) {
  const isVerified = state === "verified";
  return (
    <div
      className={cn(
        "relative flex h-[54px] w-[220px] items-center rounded-[16px]",
        theme === "dark" ? "bg-black" : "bg-white",
      )}
    >
      {/* Icon zone */}
      <div
        className={cn(
          "absolute left-[4px] top-[4px] flex h-[46px] w-[60px] items-center justify-center rounded-[16px]",
          isVerified ? "vwb-verified-gradient" : "vwb-icon-gradient",
        )}
      >
        {isVerified ? (
          <CheckSmallIcon className="h-[18px] w-[21px]" />
        ) : (
          <ChevronsRightIcon className="size-[32px] text-white" />
        )}
      </div>
      {/* Label */}
      <div className="flex flex-1 items-center justify-center pl-[64px]">
        <span
          className={cn(
            "font-semibold font-sans text-[18px] leading-none whitespace-nowrap",
            isVerified
              ? "text-[#14bd47]"
              : theme === "dark"
                ? "text-white"
                : "text-black",
          )}
        >
          {isVerified ? "Wallet Verified" : "Verify Wallet"}
        </span>
      </div>
    </div>
  );
}

/**
 * Group 12: Pill Wide
 * bg black, rounded-16, h-54, w-220.
 * Unverified: full-width gradient bar (inset 4px, w-212, h-46),
 *   text "Verify Wallet" centered, chevrons icon on RIGHT.
 * Verified: check icon LEFT (inset), gradient bar RIGHT (h-46 w-148 from right),
 *   text "Wallet Verified" centered in gradient bar.
 */
function PillWideInner({ state }: InnerProps) {
  const isVerified = state === "verified";
  return (
    <div className="relative flex h-[54px] w-[220px] items-center rounded-[16px] bg-black">
      {isVerified ? (
        <>
          {/* Check icon left */}
          <div className="absolute left-[16px] top-1/2 -translate-y-1/2 z-10">
            <CheckSmallIcon className="h-[18px] w-[21px] text-white" />
          </div>
          {/* Gradient bar right */}
          <div className="absolute right-[4px] top-[4px] flex h-[46px] w-[148px] items-center justify-center rounded-[16px] vwb-icon-gradient">
            <span className="font-semibold font-sans text-[18px] leading-none text-white whitespace-nowrap">
              Wallet Verified
            </span>
          </div>
        </>
      ) : (
        <>
          {/* Full gradient bar */}
          <div className="absolute left-[4px] top-[4px] flex h-[46px] w-[212px] items-center rounded-[16px] vwb-icon-gradient">
            <span className="flex-1 font-semibold font-sans text-[18px] leading-none text-white text-center whitespace-nowrap">
              Verify Wallet
            </span>
            <ChevronsRightIcon className="mr-[8px] size-[32px] text-white shrink-0" />
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Groups 13–14: Outlined
 * Same pill layout but with status-colored border.
 * Unverified: border #ff6a59 (red), shield icon in gradient zone.
 * Verified: border #13b343 (green), check in green gradient zone.
 */
function OutlinedInner({ state, theme }: InnerProps) {
  const isVerified = state === "verified";
  return (
    <div
      className={cn(
        "relative flex h-[54px] w-[220px] items-center rounded-[16px] border",
        isVerified ? "border-[#13b343]" : "border-[#ff6a59]",
        theme === "dark" ? "bg-black" : "bg-white",
      )}
    >
      {/* Icon zone */}
      <div
        className={cn(
          "absolute left-[4px] top-[4px] flex h-[46px] w-[60px] items-center justify-center rounded-[16px]",
          isVerified ? "vwb-verified-gradient" : "vwb-icon-gradient",
        )}
      >
        {isVerified ? (
          <CheckSmallIcon className="h-[18px] w-[21px]" />
        ) : (
          <ShieldAlertIcon className="h-[19px] w-[22px] text-white" />
        )}
      </div>
      {/* Label */}
      <div className="flex flex-1 items-center justify-center pl-[64px]">
        <span
          className={cn(
            "font-semibold font-sans text-[18px] leading-none whitespace-nowrap",
            isVerified
              ? "text-[#14bd47]"
              : theme === "dark"
                ? "text-white"
                : "text-black",
          )}
        >
          {isVerified ? "Wallet Verified" : "Verify Wallet"}
        </span>
      </div>
    </div>
  );
}

/**
 * Group 15: Outlined Wide
 * Status border + icon on left side + gradient bar on right.
 * Unverified: shield icon left, gradient bar right, white text.
 * Verified: check icon left, gradient bar right, white text.
 */
function OutlinedWideInner({ state }: InnerProps) {
  const isVerified = state === "verified";
  return (
    <div
      className={cn(
        "relative flex h-[54px] w-[220px] items-center rounded-[16px] border bg-black",
        isVerified ? "border-[#13b343]" : "border-[#ff6a59]",
      )}
    >
      {/* Icon left */}
      <div className="absolute left-[16px] top-1/2 z-10 -translate-y-1/2">
        {isVerified ? (
          <CheckSmallIcon className="h-[18px] w-[21px] text-white" />
        ) : (
          <ShieldAlertIcon className="h-[19px] w-[22px] text-white" />
        )}
      </div>
      {/* Gradient bar right */}
      <div
        className={cn(
          "absolute right-[4px] top-[4px] flex h-[46px] w-[148px] items-center justify-center rounded-[16px]",
          isVerified ? "vwb-verified-gradient" : "vwb-icon-gradient",
        )}
      >
        <span className="font-semibold font-sans text-[18px] leading-none text-white whitespace-nowrap">
          {isVerified ? "Wallet Verified" : "Verify Wallet"}
        </span>
      </div>
    </div>
  );
}

/**
 * Gradient Compact
 */
function GradientCompactInner({ state }: InnerProps) {
  const isVerified = state === "verified";
  return (
    <div className={cn("rounded-2xl vwb-full-gradient")}>
      <div className={cn("rounded-2xl p-px", "vwb-gradient-border-dark")}>
        <div
          className={cn(
            "flex items-center gap-[12px] rounded-[15px] px-[12px] py-[8px]",
            "vwb-full-gradient",
          )}
        >
          <ChainGroupIcon
            verified={isVerified}
            className="h-[40px] w-[68px] shrink-0"
          />
          <span className="font-semibold font-sans text-[18px] leading-none text-white whitespace-nowrap">
            Verify Wallet
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Variant → renderer map                                             */
/* ------------------------------------------------------------------ */

const VARIANT_MAP: Record<
  VerifyWalletVariant,
  React.ComponentType<InnerProps>
> = {
  [VerifyWalletVariants.COMPACT]: CompactInner,
  [VerifyWalletVariants.COMPACT_MINIMAL]: CompactMinimalInner,
  [VerifyWalletVariants.BANNER]: BannerInner,
  [VerifyWalletVariants.FLOATING]: FloatingInner,
  [VerifyWalletVariants.FLOATING_SUBTLE]: FloatingSubtleInner,
  [VerifyWalletVariants.PILL]: PillInner,
  [VerifyWalletVariants.PILL_WIDE]: PillWideInner,
  [VerifyWalletVariants.OUTLINED]: OutlinedInner,
  [VerifyWalletVariants.OUTLINED_WIDE]: OutlinedWideInner,
  [VerifyWalletVariants.GRADIENT]: GradientCompactInner,
};

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */

export function VerifyWalletButton({
  state = "unverified",
  variant = "compact",
  theme = DEFAULT_THEME,
  onVerify,
  className,
  onClick,
  ...props
}: VerifyWalletButtonProps) {
  const themeRef = useTheme(theme);
  const VariantRenderer = VARIANT_MAP[variant];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (state === "unverified") {
      onVerify?.();
    }
    onClick?.(e);
  };

  return (
    <button
      ref={themeRef as React.Ref<HTMLButtonElement>}
      type="button"
      data-theme={theme}
      aria-label={state === "verified" ? "Wallet verified" : "Verify wallet"}
      className={cn(
        "inline-flex cursor-pointer border-none bg-transparent p-0 vwb-interactive",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <VariantRenderer state={state} theme={theme} />
    </button>
  );
}
