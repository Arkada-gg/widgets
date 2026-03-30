import { cn } from "@/shared/utils/cn";
import type { WidgetSize } from "@/web-components";
import { getBadgeConfig } from "../model/badge-config";
import { WalletBadges, type WalletVerificationData } from "../model/types";
import { ProgressBar } from "./ProgressBar";
import { RankDisplay } from "./RankDisplay";
import { WalletScores } from "./WalletScores";

export interface WidgetHeaderProps {
  data: WalletVerificationData;
  size: WidgetSize;
  className?: string;
}

export function WidgetHeader({ data, size, className }: WidgetHeaderProps) {
  const currentBadgeConfig = getBadgeConfig(data.currentBadge);
  const nextBadgeConfig = getBadgeConfig(data.nextBadge);

  return (
    <header
      className={cn("relative bg-(--arkada-bg-header) w-full", className)}
    >
      {/* Rank displays + progress */}
      <div
        className={cn(
          "flex items-start justify-between pb-3 pt-5",
          size === "lg" ? "px-8" : "px-4",
        )}
      >
        {/* Current rank */}
        <div className="relative flex flex-col items-center w-[102px] pt-4">
          <RankDisplay badge={currentBadgeConfig} label="Your rang" isActive />
        </div>

        {size === "sm" && (
          <h2 className="arkada-wv-title-gradient font-sans font-semibold text-[18px] text-center leading-[120%] whitespace-nowrap">
            {data.title}
          </h2>
        )}

        {/* Progress bar */}
        {size === "lg" && (
          <div className="flex-1 px-4">
            <h2 className="arkada-wv-title-gradient font-sans font-semibold text-2xl text-center leading-none pb-2">
              {data.title}
            </h2>

            {/* Subtitle with info icon */}
            <div className="flex items-center justify-center gap-1 pb-4">
              <span className="font-sans font-medium text-lg text-(--arkada-text-primary) leading-none">
                {data.subtitle}
              </span>
              <button
                className="w-3.5 h-3.5 text-(--arkada-text-muted) hover:text-(--arkada-text-primary) transition-colors"
                aria-label="More information"
              >
                <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle
                    cx="7"
                    cy="7"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M7 6v4M7 4.5v.01"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <ProgressBar currentBadge={data.currentBadge} />
          </div>
        )}

        {/* Next rank */}
        <div
          className={cn(
            "relative flex flex-col items-center w-[102px] pt-4",
            data.currentBadge === WalletBadges.LEGENDARY && "blur-[6px]",
          )}
        >
          <RankDisplay
            badge={nextBadgeConfig}
            label="Next rang"
            isActive={false}
          />
        </div>
      </div>
      {size === "sm" && (
        <div className="px-4 pb-4">
          <ProgressBar currentBadge={data.currentBadge} />
        </div>
      )}

      {/* Wallet scores */}
      <div className="flex justify-center">
        <WalletScores
          verifiedCount={data.verifiedCount}
          totalCount={data.totalCount}
          outdatedCount={data.outdatedCount}
        />
      </div>
    </header>
  );
}
