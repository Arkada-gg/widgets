import { cn } from "@/shared/utils/cn";
import { BADGE_CONFIGS } from "@/widgets/wallet-verification/model/badge-config";
import type { WalletBadges } from "@/widgets/wallet-verification/model/types";

const BADGE_KEYS = Object.keys(BADGE_CONFIGS).map(Number) as WalletBadges[];
const TOTAL_TIERS = BADGE_KEYS.length;

export interface ProgressBarProps {
  currentBadge: WalletBadges;
  className?: string;
}

export function ProgressBar({ currentBadge, className }: ProgressBarProps) {
  const currentBadgeIndex = BADGE_KEYS.indexOf(currentBadge);
  const segment = 100 / TOTAL_TIERS;
  const dotAt = (i: number) => (i + 0.5) * segment;
  const fillPercent =
    currentBadgeIndex < 0
      ? 0
      : currentBadgeIndex >= TOTAL_TIERS - 1
        ? 100
        : dotAt(currentBadgeIndex) + segment * 0.45;

  return (
    <div className={cn("relative flex items-center w-full", className)}>
      {/* Track */}
      <div
        className="relative w-full h-3 rounded-3xl overflow-visible"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 0 1px 0 rgba(0, 0, 0, 0.1) inset",
        }}
      >
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 transition-all duration-200 ease-in-out"
          style={{
            width: `${fillPercent}%`,
            background:
              "linear-gradient(83deg, #738EF4 -28.53%, #FF7C6E 96.15%), #000",
            borderRadius: fillPercent >= 100 ? "24px" : "24px 0 0 24px",
          }}
        />

        {/* Tier dots */}
        {BADGE_KEYS.map((_, index) => {
          const dotPosition = (index + 0.5) * (100 / TOTAL_TIERS);

          return (
            <div
              key={index}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-1 flex justify-center items-center"
              style={{ left: `${dotPosition}%` }}
            >
              <div
                className="flex justify-center items-center rounded-full"
                style={{
                  height: "14px",
                  width: "14px",
                  backgroundColor: "white",
                  boxShadow:
                    "0 0 2px rgba(0, 0, 0, 0.1) inset, 0 0 4px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #ffffff",
                  boxSizing: "border-box",
                }}
              >
                {index <= currentBadgeIndex && (
                  <div
                    className="rounded-full"
                    style={{
                      height: "10px",
                      width: "10px",
                      border: "3px solid #FD6D81",
                      boxSizing: "border-box",
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* Progress indicator */}
        {fillPercent < 95 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-200 ease-in-out"
            style={{ left: `${fillPercent}%` }}
          >
            <div
              className="relative flex justify-center items-center rounded-full"
              style={{
                height: "12px",
                width: "12px",
                background:
                  "linear-gradient(83deg, #738EF4 -28.53%, #FF7C6E 96.15%), #000",
                boxShadow:
                  "0 0 4px rgba(0, 0, 0, 0.3), 0 0 2px rgba(255, 255, 255, 0.2) inset",
                border: "2px solid rgba(255, 255, 255, 0.5)",
                boxSizing: "border-box",
              }}
            >
              <div
                className="rounded-full bg-white"
                style={{ height: "6px", width: "6px" }}
              />
              <div
                className="absolute top-1/2 left-1/2 rounded-full"
                style={{
                  height: "18px",
                  width: "18px",
                  transform: "translate(-50%, -50%)",
                  filter: "blur(2px)",
                  background:
                    "linear-gradient(90deg, transparent 0%, #ffffff 100%)",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
