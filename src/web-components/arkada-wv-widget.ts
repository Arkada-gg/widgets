import React from "react";
import ReactDOM from "react-dom/client";
import { WalletVerificationWidget } from "@/widgets/wallet-verification/components/WalletVerificationWidget";
import type { WalletVerificationData } from "@/widgets/wallet-verification/model/types";
import type { WidgetTheme, WidgetSize, WidgetVariant } from "@/shared/config";
import { DEFAULT_THEME, DEFAULT_SIZE, DEFAULT_VARIANT } from "@/shared/config";
import styles from "@/index.css?inline";

const OBSERVED_ATTRIBUTES = [
  "address",
  "theme",
  "size",
  "variant",
  "data",
] as const;

class ArkadaWvWidget extends HTMLElement {
  static observedAttributes = [...OBSERVED_ATTRIBUTES];

  private _root: ReactDOM.Root | null = null;
  private _shadowRoot: ShadowRoot;
  private _mountPoint: HTMLDivElement;
  private _data: WalletVerificationData | null = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });

    // Inject styles into shadow DOM
    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    this._shadowRoot.appendChild(styleEl);

    this._mountPoint = document.createElement("div");
    this._shadowRoot.appendChild(this._mountPoint);
  }

  connectedCallback() {
    this._root = ReactDOM.createRoot(this._mountPoint);
    this._render();
  }

  disconnectedCallback() {
    this._root?.unmount();
    this._root = null;
  }

  attributeChangedCallback(
    _name: string,
    _oldValue: string | null,
    _newValue: string | null,
  ) {
    this._render();
  }

  /** Allow setting data programmatically */
  set data(value: WalletVerificationData) {
    this._data = value;
    this._render();
  }

  get data(): WalletVerificationData | null {
    return this._data;
  }

  private _render() {
    if (!this._root) return;

    // Parse data from attribute or property
    let data = this._data;
    if (!data) {
      const dataAttr = this.getAttribute("data");
      if (dataAttr) {
        try {
          data = JSON.parse(dataAttr) as WalletVerificationData;
        } catch {
          console.error("[arkada-wv-widget] Invalid JSON in data attribute");
          return;
        }
      }
    }

    if (!data) return;

    const theme = (this.getAttribute("theme") as WidgetTheme) || DEFAULT_THEME;
    const size = (this.getAttribute("size") as WidgetSize) || DEFAULT_SIZE;
    const variant =
      (this.getAttribute("variant") as WidgetVariant) || DEFAULT_VARIANT;

    this._root.render(
      React.createElement(WalletVerificationWidget, {
        data,
        theme,
        size,
        variant,
        onVerify: (entryId: string) => {
          this.dispatchEvent(
            new CustomEvent("verify", {
              detail: { entryId, address: this.getAttribute("address") },
              bubbles: true,
              composed: true,
            }),
          );
        },
      }),
    );
  }
}

if (!customElements.get("arkada-wv-widget")) {
  customElements.define("arkada-wv-widget", ArkadaWvWidget);
}

export { ArkadaWvWidget };
export type { WalletVerificationData, WidgetTheme, WidgetSize, WidgetVariant };
export { WalletBadges } from "@/widgets/wallet-verification/model/types";
export type { WalletBadges as WalletBadgesType } from "@/widgets/wallet-verification/model/types";
