import type { WidgetSize, WidgetTheme } from "@/shared/config";
import { DEFAULT_SIZE, DEFAULT_THEME, SIZE_CONFIG } from "@/shared/config";
import { useTheme } from "@/shared/hooks/useTheme";
import { getCloudflareLink } from "@/shared/utils/cloudflare";
import { cn } from "@/shared/utils/cn";
import type { WalletVerificationData } from "../model/types";
import "../styles/widget.css";
import { WidgetChainsList } from "./WidgetChainsList";
import { WidgetHeader } from "./WidgetHeader";

// widget height default value
const DEFAULT_HEIGHT = 600;
// minimal widget height
const MIN_HEIGHT = 370;

export interface WalletVerificationWidgetProps {
  data: WalletVerificationData;
  theme?: WidgetTheme;
  size?: WidgetSize;
  height?: number;
  onVerify?: (entryId: string) => void;
  className?: string;
}

export function WalletVerificationWidget({
  data,
  theme = DEFAULT_THEME,
  size = DEFAULT_SIZE,
  height,
  onVerify,
  className,
}: WalletVerificationWidgetProps) {
  const themeRef = useTheme(theme);
  const sizeConfig = SIZE_CONFIG[size];
  const resolvedHeight = Math.max(height ?? DEFAULT_HEIGHT, MIN_HEIGHT);

  return (
    <div
      ref={themeRef}
      data-theme={theme}
      className={cn(
        "relative overflow-hidden rounded-2xl font-sans",
        "bg-(--arkada-bg)",
        "flex flex-col",
        className,
      )}
      style={{
        width: sizeConfig.width,
        height: resolvedHeight,
        maxWidth: "100%",
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
