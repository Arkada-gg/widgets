import { cn } from "@/shared/utils/cn";
import { TabGroup, type TabItem } from "@/ui-kit/components/base/TabGroup";
import { useMemo, useState } from "react";
import { WalletBadges, type FilterTab, type WalletEntry } from "../model/types";
import { ChainListEntry } from "./ChainListEntry";

const TABS: TabItem[] = [
  { id: "all", label: "All" },
  { id: "verified", label: "Verified" },
  { id: "not-verified", label: "Not Verified" },
];

export interface WidgetChainsListProps {
  entries: WalletEntry[];
  onVerify?: (entryId: string) => void;
  className?: string;
}

export function WidgetChainsList({
  entries,
  onVerify,
  className,
}: WidgetChainsListProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredEntries = useMemo(() => {
    switch (activeTab) {
      case "verified":
        return entries.filter((e) => e.status !== WalletBadges.UNVERIFIED);
      case "not-verified":
        return entries.filter((e) => e.status === WalletBadges.UNVERIFIED);
      default:
        return entries;
    }
  }, [entries, activeTab]);

  return (
    <div className={cn("relative flex flex-col", className)}>
      {/* Entries list */}
      <div className="flex flex-col gap-1 p-3 overflow-y-auto arkada-wv-scrollbar-hidden flex-1 min-h-[200px]">
        {filteredEntries.length > 0 ? (
          <>
            {filteredEntries.map((entry) => (
              <ChainListEntry
                key={entry.id}
                entry={entry}
                onVerify={onVerify}
              />
            ))}
            {/* Spacer so the last entry isn't hidden behind the fixed tab bar */}
            <div className="pb-12" />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center pb-12">
            <p className="font-sans text-sm font-medium text-(--arkada-text-muted)">
              No networks found
            </p>
          </div>
        )}
      </div>

      {/* Tab bar fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center py-3">
        <TabGroup
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as FilterTab)}
        />
      </div>
    </div>
  );
}
