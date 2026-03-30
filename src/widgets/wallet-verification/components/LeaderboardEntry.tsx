import { cn } from "@/shared/utils/cn";
import { Button } from "@/ui-kit/components/base/Button";
import { NetworkIcon } from "@/ui-kit/components/base/NetworkIcon";
import { StatusIcon } from "@/ui-kit/components/base/StatusIcon";
import type { WalletEntry } from "../model/types";

export interface LeaderboardEntryProps {
  entry: WalletEntry;
  onVerify?: (entryId: string) => void;
  className?: string;
}

export function LeaderboardEntry({
  entry,
  onVerify,
  className,
}: LeaderboardEntryProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-8 p-3 rounded-xl",
        "bg-[var(--arkada-bg-card)]",
        "transition-colors duration-200",
        className,
      )}
    >
      {/* Network */}
      <div className="flex items-center gap-3 w-[123px] shrink-0">
        <NetworkIcon
          icon={entry.network.icon}
          name={entry.network.name}
          size={32}
        />
        <span className="font-sans font-semibold text-sm text-[var(--arkada-text-primary)] leading-none truncate">
          {entry.network.name}
        </span>
      </div>

      {/* Action */}
      <div className="shrink-0">
        {entry.actionUrl ? (
          <a
            href={entry.actionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-medium text-sm text-[var(--arkada-text-primary)] underline leading-none hover:opacity-80 transition-opacity"
          >
            {entry.action}
          </a>
        ) : (
          <span className="font-sans font-medium text-sm text-[var(--arkada-text-primary)] underline leading-none">
            {entry.action}
          </span>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 w-[189px] shrink-0">
        <StatusIcon status={entry.status} size={32} />
        <span className="font-sans font-medium text-sm text-[var(--arkada-text-secondary)] leading-none whitespace-nowrap">
          {entry.statusLabel}
        </span>
      </div>

      {/* Verify button */}
      <Button
        variant="primary"
        size="md"
        className="w-[100px] shrink-0"
        onClick={() => onVerify?.(entry.id)}
      >
        Verify
      </Button>
    </div>
  );
}
