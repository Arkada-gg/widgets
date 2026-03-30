import type { WidgetSize, WidgetTheme, WidgetVariant } from "@/shared/config";
import {
  DEFAULT_SIZE,
  DEFAULT_THEME,
  DEFAULT_VARIANT,
  SIZE_CONFIG,
} from "@/shared/config";
import { useTheme } from "@/shared/hooks/useTheme";
import { cn } from "@/shared/utils/cn";
import type { WalletVerificationData } from "../model/types";
import "../styles/widget.css";
import { WidgetChainsList } from "./WidgetChainsList";
import { WidgetHeader } from "./WidgetHeader";

export interface WalletVerificationWidgetProps {
  data: WalletVerificationData;
  theme?: WidgetTheme;
  size?: WidgetSize;
  variant?: WidgetVariant;
  onVerify?: (entryId: string) => void;
  className?: string;
}

export function WalletVerificationWidget({
  data,
  theme = DEFAULT_THEME,
  size = DEFAULT_SIZE,
  variant = DEFAULT_VARIANT,
  onVerify,
  className,
}: WalletVerificationWidgetProps) {
  const themeRef = useTheme(theme);
  const sizeConfig = SIZE_CONFIG[size];

  return (
    <div
      ref={themeRef}
      data-theme={theme}
      className={cn(
        "relative overflow-hidden rounded-2xl font-sans",
        "bg-(--arkada-bg)",
        variant === "vertical" && "flex flex-col",
        variant === "horizontal" && "flex flex-row",
        className,
      )}
      style={{
        width: sizeConfig.width,
        maxWidth: "100%",
      }}
    >
      {/* Scrollbar divider on right edge */}
      <div className="absolute right-[6px] top-[162px] w-0.5 h-[100px] bg-(--arkada-divider) rounded-sm z-10" />

      {/* Header section */}
      <WidgetHeader
        data={data}
        className={variant === "horizontal" ? "w-1/2" : undefined}
      />

      {/* Leaderboard section */}
      <WidgetChainsList
        entries={data.entries}
        onVerify={onVerify}
        className={cn(
          variant === "horizontal" ? "w-1/2" : undefined,
          variant === "vertical" && "max-h-[440px]",
        )}
      />
    </div>
  );
}
