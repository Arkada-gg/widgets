import type { Meta, StoryObj } from "@storybook/react-vite";
import type { WalletVerificationData } from "../../model/types";
import { WalletBadges } from "../../model/types";
import { WalletVerificationWidget } from "../WalletVerificationWidget";

const createMockData = (
  overrides?: Partial<WalletVerificationData>,
): WalletVerificationData => ({
  title: "Verify Wallet",
  subtitle: "Global Rang",
  currentBadge: WalletBadges.VERIFIED,
  nextBadge: WalletBadges.TRUSTED,
  verifiedCount: 10,
  totalCount: 30,
  outdatedCount: 2,
  progress: 60,
  entries: Array.from({ length: 7 }, (_, i) => ({
    id: `entry-${i}`,
    network: { name: "Base", icon: "networks/base.png" },
    action: "Bridge",
    actionUrl: "#",
    status: WalletBadges.LEGENDARY,
    statusLabel: "Unverified",
  })),
  ...overrides,
});

const meta: Meta<typeof WalletVerificationWidget> = {
  title: "Widgets/WalletVerification",
  component: WalletVerificationWidget,
  args: {
    data: createMockData(),
    theme: "dark",
    size: "m",
    variant: "vertical",
  },
  argTypes: {
    theme: {
      control: "radio",
      options: ["dark", "light"],
    },
    size: {
      control: "radio",
      options: ["s", "m", "l"],
    },
    variant: {
      control: "radio",
      options: ["vertical", "horizontal"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof WalletVerificationWidget>;

export const Dark: Story = {
  args: { theme: "dark" },
};

export const Light: Story = {
  args: { theme: "light" },
};

export const Small: Story = {
  args: { size: "s" },
};

export const Large: Story = {
  args: { size: "l" },
};

export const UnverifiedBadge: Story = {
  args: {
    data: createMockData({
      currentBadge: WalletBadges.UNVERIFIED,
      nextBadge: WalletBadges.IDENTIFIED,
      verifiedCount: 0,
      progress: 0,
    }),
  },
};

export const IdentifiedBadge: Story = {
  args: {
    data: createMockData({
      currentBadge: WalletBadges.IDENTIFIED,
      nextBadge: WalletBadges.BASIC,
      verifiedCount: 3,
      progress: 20,
    }),
  },
};

export const BasicBadge: Story = {
  args: {
    data: createMockData({
      currentBadge: WalletBadges.BASIC,
      nextBadge: WalletBadges.VERIFIED,
      verifiedCount: 6,
      progress: 40,
    }),
  },
};

export const TrustedBadge: Story = {
  args: {
    data: createMockData({
      currentBadge: WalletBadges.TRUSTED,
      nextBadge: WalletBadges.ELITE,
      verifiedCount: 20,
      progress: 80,
    }),
  },
};

export const EliteBadge: Story = {
  args: {
    data: createMockData({
      currentBadge: WalletBadges.ELITE,
      nextBadge: WalletBadges.LEGENDARY,
      verifiedCount: 25,
      progress: 90,
    }),
  },
};

export const LegendaryBadge: Story = {
  args: {
    data: createMockData({
      currentBadge: WalletBadges.LEGENDARY,
      nextBadge: WalletBadges.LEGENDARY,
      verifiedCount: 30,
      totalCount: 30,
      progress: 100,
    }),
  },
};

export const MixedStatuses: Story = {
  args: {
    data: createMockData({
      entries: [
        {
          id: "1",
          network: { name: "Ethereum", icon: "networks/ethereum.png" },
          action: "Swap",
          status: WalletBadges.UNVERIFIED,
          statusLabel: "Verified",
        },
        {
          id: "2",
          network: { name: "Base", icon: "networks/base.png" },
          action: "Bridge",
          status: WalletBadges.BASIC,
          statusLabel: "Unverified",
        },
        {
          id: "3",
          network: { name: "Arbitrum", icon: "networks/arbitrum.png" },
          action: "Stake",
          status: WalletBadges.LEGENDARY,
          isOutdated: true,
          statusLabel: "Outdated",
        },
      ],
    }),
  },
};
