import { createArkadaElement } from "./base/createArkadaElement";
import { WalletVerificationWidget } from "@/widgets/wallet-verification";
import type { WalletVerificationData } from "@/widgets/wallet-verification";

const ArkadaWvWidget = createArkadaElement<WalletVerificationData>({
  component: WalletVerificationWidget,
  observedAttributes: ["address"],
  events: {
    onVerify: {
      eventName: "verify",
      buildDetail: (el, args) => ({
        entryId: args[0],
        address: el.getAttribute("address"),
      }),
    },
  },
});

if (!customElements.get("arkada-wv-widget")) {
  customElements.define("arkada-wv-widget", ArkadaWvWidget);
}

export { ArkadaWvWidget };
export type { WalletVerificationData };
export type { WidgetTheme, WidgetSize, WidgetVariant } from "@/shared/config";
export { WalletBadges } from "@/widgets/wallet-verification";
export type { WalletBadges as WalletBadgesType } from "@/widgets/wallet-verification";
