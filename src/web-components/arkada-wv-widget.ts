import type { WalletVerificationData } from "@/widgets/wallet-verification";
import { WalletVerificationWidget } from "@/widgets/wallet-verification";
import { createArkadaElement } from "./base/createArkadaElement";

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

export type { WidgetSize, WidgetTheme } from "@/shared/config";
export { WalletBadges } from "@/widgets/wallet-verification";
export type { WalletBadges as WalletBadgesType } from "@/widgets/wallet-verification";
export { ArkadaWvWidget };
export type { WalletVerificationData };
