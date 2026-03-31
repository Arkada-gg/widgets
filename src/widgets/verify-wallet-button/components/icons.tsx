import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Three overlapping chain-logo circles (compact / gradient variants).
 * Unverified: 3 colored circles (purple, blue, gray).
 * Verified: 2 colored circles + green check overlay.
 * Proportions: 68w × 40h (matching Figma).
 */
export function ChainGroupIcon({
  verified = false,
  ...props
}: IconProps & { verified?: boolean }) {
  return (
    <svg viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Circle 1 — leftmost, purple */}
      <circle cx={18} cy={24} r={16} fill="#7B5BBF" />
      <path d="M12 20l6 3-6 3v-6z" fill="white" opacity={0.8} />
      <path d="M18 17l6 7-6 7v-14z" fill="white" opacity={0.5} />

      {/* Circle 2 — middle, blue */}
      <circle cx={34} cy={24} r={16} fill="#5377FF" />
      <path d="M30 18l8 6-8 6v-12z" fill="white" opacity={0.6} />

      {verified ? (
        /* Circle 3 — rightmost, green check */
        <>
          <circle cx={50} cy={24} r={16} fill="url(#cg-check-grad)" />
          <path
            d="M42 24l4.5 4.5L55.5 19"
            stroke="white"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        /* Circle 3 — rightmost, gray */
        <>
          <circle cx={50} cy={24} r={16} fill="#6B6B6B" />
          <path d="M44 21a6 6 0 1 1 0 6" stroke="white" strokeWidth={1.8} opacity={0.7} strokeLinecap="round" />
          <path d="M44 21l-2 2 2 2" stroke="white" strokeWidth={1.8} opacity={0.7} strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      <defs>
        <linearGradient id="cg-check-grad" x1={34} y1={8} x2={66} y2={40} gradientUnits="userSpaceOnUse">
          <stop stopColor="#0e9035" />
          <stop offset={1} stopColor="#43c36d" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Toggle switch icon for compact-minimal variant.
 * Unverified: gray pill + white circle on left (off).
 * Verified: green pill + white checkmark circle on right (on).
 * Proportions: 58w × 32h (matching Figma).
 */
export function ToggleIcon({
  verified = false,
  ...props
}: IconProps & { verified?: boolean }) {
  return (
    <svg viewBox="0 0 58 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {verified ? (
        <>
          <rect x={0} y={0} width={58} height={32} rx={16} fill="url(#ti-verified-grad)" />
          <circle cx={42} cy={16} r={12} fill="white" />
          <path
            d="M37 16l3.5 3.5L48 12"
            stroke="#14be47"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <rect x={0} y={0} width={58} height={32} rx={16} fill="#4a4a4a" />
          <circle cx={16} cy={16} r={12} fill="#6b6b6b" />
          <circle cx={16} cy={16} r={10} fill="#888" />
        </>
      )}
      <defs>
        <linearGradient id="ti-verified-grad" x1={0} y1={0} x2={58} y2={32} gradientUnits="userSpaceOnUse">
          <stop stopColor="#0e9035" />
          <stop offset={1} stopColor="#43c36d" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Large wallet circle icon for floating variants.
 * 60×60 metallic gray circle with wallet silhouette.
 */
export function WalletCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Outer metallic ring */}
      <circle cx={30} cy={30} r={29} fill="url(#wci-ring)" stroke="#555" strokeWidth={0.5} />
      <circle cx={30} cy={30} r={24} fill="url(#wci-inner)" />
      {/* Wallet icon */}
      <rect x={20} y={22} width={20} height={16} rx={2.5} stroke="white" strokeWidth={1.8} fill="none" />
      <path d="M20 26h20" stroke="white" strokeWidth={1.2} />
      <rect x={32} y={29} width={8} height={5} rx={2} fill="#888" stroke="white" strokeWidth={1} />
      <circle cx={36} cy={31.5} r={1} fill="white" />
      <defs>
        <linearGradient id="wci-ring" x1={0} y1={0} x2={60} y2={60} gradientUnits="userSpaceOnUse">
          <stop stopColor="#999" />
          <stop offset={0.5} stopColor="#bbb" />
          <stop offset={1} stopColor="#777" />
        </linearGradient>
        <linearGradient id="wci-inner" x1={6} y1={6} x2={54} y2={54} gradientUnits="userSpaceOnUse">
          <stop stopColor="#666" />
          <stop offset={0.5} stopColor="#888" />
          <stop offset={1} stopColor="#555" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Green circle checkmark — 60×60 for floating, scaled for others */
export function CheckCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx={30} cy={30} r={30} fill="url(#cci-grad)" />
      <path
        d="M18 30.5l8.5 8.5L42 22"
        stroke="white"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="cci-grad" x1={0} y1={0} x2={60} y2={60} gradientUnits="userSpaceOnUse">
          <stop stopColor="#0e9035" />
          <stop offset={1} stopColor="#43c36d" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Small green check for inline use (pill/outlined verified icon zone) */
export function CheckSmallIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2 9l6 6L19 2"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Double chevron right for pill/pill-wide unverified icon zone */
export function ChevronsRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8 8l8 8-8 8"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 8l8 8-8 8"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Shield/alert icon for outlined variant unverified icon zone */
export function ShieldAlertIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11 1L20 5.5v5c0 4.5-3.2 7.5-9 9-5.8-1.5-9-4.5-9-9v-5L11 1Z"
        fill="currentColor"
        opacity={0.2}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path d="M11 7v3.5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
      <circle cx={11} cy={13.5} r={1} fill="currentColor" />
    </svg>
  );
}
