import { useState, useMemo } from "react";
import { cn } from "@/shared/utils/cn";
import { TabGroup, type TabItem } from "@/ui-kit/components/base/TabGroup";
import { LeaderboardEntry } from "@/ui-kit/components/composed/LeaderboardEntry";
import type { WalletEntry, FilterTab } from "../model/types";

const TABS: TabItem[] = [
  { id: "all", label: "All" },
  { id: "verified", label: "Verified" },
  { id: "not-verified", label: "Not Verified" },
];

export interface WidgetLeaderboardProps {
  entries: WalletEntry[];
  onVerify?: (entryId: string) => void;
  className?: string;
}

export function WidgetLeaderboard({
  entries,
  onVerify,
  className,
}: WidgetLeaderboardProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredEntries = useMemo(() => {
    switch (activeTab) {
      case "verified":
        return entries.filter((e) => e.status === "verified");
      case "not-verified":
        return entries.filter(
          (e) => e.status === "unverified" || e.status === "outdated",
        );
      default:
        return entries;
    }
  }, [entries, activeTab]);

  return (
    <div className={cn("relative flex flex-col", className)}>
      {/* Entries list */}
      <div className="flex flex-col gap-1 p-3 overflow-y-auto arkada-wv-scrollbar-hidden flex-1">
        {filteredEntries.map((entry) => (
          <LeaderboardEntry
            key={entry.id}
            entry={entry}
            onVerify={onVerify}
          />
        ))}
      </div>

      {/* Tab bar overlay at bottom */}
      <div className="flex justify-center py-3">
        <TabGroup
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as FilterTab)}
        />
      </div>
    </div>
  );
}
