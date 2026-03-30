import { getCloudflareLink } from "@/shared/utils/cloudflare";
import { cn } from "@/shared/utils/cn";
import type { BadgeConfig } from "../model/types";

export interface RankDisplayProps {
  badge: BadgeConfig;
  label: string; // "Your rang" or "Next rang"
  isActive: boolean;
  className?: string;
}

export function RankDisplay({
  badge,
  label,
  isActive,
  className,
}: RankDisplayProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-1.5 pt-[51px]",
        className,
      )}
    >
      {/* Glow */}
      {isActive && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 w-[72px] h-[72px] rounded-full blur-[30px]"
          style={{ background: badge.glowColor }}
        />
      )}

      {/* Badge icon */}
      <img
        src={getCloudflareLink(badge.icon)}
        alt={badge.label}
        className="w-[60px] h-[60px] object-contain absolute top-0 left-1/2 -translate-x-1/2"
        loading="lazy"
      />

      {/* Badge label pill */}
      <div
        className={cn(
          "flex items-center justify-center px-6 py-1.5 rounded-lg",
          "backdrop-blur-xs font-sans font-semibold text-xs uppercase whitespace-nowrap",
          "bg-(--arkada-bg-overlay)",
        )}
      >
        <span
          className={cn(
            isActive
              ? "bg-clip-text text-transparent"
              : "text-(--arkada-text-next-rank)",
          )}
          style={isActive ? { backgroundImage: badge.textGradient } : undefined}
        >
          {badge.label}
        </span>
      </div>

      {/* Sub-label */}
      <span className="font-sans font-light text-xs text-(--arkada-text-muted) text-center">
        {label}
      </span>
    </div>
  );
}
