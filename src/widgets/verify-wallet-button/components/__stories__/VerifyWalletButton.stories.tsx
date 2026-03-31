import type { Meta, StoryObj } from "@storybook/react-vite";
import { VerifyWalletVariants } from "../../model/types";
import { VerifyWalletButton } from "../VerifyWalletButton";

const ALL_VARIANTS = Object.values(VerifyWalletVariants);

const meta: Meta<typeof VerifyWalletButton> = {
  title: "Widgets/VerifyWalletButton",
  component: VerifyWalletButton,
  args: {
    state: "unverified",
    variant: "compact",
    theme: "dark",
  },
  argTypes: {
    state: { control: "radio", options: ["unverified", "verified"] },
    variant: { control: "select", options: ALL_VARIANTS },
    theme: { control: "radio", options: ["dark", "light"] },
  },
  decorators: [
    (Story, ctx) => (
      <div
        style={{
          padding: 32,
          background: ctx.args.theme === "light" ? "#f7f7f7" : "#111",
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
type Story = StoryObj<typeof VerifyWalletButton>;

/* ---- Individual variants ---- */

export const Compact: Story = { args: { variant: "compact" } };
export const CompactLight: Story = { args: { variant: "compact", theme: "light" } };
export const CompactMinimal: Story = { args: { variant: "compact-minimal" } };
export const CompactMinimalLight: Story = { args: { variant: "compact-minimal", theme: "light" } };
export const Banner: Story = { args: { variant: "banner" } };
export const BannerLight: Story = { args: { variant: "banner", theme: "light" } };
export const Floating: Story = { args: { variant: "floating" } };
export const FloatingSubtle: Story = { args: { variant: "floating-subtle" } };
export const FloatingSubtleLight: Story = { args: { variant: "floating-subtle", theme: "light" } };
export const Pill: Story = { args: { variant: "pill" } };
export const PillLight: Story = { args: { variant: "pill", theme: "light" } };
export const PillWide: Story = { args: { variant: "pill-wide" } };
export const Outlined: Story = { args: { variant: "outlined" } };
export const OutlinedLight: Story = { args: { variant: "outlined", theme: "light" } };
export const OutlinedWide: Story = { args: { variant: "outlined-wide" } };
export const Gradient: Story = { args: { variant: "gradient" } };

/* ---- State variants ---- */

export const Verified: Story = { args: { state: "verified", variant: "compact" } };
export const VerifiedBanner: Story = { args: { state: "verified", variant: "banner" } };
export const VerifiedFloating: Story = { args: { state: "verified", variant: "floating" } };
export const VerifiedPill: Story = { args: { state: "verified", variant: "pill" } };

/* ---- Full state matrix — dark ---- */

export const AllVariantsDark: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {ALL_VARIANTS.map((v) => (
        <div key={v} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ color: "#666", fontSize: 11, fontFamily: "monospace" }}>
            {v}
          </span>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <VerifyWalletButton variant={v} state="unverified" theme="dark" />
            <VerifyWalletButton variant={v} state="verified" theme="dark" />
          </div>
        </div>
      ))}
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ padding: 32, background: "#111", borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};

/* ---- Full state matrix — light ---- */

export const AllVariantsLight: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {ALL_VARIANTS.map((v) => (
        <div key={v} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ color: "#999", fontSize: 11, fontFamily: "monospace" }}>
            {v}
          </span>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <VerifyWalletButton variant={v} state="unverified" theme="light" />
            <VerifyWalletButton variant={v} state="verified" theme="light" />
          </div>
        </div>
      ))}
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ padding: 32, background: "#f7f7f7", borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};
