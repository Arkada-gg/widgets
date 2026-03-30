import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusIcon } from "../StatusIcon";

const meta: Meta<typeof StatusIcon> = {
  title: "UI Kit/Base/StatusIcon",
  component: StatusIcon,
  args: {
    status: "unverified",
    size: 32,
  },
  argTypes: {
    status: {
      control: "radio",
      options: ["verified", "unverified", "outdated"],
    },
    size: { control: { type: "range", min: 16, max: 64, step: 4 } },
  },
};

export default meta;
type Story = StoryObj<typeof StatusIcon>;

export const Unverified: Story = {
  args: { status: "unverified" },
};

export const Verified: Story = {
  args: { status: "verified" },
};

export const Outdated: Story = {
  args: { status: "outdated" },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, padding: 24 }}>
      <StatusIcon status="verified" size={32} />
      <StatusIcon status="unverified" size={32} />
      <StatusIcon status="outdated" size={32} />
    </div>
  ),
};
