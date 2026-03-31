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
type Story = StoryObj<typeof VerifyWalletButton>;

/* ---- Individual variants ---- */

export const Compact: Story = { args: { variant: "compact" } };
export const CompactVerified: Story = {
  args: { variant: "compact", state: "verified" },
};
export const CompactLight: Story = {
  args: { variant: "compact", theme: "light" },
};
export const CompactLightVerified: Story = {
  args: { variant: "compact", state: "verified", theme: "light" },
};
export const CompactMinimal: Story = { args: { variant: "compact-minimal" } };
export const CompactMinimalVerified: Story = {
  args: { variant: "compact-minimal", state: "verified" },
};
export const CompactMinimalLight: Story = {
  args: { variant: "compact-minimal", theme: "light" },
};
export const CompactMinimalLightVerified: Story = {
  args: { variant: "compact-minimal", theme: "light", state: "verified" },
};
export const CompactGradient: Story = { args: { variant: "compact-gradient" } };
export const CompactGradientVerified: Story = {
  args: { variant: "compact-gradient", state: "verified" },
};
export const Banner: Story = { args: { variant: "banner" } };
export const BannerVerified: Story = {
  args: { variant: "banner", state: "verified" },
};
export const BannerLight: Story = {
  args: { variant: "banner", theme: "light" },
};
export const BannerLightVerified: Story = {
  args: { variant: "banner", theme: "light", state: "verified" },
};
export const Floating: Story = { args: { variant: "floating" } };
export const FloatingVerified: Story = {
  args: { variant: "floating", state: "verified" },
};
export const FloatingGradient: Story = {
  args: { variant: "floating-gradient" },
};
export const FloatingGradientVerified: Story = {
  args: { variant: "floating-gradient", state: "verified" },
};
export const Pill: Story = { args: { variant: "pill" } };
export const PillVerified: Story = {
  args: { variant: "pill", state: "verified" },
};
export const PillLight: Story = { args: { variant: "pill", theme: "light" } };
export const PillLightVerified: Story = {
  args: { variant: "pill", theme: "light", state: "verified" },
};
export const PillWide: Story = { args: { variant: "pill-wide" } };
export const PillWideVerified: Story = {
  args: { variant: "pill-wide", state: "verified" },
};
export const Outlined: Story = { args: { variant: "outlined" } };
export const OutlinedVerified: Story = {
  args: { variant: "outlined", state: "verified" },
};
export const OutlinedLight: Story = {
  args: { variant: "outlined", theme: "light" },
};
export const OutlinedLightVerified: Story = {
  args: { variant: "outlined", theme: "light", state: "verified" },
};
export const OutlinedWide: Story = { args: { variant: "outlined-wide" } };
export const OutlinedWideVerified: Story = {
  args: { variant: "outlined-wide", state: "verified" },
};

/* ---- Full state matrix — dark ---- */

export const AllVariantsDark: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {ALL_VARIANTS.map((v) => (
        <div
          key={v}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <span
            style={{ color: "#666", fontSize: 11, fontFamily: "monospace" }}
          >
            {v}
          </span>
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
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
        <div
          key={v}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <span
            style={{ color: "#999", fontSize: 11, fontFamily: "monospace" }}
          >
            {v}
          </span>
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
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
