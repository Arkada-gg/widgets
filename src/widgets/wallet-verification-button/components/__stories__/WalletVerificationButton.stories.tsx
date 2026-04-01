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
  style,
}: WvbsData & { theme?: WidgetTheme; style?: Record<string, string> }) {
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
    if (style) {
      Object.entries(style).forEach(([k, v]) => {
        (el as HTMLElement).style.setProperty(k, v as string);
      });
    }
  }, [walletAddress, variant, theme, referralCode, someVerified, style]);

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

// ---------------------------------------------------------------------------
// Customization examples — CSS variables applied on the host element
// ---------------------------------------------------------------------------

/**
 * Custom brand gradient: orange → violet.
 * Override --wvb-gradient-start / --wvb-gradient-end on the host element.
 */
export const WebComponentCustomGradient: Story = {
  name: "Web Component — Custom Gradient",
  render: () => (
    <WvbsWebComponent
      walletAddress={DEMO_ADDRESS}
      variant="compact"
      theme="dark"
      style={{
        "--wvb-gradient-start": "#ff8c00",
        "--wvb-gradient-end": "#9b30ff",
        "--wvb-glow": "#7b1fa2",
      }}
    />
  ),
};

/**
 * Custom brand theme: --arkada-bg, --arkada-border, gradient overridden.
 * Shows full control over both shared and widget-specific variables.
 */
export const WebComponentCustomTheme: Story = {
  name: "Web Component — Custom Theme (teal)",
  render: () => (
    <WvbsWebComponent
      walletAddress={DEMO_ADDRESS}
      variant="banner"
      theme="dark"
      style={{
        "--arkada-bg": "#0a1f1f",
        "--arkada-border": "#0d9488",
        "--arkada-text-primary": "#ccfbf1",
        "--arkada-text-secondary": "#5eead4",
        "--wvb-gradient-start": "#0d9488",
        "--wvb-gradient-end": "#0891b2",
        "--wvb-verified-start": "#047857",
        "--wvb-verified-end": "#059669",
        "--wvb-glow": "#0d9488",
        "--wvb-focus": "#14b8a6",
      }}
    />
  ),
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 32,
          background: "#0a1f1f",
          borderRadius: 12,
          width: 480,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Fully customized Web Component example.
 * Demonstrates overriding both shared and button-specific variables together.
 */
export const WebComponentFullyCustomized: Story = {
  name: "Web Component — Fully Customized (sunset)",
  render: () => (
    <WvbsWebComponent
      walletAddress={DEMO_ADDRESS}
      variant="compact"
      theme="light"
      referralCode="SUNSET88"
      style={{
        "--arkada-bg-accent": "#fff7ed",
        "--arkada-text-primary": "#7c2d12",
        "--arkada-text-muted": "#9a3412",
        "--wvb-gradient-start": "#f97316",
        "--wvb-gradient-end": "#ec4899",
        "--wvb-verified-start": "#16a34a",
        "--wvb-verified-end": "#15803d",
        "--wvb-container-gradient-dark-sides": "#1f2937",
        "--wvb-container-gradient-dark-middle": "#374151",
        "--wvb-container-gradient-light-sides": "#fed7aa",
        "--wvb-container-gradient-light-middle": "#fff7ed",
        "--wvb-container-gradient-light-banner-sides": "#ffedd5",
        "--wvb-glow": "#fb923c",
        "--wvb-focus": "#f97316",
      }}
    />
  ),
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 32,
          background: "#000",
          borderRadius: 12,
          width: 480,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * React component with inline CSS variables — same customization API works
 * in plain React context via the wrapping element's style prop.
 */
export const ReactCustomGradient: Story = {
  name: "React — Custom Gradient (green)",
  render: () => (
    <div
      style={
        {
          "--wvb-gradient-start": "#16a34a",
          "--wvb-gradient-end": "#15803d",
          "--wvb-verified-start": "#166534",
          "--wvb-verified-end": "#15803d",
          "--wvb-glow": "#14532d",
          "--wvb-focus": "#16a34a",
        } as React.CSSProperties
      }
    >
      <WalletVerificationButton
        walletAddress={DEMO_ADDRESS}
        variant="compact"
        theme="dark"
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 32,
          background: "#393939",
          borderRadius: 12,
          display: "inline-flex",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Fully customized React example with an extended token set.
 */
export const ReactFullyCustomized: Story = {
  name: "React — Fully Customized (aurora)",
  render: () => (
    <div
      style={
        {
          "--arkada-bg-accent": "#0b1020",
          "--arkada-text-primary": "#e0f2fe",
          "--arkada-text-muted": "#93c5fd",
          "--wvb-gradient-start": "#06b6d4",
          "--wvb-gradient-end": "#8b5cf6",
          "--wvb-verified-start": "#22c55e",
          "--wvb-verified-end": "#16a34a",
          "--wvb-container-gradient-dark-sides": "#020617",
          "--wvb-container-gradient-dark-middle": "#0f172a",
          "--wvb-container-gradient-light-sides": "#bae6fd",
          "--wvb-container-gradient-light-middle": "#e0f2fe",
          "--wvb-container-gradient-light-banner-sides": "#cffafe",
          "--wvb-glow": "#22d3ee",
          "--wvb-focus": "#38bdf8",
        } as React.CSSProperties
      }
    >
      <WalletVerificationButton
        walletAddress={DEMO_ADDRESS}
        variant="floating"
        theme="dark"
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 32,
          background: "#ffffff",
          borderRadius: 12,
          display: "inline-flex",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
