import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ChainGroupIcon({
  verified = false,
  ...props
}: IconProps & { verified?: boolean }) {
  return (
    <svg viewBox="0 0 72 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Left circle — red-to-blue gradient with triangle logo */}
      <circle cx={20} cy={24} r={20} fill="url(#cg-left-grad)" />
      <path fillRule="evenodd" clipRule="evenodd" d="M20.5 13L34 31H7L20.5 13ZM14.4384 27.2704H26.5616L20.5 19.1882L14.4384 27.2704Z" fill="white" />

      {/* Right circle — gray (unverified) or green (verified), with drop shadow */}
      <g filter="url(#cg-right-shadow)">
        <circle cx={48} cy={24} r={20} fill={verified ? "url(#cg-right-grad)" : "url(#cg-right-grad)"} />
      </g>

      {verified ? (
        <>
          <path opacity={0.25} d="M62 24C62 31.732 55.732 38 48 38C40.268 38 34 31.732 34 24C34 16.268 40.268 10 48 10C55.732 10 62 16.268 62 24Z" fill="#093217" />
          <g filter="url(#cg-check-blur-lg)">
            <path d="M54.6382 18.4055C55.1206 18.9463 55.1206 19.823 54.6382 20.3637L46.4029 29.5945C45.9205 30.1352 45.1383 30.1352 44.6559 29.5945L41.3618 25.9021C40.8794 25.3614 40.8794 24.4847 41.3618 23.944C41.8442 23.4033 42.6264 23.4033 43.1088 23.944L45.5294 26.6572L49.2103 22.5314L52.8912 18.4055C53.3736 17.8648 54.1558 17.8648 54.6382 18.4055Z" fill="white" />
          </g>
          <g filter="url(#cg-check-blur-sm)">
            <path d="M54.6382 18.4055C55.1206 18.9463 55.1206 19.823 54.6382 20.3637L46.4029 29.5945C45.9205 30.1352 45.1383 30.1352 44.6559 29.5945L41.3618 25.9021C40.8794 25.3614 40.8794 24.4847 41.3618 23.944C41.8442 23.4033 42.6264 23.4033 43.1088 23.944L45.5294 26.6572L49.2103 22.5314L52.8912 18.4055C53.3736 17.8648 54.1558 17.8648 54.6382 18.4055Z" fill="white" />
          </g>
          <path d="M54.6382 18.4055C55.1206 18.9463 55.1206 19.823 54.6382 20.3637L46.4029 29.5945C45.9205 30.1352 45.1383 30.1352 44.6559 29.5945L41.3618 25.9021C40.8794 25.3614 40.8794 24.4847 41.3618 23.944C41.8442 23.4033 42.6264 23.4033 43.1088 23.944L45.5294 26.6572L49.2103 22.5314L52.8912 18.4055C53.3736 17.8648 54.1558 17.8648 54.6382 18.4055Z" fill="white" />
        </>
      ) : (
        <g filter="url(#cg-wallet-shadow)">
          <path d="M58.8708 28.06C58.6068 31.0441 56.4834 33 53.4028 33H43.501C40.4645 33 38 30.4965 38 27.4118V19.5882C38 16.5482 39.8043 14.4247 42.6099 14.0671C42.8959 14.0224 43.193 14 43.501 14H53.4028C53.6889 14 53.9639 14.0112 54.228 14.0559C56.8575 14.3688 58.6398 16.2353 58.8708 18.94C58.9039 19.2641 58.6398 19.5324 58.3207 19.5324H56.6154C55.5592 19.5324 54.5801 19.9459 53.8759 20.6835C53.0398 21.5106 52.6217 22.6729 52.7207 23.8353C52.8967 25.8694 54.6571 27.4676 56.7475 27.4676H58.3207C58.6398 27.4676 58.9039 27.7359 58.8708 28.06Z" fill="white" />
          <path d="M60 22.349V24.6514C60 25.2661 59.5159 25.769 58.8998 25.7914H56.7434C55.5552 25.7914 54.466 24.9085 54.367 23.7014C54.3009 22.9973 54.565 22.3379 55.0271 21.8796C55.4342 21.4549 55.9953 21.209 56.6114 21.209H58.8998C59.5159 21.2314 60 21.7343 60 22.349Z" fill="white" />
        </g>
      )}

      <defs>
        <filter id="cg-right-shadow" x={24} y={0} width={48} height={48} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>

        {verified ? (
          <>
            <filter id="cg-check-blur-lg" x={33} y={10} width={30} height={28} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation={4} result="effect1_foregroundBlur" />
            </filter>
            <filter id="cg-check-blur-sm" x={37} y={14} width={22} height={20} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation={2} result="effect1_foregroundBlur" />
            </filter>
            <linearGradient id="cg-right-grad" x1={28} y1={4} x2={68} y2={44} gradientUnits="userSpaceOnUse">
              <stop stopColor="#88F9AD" />
              <stop offset={1} stopColor="#41BD6A" />
            </linearGradient>
          </>
        ) : (
          <>
            <filter id="cg-wallet-shadow" x={34} y={12} width={30} height={27} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy={2} />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
            <linearGradient id="cg-right-grad" x1={28} y1={4} x2={68} y2={44} gradientUnits="userSpaceOnUse">
              <stop stopColor="#BFBFBF" />
              <stop offset={1} stopColor="#696969" />
            </linearGradient>
          </>
        )}

        <linearGradient id="cg-left-grad" x1={-5.577} y1={44.571} x2={49.84} y2={36.854} gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6A59" />
          <stop offset={1} stopColor="#5377FF" />
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
    <svg viewBox="0 0 59 34" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {verified ? (
        <>
          <rect y={1} width={58} height={32} rx={16} fill="#50C978" />
          <g filter="url(#ti-circle-shadow)">
            <circle cx={42} cy={17} r={13} fill="white" />
          </g>
          <path d="M47.6899 12.338C48.1034 12.7886 48.1034 13.5191 47.6899 13.9697L40.6311 21.662C40.2176 22.1127 39.5471 22.1127 39.1337 21.662L36.3101 18.5851C35.8966 18.1345 35.8966 17.4039 36.3101 16.9533C36.7236 16.5027 37.394 16.5027 37.8075 16.9533L39.8824 19.2144L43.0374 15.7762L46.1925 12.338C46.606 11.8873 47.2764 11.8873 47.6899 12.338Z" fill="#50C978" />
          <defs>
            <filter id="ti-circle-shadow" x={25} y={0} width={34} height={34} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
          </defs>
        </>
      ) : (
        <>
          <rect x={1} y={1} width={58} height={32} rx={16} fill="#535353" />
          <g filter="url(#ti-circle-shadow)">
            <circle cx={17} cy={17} r={13} fill="white" />
          </g>
          <defs>
            <filter id="ti-circle-shadow" x={0} y={0} width={34} height={34} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation={2} />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
          </defs>
        </>
      )}
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
