import type { WidgetTheme } from "@/shared/config";
import type {
  VerifyWalletState,
  VerifyWalletVariant,
} from "@/widgets/verify-wallet-button";
import { VerifyWalletButton } from "@/widgets/verify-wallet-button";
import { createArkadaElement } from "./base/createArkadaElement";

interface VerifyWalletButtonData {
  state?: VerifyWalletState;
  variant?: VerifyWalletVariant;
}

const ArkadaVwbWidget = createArkadaElement<VerifyWalletButtonData>({
  component: ({
    data,
    theme,
  }: {
    data: VerifyWalletButtonData;
    theme?: WidgetTheme;
  }) => (
    <VerifyWalletButton
      state={data.state}
      variant={data.variant}
      theme={theme}
    />
  ),
  observedAttributes: ["state", "variant"],
  events: {
    onVerify: "verify",
  },
});

if (!customElements.get("arkada-vwb-widget")) {
  customElements.define("arkada-vwb-widget", ArkadaVwbWidget);
}

export type { VerifyWalletButtonData };
export { ArkadaVwbWidget };
export {
  VerifyWalletVariants,
  type VerifyWalletVariant,
  type VerifyWalletState,
} from "@/widgets/verify-wallet-button";
