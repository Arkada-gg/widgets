import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusIcon } from "../StatusIcon";
import { WalletBadges } from "@/widgets/wallet-verification/model/types";

const meta: Meta<typeof StatusIcon> = {
  title: "UI Kit/Base/StatusIcon",
  component: StatusIcon,
  args: {
    badge: WalletBadges.UNVERIFIED,
    isOutdated: false,
    size: 32,
  },
  argTypes: {
    badge: {
      control: "select",
      options: Object.values(WalletBadges),
      labels: {
        [WalletBadges.UNVERIFIED]: "Unverified",
        [WalletBadges.IDENTIFIED]: "Identified",
        [WalletBadges.BASIC]: "Basic",
        [WalletBadges.VERIFIED]: "Verified",
        [WalletBadges.TRUSTED]: "Trusted",
        [WalletBadges.ELITE]: "Elite",
        [WalletBadges.LEGENDARY]: "Legendary",
      },
    },
    isOutdated: { control: "boolean" },
    size: { control: { type: "range", min: 16, max: 64, step: 4 } },
  },
};

export default meta;
type Story = StoryObj<typeof StatusIcon>;

export const Unverified: Story = {
  args: { badge: WalletBadges.UNVERIFIED },
};

export const Identified: Story = {
  args: { badge: WalletBadges.IDENTIFIED },
};

export const Basic: Story = {
  args: { badge: WalletBadges.BASIC },
};

export const Verified: Story = {
  args: { badge: WalletBadges.VERIFIED },
};

export const Trusted: Story = {
  args: { badge: WalletBadges.TRUSTED },
};

export const Elite: Story = {
  args: { badge: WalletBadges.ELITE },
};

export const Legendary: Story = {
  args: { badge: WalletBadges.LEGENDARY },
};

export const Outdated: Story = {
  args: { badge: WalletBadges.VERIFIED, isOutdated: true },
};

export const AllBadges: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, padding: 24, flexWrap: "wrap" }}>
      {(Object.entries(WalletBadges) as [string, number][]).map(([key, value]) => (
        <div key={value} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <StatusIcon badge={value as WalletBadges} size={32} />
          <span style={{ fontSize: 10, opacity: 0.6 }}>{key}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllBadgesOutdated: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, padding: 24, flexWrap: "wrap" }}>
      {(Object.entries(WalletBadges) as [string, number][])
        .filter(([, value]) => value !== WalletBadges.UNVERIFIED)
        .map(([key, value]) => (
          <div key={value} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <StatusIcon badge={value as WalletBadges} isOutdated size={32} />
            <span style={{ fontSize: 10, opacity: 0.6 }}>{key}</span>
          </div>
        ))}
    </div>
  ),
};
