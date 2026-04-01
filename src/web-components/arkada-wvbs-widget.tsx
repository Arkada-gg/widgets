import type { WidgetTheme } from "@/shared/config";
import type { VerifyWalletVariant } from "@/widgets/verify-wallet-button";
import { WalletVerificationButton } from "@/widgets/wallet-verification-button";
import widgetStyles from "@/widgets/verify-wallet-button/styles/verify-wallet-button.css?inline";
import { createArkadaElement } from "./base/createArkadaElement";

export interface WvbsData {
  walletAddress: string;
  /** Referral code appended as ?ref=<code> to the verification URL */
  referralCode?: string;
  /**
   * When true — wallet is considered verified if ANY network has rank > 0.
   * When false/omitted — uses global.rank > 0 (default).
   */
  someVerified?: boolean;
  /** Visual layout variant — defaults to VerifyWalletButton's own default ("compact") */
  variant?: VerifyWalletVariant;
}

// `theme` is a shared attribute handled by createArkadaElement — passed as a
// top-level prop alongside `data`. All other props travel inside `data` JSON since
// the factory has no first-class mechanism for arbitrary individual attributes.
const ArkadaWvbsWidget = createArkadaElement<WvbsData>({
  component: ({ data, theme }: { data: WvbsData; theme?: WidgetTheme }) => (
    <WalletVerificationButton
      walletAddress={data.walletAddress}
      referralCode={data.referralCode}
      someVerified={data.someVerified}
      theme={theme}
      variant={data.variant}
    />
  ),
  widgetStyles,
});

if (!customElements.get("arkada-wvbs-widget")) {
  customElements.define("arkada-wvbs-widget", ArkadaWvbsWidget);
}

export { ArkadaWvbsWidget };
