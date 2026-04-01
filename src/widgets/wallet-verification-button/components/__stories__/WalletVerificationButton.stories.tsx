import type { WidgetTheme } from "@/shared/config";
import {
  ArkadaWvbsWidget,
  type WvbsData,
} from "@/web-components/arkada-wvbs-widget";
import { VerifyWalletVariants } from "@/widgets/verify-wallet-button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useEffect, useRef } from "react";
import { WalletVerificationButton } from "../WalletVerificationButton";

// Register web component once for all web component stories
if (
  typeof customElements !== "undefined" &&
  !customElements.get("arkada-wvbs-widget")
) {
  customElements.define("arkada-wvbs-widget", ArkadaWvbsWidget);
}

const DEMO_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
const ALL_VARIANTS = Object.values(VerifyWalletVariants);

// ---------------------------------------------------------------------------
// Thin wrapper that mounts <arkada-wvbs-widget> imperatively.
// Avoids JSX intrinsic element type issues while keeping full attribute control.
// ---------------------------------------------------------------------------
function WvbsWebComponent({
  walletAddress,
  variant,
  theme = "dark",
  referralCode,
  someVerified,
}: WvbsData & { theme?: WidgetTheme }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const data: WvbsData = {
      walletAddress,
      variant,
      referralCode,
      someVerified,
    };
    el.setAttribute("data", JSON.stringify(data));
    el.setAttribute("theme", theme);
  }, [walletAddress, variant, theme, referralCode, someVerified]);

  return React.createElement("arkada-wvbs-widget", { ref });
}

// ---------------------------------------------------------------------------

const meta: Meta<typeof WalletVerificationButton> = {
  title: "Widgets/WalletVerificationButton",
  component: WalletVerificationButton,
  args: {
    walletAddress: DEMO_ADDRESS,
    variant: "compact",
    theme: "dark",
  },
  argTypes: {
    variant: { control: "select", options: ALL_VARIANTS },
    theme: { control: "radio", options: ["dark", "light"] },
  },
  decorators: [
    (Story, ctx) => (
      <div
        style={{
          padding: 32,
          background: ctx.args.theme === "light" ? "#f7f7f7" : "#393939",
          borderRadius: 12,
          display: "inline-flex",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WalletVerificationButton>;

// ---------------------------------------------------------------------------
// React component examples
// ---------------------------------------------------------------------------

/** Smart button that fetches real verification status for the wallet address. */
export const ReactCompactDark: Story = {
  name: "React — Compact / Dark",
  args: {
    walletAddress: DEMO_ADDRESS,
    variant: "compact",
    theme: "dark",
  },
};

/** Banner layout on a light background. */
export const ReactBannerLight: Story = {
  name: "React — Banner / Light",
  args: {
    walletAddress: DEMO_ADDRESS,
    variant: "banner",
    theme: "light",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 32,
          background: "#f7f7f7",
          borderRadius: 12,
          width: 480,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

// ---------------------------------------------------------------------------
// Web component examples
// ---------------------------------------------------------------------------

/**
 * The same smart button rendered as a native Web Component (`<arkada-wvbs-widget>`).
 * Styles live in an isolated Shadow DOM — no leakage to or from the host page.
 */
export const WebComponentCompactDark: Story = {
  name: "Web Component — Compact / Dark",
  render: () => (
    <WvbsWebComponent
      walletAddress={DEMO_ADDRESS}
      variant="compact"
      theme="dark"
    />
  ),
};

/**
 * Web Component with `pill-wide` variant, light theme, and a referral code.
 * The `ref` query parameter is appended to the verification URL automatically.
 */
export const WebComponentPillWideLight: Story = {
  name: "Web Component — Pill Wide / Light",
  render: () => (
    <WvbsWebComponent
      walletAddress={DEMO_ADDRESS}
      variant="pill-wide"
      theme="light"
      referralCode="PARTNER42"
    />
  ),
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 32,
          background: "#f7f7f7",
          borderRadius: 12,
          width: 480,
        }}
      >
        <Story />
      </div>
    ),
  ],
};
