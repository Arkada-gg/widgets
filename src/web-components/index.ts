// Side-effect imports that register all custom elements
import "./arkada-wv-widget";
import "./arkada-vwb-widget";

// Re-export classes and types for programmatic use
export { ArkadaWvWidget } from "./arkada-wv-widget";
export { ArkadaVwbWidget } from "./arkada-vwb-widget";

// Re-export shared types consumers need
export type { WidgetSize, WidgetTheme } from "@/shared/config";

// Re-export widget types
export { WalletBadges } from "@/widgets/wallet-verification";
export type { WalletVerificationData } from "@/widgets/wallet-verification";

export { VerifyWalletVariants } from "@/widgets/verify-wallet-button";
export type {
  VerifyWalletVariant,
  VerifyWalletState,
} from "@/widgets/verify-wallet-button";
