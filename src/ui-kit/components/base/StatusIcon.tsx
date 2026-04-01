import { cn } from "@/shared/utils/cn";
import { WalletBadges } from "@/widgets/wallet-verification";

import { getBadgeConfig } from "@/widgets/wallet-verification/model/badge-config";

export interface StatusIconProps {
  badge: WalletBadges;
  isOutdated?: boolean;
  size?: number;
  className?: string;
}

export function StatusIcon({
  badge,
  isOutdated,
  size = 32,
  className,
}: StatusIconProps) {
  const config = getBadgeConfig(badge);

  return (
    <div
      className={cn(
        "relative inline-grid place-items-center rounded-full shadow-[0px_2px_2px_0px_rgba(0,0,0,0.2)] p-1",
        className,
      )}
      style={{ width: size, height: size, background: config.outlineGradient }}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex items-center justify-center rounded-full w-full h-full",
        )}
        style={{ background: config.mainGradient }}
      >
        {!isOutdated &&
          (badge === WalletBadges.UNVERIFIED ? (
            <svg
              viewBox="0 0 12 12"
              fill="none"
              className="w-[60%] h-[60%]"
              aria-hidden="true"
            >
              <path
                d="M3 3l6 6M9 3l-6 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 12 12"
              fill="none"
              className="w-[60%] h-[60%]"
              aria-hidden="true"
            >
              <path
                d="M2.5 6l3 3 4.5-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ))}

        {isOutdated && badge !== WalletBadges.UNVERIFIED && (
          <svg
            viewBox="0 0 12 12"
            fill="none"
            className="w-[60%] h-[60%]"
            aria-hidden="true"
          >
            <circle cx="6" cy="6" r="4" stroke="white" strokeWidth="1.5" />
            <path
              d="M6 4v2.5l1.5 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
