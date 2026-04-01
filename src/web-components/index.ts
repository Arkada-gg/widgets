// Side-effect import registers the custom element
import type React from "react";
import "./arkada-wvbs-widget";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "arkada-wvbs-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        data?: string;
        theme?: string;
        size?: string;
      };
    }
  }
}

// Re-export class for programmatic use
export { ArkadaWvbsWidget } from "./arkada-wvbs-widget";
export type { WvbsData } from "./arkada-wvbs-widget";

// Shared types consumers may need
export type { WidgetSize, WidgetTheme } from "@/shared/config";
export { VerifyWalletVariants } from "@/widgets/verify-wallet-button";
export type { VerifyWalletVariant } from "@/widgets/verify-wallet-button";
