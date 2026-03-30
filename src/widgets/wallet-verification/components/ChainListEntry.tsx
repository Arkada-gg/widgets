import { cn } from "@/shared/utils/cn";
import { Button } from "@/ui-kit/components/base/Button";
import { NetworkIcon } from "@/ui-kit/components/base/NetworkIcon";
import { StatusIcon } from "@/ui-kit/components/base/StatusIcon";
import type { WidgetSize } from "@/web-components";
import { getBadgeConfig } from "../model/badge-config";
import type { WalletEntry } from "../model/types";

export interface ChainListEntryProps {
  entry: WalletEntry;
  size: WidgetSize;
  onVerify?: (entryId: string) => void;
  className?: string;
}

export function ChainListEntry({
  entry,
  size,
  onVerify,
  className,
}: ChainListEntryProps) {
  const config = getBadgeConfig(entry.status);
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-8 p-3 rounded-xl",
        "bg-(--arkada-bg-card)",
        "transition-colors duration-200",
        className,
      )}
    >
      {/* Network */}
      <div
        className={cn(
          "flex items-center gap-3 shrink-0",
          size === "lg" ? "w-[123px]" : "w-8",
        )}
      >
        <NetworkIcon
          icon={entry.network.icon}
          name={entry.network.name}
          size={32}
        />
        {size === "lg" && (
          <span className="font-sans font-semibold text-sm text-(--arkada-text-primary) leading-none truncate">
            {entry.network.name}
          </span>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 w-[112px] shrink-0">
        <StatusIcon
          badge={entry.status}
          isOutdated={entry.isOutdated}
          size={32}
        />
        <span
          className="font-sans font-medium text-sm text-transparent bg-clip-text whitespace-nowrap"
          style={{
            backgroundImage: config.textGradientEntry,
          }}
        >
          {config.label}
        </span>
      </div>

      {/* Verify button */}
      <Button
        variant={entry.isOutdated ? "red" : "primary"}
        size="md"
        className="w-[100px] shrink-0"
        onClick={() => onVerify?.(entry.id)}
      >
        {entry.isOutdated ? "Update" : "Verify"}
      </Button>
    </div>
  );
}
