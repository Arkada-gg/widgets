import { cn } from "@/shared/utils/cn";

export interface TabItem {
  id: string;
  label: string;
}

export interface TabGroupProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function TabGroup({
  tabs,
  activeTab,
  onTabChange,
  className,
}: TabGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center p-0.5 rounded-xl",
        "bg-[var(--arkada-tab-bg)] border border-solid border-[var(--arkada-tab-border)]",
        "shadow-[var(--arkada-shadow-tab)]",
        className,
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center justify-center px-3 py-2 rounded-lg",
              "font-sans font-semibold text-xs text-center whitespace-nowrap",
              "transition-all duration-200 ease-in-out cursor-pointer",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent",
              isActive
                ? "bg-[var(--arkada-tab-active-bg)] text-[var(--arkada-tab-active-text)]"
                : "bg-transparent text-[var(--arkada-tab-inactive-text)] hover:opacity-80",
            )}
          >
            <span className="flex items-center h-5">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
