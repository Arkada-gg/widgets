import { cn } from "@/shared/utils/cn";
import { ProgressBar } from "@/ui-kit/components/base/ProgressBar";
import { RankDisplay } from "@/ui-kit/components/composed/RankDisplay";
import { WalletScores } from "@/ui-kit/components/composed/WalletScores";
import { getBadgeConfig } from "../model/badge-config";
import { WalletBadges, type WalletVerificationData } from "../model/types";

export interface WidgetHeaderProps {
  data: WalletVerificationData;
  className?: string;
}

export function WidgetHeader({ data, className }: WidgetHeaderProps) {
  const currentBadgeConfig = getBadgeConfig(data.currentBadge);
  const nextBadgeConfig = getBadgeConfig(data.nextBadge);

  return (
    <header
      className={cn("relative bg-(--arkada-bg-header) w-full", className)}
    >
      {/* Rank displays + progress */}
      <div className="flex items-start justify-between px-8 pb-3 pt-5">
        {/* Current rank */}
        <div className="relative flex flex-col items-center w-[102px] pt-4">
          <RankDisplay badge={currentBadgeConfig} label="Your rang" isActive />
        </div>

        {/* Progress bar */}
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
