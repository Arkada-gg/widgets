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
  CheckCircleFilledIcon,
  CheckCircleIcon,
  CheckSmallIcon,
  ChevronsRightIcon,
  ToggleIcon,
  WalletCircleGradientIcon,
  WalletCircleIcon,
  WalletSmallIcon,
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
    <div className={cn("rounded-2xl bg-(--arkada-bg)")}>
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
    <div className={cn("rounded-2xl bg-(--arkada-bg)")}>
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
            "bg-(--arkada-bg-foreground)",
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
          <span className="font-semibold font-sans text-[18px] leading-none text-(--arkada-text-primary) whitespace-nowrap">
            Verify Wallet
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Banner
 */
function BannerInner({ state, theme }: InnerProps) {
  const isVerified = state === "verified";
  return (
    <div className={cn("rounded-2xl bg-(--arkada-bg)")}>
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
            "flex w-[260px] items-center gap-[6px] rounded-[15px] p-[6px]",
            theme === "dark" ? "vwb-border-dark" : "vwb-border-light-banner",
          )}
        >
          {/* Icon */}
          <div className="shrink-0 shadow-2xl">
            {isVerified ? (
              <CheckCircleIcon className="size-[40px]" />
            ) : (
              <WalletCircleIcon className="size-[40px]" />
            )}
          </div>
          {/* CTA bar */}
          <div
            className={cn(
              "flex flex-1 items-center justify-center self-stretch rounded-xl",
              isVerified ? "vwb-verified-gradient" : "vwb-cta-gradient",
            )}
          >
            <span className="font-semibold font-sans text-[18px] leading-none text-white whitespace-nowrap">
              {isVerified ? "Wallet Verified" : "Verify Wallet"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Floating
 */
function FloatingGradientInner({ state }: InnerProps) {
  const isVerified = state === "verified";
  return (
    <div className="flex h-[60px] w-[224px] items-center justify-end">
      {/* CTA bar — behind the icon */}
      <div
        className={cn(
          "relative flex h-[40px] w-[203px] items-center rounded-xl pl-[53px] shadow-none!",
          "vwb-cta-gradient",
        )}
      >
        <span className="font-semibold font-sans text-[18px] leading-none text-white whitespace-nowrap">
          {isVerified ? "Wallet Verified" : "Verify Wallet"}
        </span>
        {/* Icon circle — overlaps bar on left */}
        <div
          className={cn(
            "absolute left-0 z-10 rounded-[60px] size-[60px] -translate-x-[34%] p-[6px]",
            isVerified ? "vwb-floating-v-gradient" : "vwb-floating-nv-gradient",
          )}
        >
          {isVerified ? (
            <CheckCircleFilledIcon className="size-full" />
          ) : (
            <WalletCircleIcon className="size-full" />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Floating
 */
function FloatingInner({ state }: InnerProps) {
  const isVerified = state === "verified";
  return (
    <div className="flex h-[60px] w-[224px] items-center justify-end">
      {/* CTA bar — behind the icon */}
      <div
        className={cn(
          "relative flex h-[40px] w-[203px] items-center rounded-xl pl-[53px] shadow-none! bg-(--arkada-bg-accent)",
        )}
      >
        <span className="font-semibold font-sans text-[18px] leading-none vwb-gradient-text whitespace-nowrap">
          {isVerified ? "Wallet Verified" : "Verify Wallet"}
        </span>
        {/* Icon circle — overlaps bar on left */}
        <div
          className={cn(
            "absolute left-0 z-10 rounded-[60px] size-[60px] -translate-x-[34%] p-[6px]",
            isVerified
              ? "vwb-floating-v-gradient"
              : "vwb-floating-nvc-gradient",
          )}
        >
          {isVerified ? (
            <CheckCircleFilledIcon className="size-full" />
          ) : (
            <WalletCircleGradientIcon className="size-full" />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Pill
 * bg solid, rounded-16, h-54, w-220.
 * Left: 60w×46h icon zone at 4px inset, rounded-16.
 *   Unverified: gradient bg + white chevrons.
 *   Verified: green gradient bg + white check.
 * Right: label.
 *   Unverified: white (dark) or black (light) text.
 *   Verified: #14bd47 green text "Wallet Verified".
 */
function PillInner({ state }: InnerProps) {
  const isVerified = state === "verified";
  return (
    <div
      className={cn(
        "relative flex h-[54px] w-[220px] items-center rounded-2xl bg-(--arkada-bg)",
      )}
    >
      {/* Icon zone */}
      <div
        className={cn(
          "absolute left-[4px] top-[4px] flex h-[46px] w-[60px] items-center justify-center rounded-2xl",
          isVerified ? "vwb-verified-gradient" : "vwb-full-gradient",
        )}
      >
        {isVerified ? (
          <CheckSmallIcon className="h-[18px] w-[21px] scale-150" />
        ) : (
          <ChevronsRightIcon className="size-[32px]" />
        )}
      </div>
      {/* Label */}
      <div className="flex flex-1 items-center justify-center pl-[64px]">
        <span
          className={cn(
            "font-semibold font-sans text-[18px] leading-none whitespace-nowrap",
            isVerified
              ? "text-(--color-accent)"
              : "text-(--arkada-text-primary)",
          )}
        >
          {isVerified ? "Wallet Verified" : "Verify Wallet"}
        </span>
      </div>
    </div>
  );
}

/**
 * Pill Wide
 * bg black, rounded-16, h-54, w-220.
 * Unverified: full-width gradient bar (inset 4px, w-212, h-46),
 *   text "Verify Wallet" centered, chevrons icon on RIGHT.
 * Verified: check icon LEFT (inset), gradient bar RIGHT (h-46 w-148 from right),
 *   text "Wallet Verified" centered in gradient bar.
 */
function PillWideInner({ state }: InnerProps) {
  const isVerified = state === "verified";
  return (
    <div className="relative flex h-[54px] w-[220px] items-center rounded-2xl bg-black p-1">
      {isVerified ? (
        <>
          {/* Check icon left */}
          <div className="absolute left-[24px] top-1/2 -translate-y-1/2 z-10">
            <CheckSmallIcon className="h-[18px] w-[21px] text-white scale-150" />
          </div>
          {/* Gradient bar right */}
          <div className="absolute right-[4px] top-[4px] flex h-[46px] w-[148px] items-center justify-center rounded-xl vwb-verified-gradient">
            <span className="font-semibold font-sans text-[18px] leading-none text-white whitespace-nowrap">
              Wallet Verified
            </span>
          </div>
        </>
      ) : (
        <>
          {/* Full gradient bar */}
          <div className="flex h-[46px] w-full items-center justify-between rounded-xl vwb-full-gradient pl-4 pr-[8px]">
            <p className="font-semibold font-sans text-[18px] leading-none text-white text-center whitespace-nowrap w-fit">
              Verify Wallet
            </p>
            <ChevronsRightIcon className="size-[32px] text-white shrink-0" />
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Outlined
 * Same pill layout but with status-colored border.
 * Unverified: border #ff6a59 (red), shield icon in gradient zone.
 * Verified: border #13b343 (green), check in green gradient zone.
 */
function OutlinedInner({ state }: InnerProps) {
  const isVerified = state === "verified";
  return (
    <div
      className={cn(
        "relative flex h-[54px] w-[220px] items-center rounded-2xl p-px",
        isVerified ? "bg-(--color-accent)" : "vwb-full-gradient",
      )}
    >
      <div
        className={cn(
          "relative flex h-full w-full items-center rounded-[15px] bg-(--arkada-bg)",
        )}
      >
        {/* Icon zone */}
        <div
          className={cn(
            "absolute left-[3px] top-[3px] flex h-[46px] w-[60px] items-center justify-center rounded-xl",
            isVerified ? "vwb-verified-gradient" : "vwb-full-gradient",
          )}
        >
          {isVerified ? (
            <CheckSmallIcon className="h-[18px] w-[21px] scale-150" />
          ) : (
            <WalletSmallIcon className="size-[32px] mt-[4px]" />
          )}
        </div>
        {/* Label */}
        <div className="flex flex-1 items-center justify-center pl-[64px]">
          <span
            className={cn(
              "font-semibold font-sans text-[18px] leading-none whitespace-nowrap",
              isVerified
                ? "text-(--color-accent)"
                : "text-(--arkada-text-primary)",
            )}
          >
            {isVerified ? "Wallet Verified" : "Verify Wallet"}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Outlined Wide
 * Status border + icon on left side + gradient bar on right.
 * Unverified: shield icon left, gradient bar right, white text.
 * Verified: check icon left, gradient bar right, white text.
 */
function OutlinedWideInner({ state }: InnerProps) {
  const isVerified = state === "verified";
  return (
    <div
      className={cn(
        "relative flex h-[54px] w-[220px] items-center rounded-2xl p-px",
        isVerified ? "bg-(--color-accent)" : "vwb-full-gradient",
      )}
    >
      <div
        className={cn(
          "relative flex h-full w-full items-center rounded-[15px] bg-black",
        )}
      >
        {/* Icon left */}
        <div className="absolute left-6 top-1/2 z-10 -translate-y-1/2">
          {isVerified ? (
            <CheckSmallIcon className="h-[18px] w-[21px] text-white scale-150" />
          ) : (
            <WalletSmallIcon className="h-[19px] w-[22px] text-white scale-150 mt-1" />
          )}
        </div>
        {/* Gradient bar right */}
        <div
          className={cn(
            "absolute right-[3px] top-[3px] flex h-[46px] w-[148px] items-center justify-center rounded-xl",
            isVerified ? "vwb-verified-gradient" : "vwb-full-gradient",
          )}
        >
          <span className="font-semibold font-sans text-[18px] leading-none text-white whitespace-nowrap">
            {isVerified ? "Wallet Verified" : "Verify Wallet"}
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
  [VerifyWalletVariants.COMPACT_GRADIENT]: GradientCompactInner,
  [VerifyWalletVariants.BANNER]: BannerInner,
  [VerifyWalletVariants.FLOATING]: FloatingInner,
  [VerifyWalletVariants.FLOATING_GRADIENT]: FloatingGradientInner,
  [VerifyWalletVariants.PILL]: PillInner,
  [VerifyWalletVariants.PILL_WIDE]: PillWideInner,
  [VerifyWalletVariants.OUTLINED]: OutlinedInner,
  [VerifyWalletVariants.OUTLINED_WIDE]: OutlinedWideInner,
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
