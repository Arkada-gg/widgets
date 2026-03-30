import type { WidgetSize, WidgetTheme } from "@/shared/config";
import { DEFAULT_SIZE, DEFAULT_THEME } from "@/shared/config";
import { useTheme } from "@/shared/hooks/useTheme";
import { getCloudflareLink } from "@/shared/utils/cloudflare";
import { cn } from "@/shared/utils/cn";
import type { WalletVerificationData } from "../model/types";
import "../styles/widget.css";
import { WidgetChainsList } from "./WidgetChainsList";
import { WidgetHeader } from "./WidgetHeader";

export interface WalletVerificationWidgetProps {
  data: WalletVerificationData;
  theme?: WidgetTheme;
  size?: WidgetSize;
  onVerify?: (entryId: string) => void;
  className?: string;
}

export function WalletVerificationWidget({
  data,
  theme = DEFAULT_THEME,
  size = DEFAULT_SIZE,
  onVerify,
  className,
}: WalletVerificationWidgetProps) {
  const themeRef = useTheme(theme);

  return (
    <div
      ref={themeRef}
      data-theme={theme}
      className={cn(
        "relative overflow-hidden rounded-2xl font-sans",
        "bg-(--arkada-bg)",
        "flex flex-col",
        "w-full h-full",
        className,
      )}
      style={{
        backgroundImage: `url(${getCloudflareLink(`widget/widget-wv-bg-${theme}.avif`)})`,
        backgroundSize: "auto 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Scrollbar divider on right edge */}
      <div className="absolute right-[6px] top-[162px] w-0.5 h-[100px] bg-(--arkada-divider) rounded-sm z-10" />

      {/* Header section */}
      <WidgetHeader data={data} />

      {/* Leaderboard section */}
      <WidgetChainsList
        entries={data.entries}
        onVerify={onVerify}
        className="flex-1 min-h-0"
      />
    </div>
  );
}
