import type { WidgetTheme } from "@/shared/config";
import type { VerifyWalletVariant } from "@/widgets/verify-wallet-button";
import { WalletVerificationButton } from "@/widgets/wallet-verification-button";
import { createArkadaElement } from "./base/createArkadaElement";

export interface WvbsData {
  walletAddress: string;
  /** Visual layout variant — defaults to VerifyWalletButton's own default ("compact") */
  variant?: VerifyWalletVariant;
}

// `theme` is a shared attribute handled by createArkadaElement — passed as a
// top-level prop alongside `data`. `variant` travels inside `data` JSON since
// the factory has no first-class mechanism for arbitrary individual attributes.
const ArkadaWvbsWidget = createArkadaElement<WvbsData>({
  component: ({ data, theme }: { data: WvbsData; theme?: WidgetTheme }) => (
    <WalletVerificationButton
      walletAddress={data.walletAddress}
      theme={theme}
      variant={data.variant}
    />
  ),
});

if (!customElements.get("arkada-wvbs-widget")) {
  customElements.define("arkada-wvbs-widget", ArkadaWvbsWidget);
}

export { ArkadaWvbsWidget };
