// Side-effect imports that register all custom elements
import "./arkada-wv-widget";

// Re-export classes and types for programmatic use
export { ArkadaWvWidget } from "./arkada-wv-widget";

// Re-export shared types consumers need
export type { WidgetTheme, WidgetSize, WidgetVariant } from "@/shared/config";

// Re-export widget types
export type { WalletVerificationData } from "@/widgets/wallet-verification";
export { WalletBadges } from "@/widgets/wallet-verification";
