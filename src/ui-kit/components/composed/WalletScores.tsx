import { cn } from "@/shared/utils/cn";

export interface WalletScoresProps {
  verifiedCount: number;
  totalCount: number;
  outdatedCount: number;
  className?: string;
}

export function WalletScores({
  verifiedCount,
  totalCount,
  outdatedCount,
  className,
}: WalletScoresProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center gap-5",
        "px-3 py-1.5 rounded-t-md",
        "bg-gradient-to-r from-[#474747] via-[#737373] to-[#343434]",
        "shadow-[var(--arkada-shadow-scores)]",
        "font-sans font-semibold text-xs text-right text-[var(--arkada-text-scores)] whitespace-nowrap",
        className,
      )}
    >
      <span>
        Verified{" "}
        <span className="text-white">{verifiedCount}</span>
        <span>/{totalCount}</span>
      </span>
      <span>
        Outdated{" "}
        <span className="text-white">{outdatedCount}</span>
      </span>
    </div>
  );
}
