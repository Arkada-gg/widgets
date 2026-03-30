import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { TabGroup } from "../TabGroup";

const TABS = [
  { id: "all", label: "All" },
  { id: "verified", label: "Verified" },
  { id: "not-verified", label: "Not Verified" },
];

const meta: Meta<typeof TabGroup> = {
  title: "UI Kit/Base/TabGroup",
  component: TabGroup,
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TabGroup>;

export const Dark: Story = {
  render: () => {
    const [active, setActive] = useState("all");
    return (
      <div data-theme="dark" style={{ padding: 24 }}>
        <TabGroup tabs={TABS} activeTab={active} onTabChange={setActive} />
      </div>
    );
  },
};

export const Light: Story = {
  render: () => {
    const [active, setActive] = useState("all");
    return (
      <div data-theme="light" style={{ padding: 24 }}>
        <TabGroup tabs={TABS} activeTab={active} onTabChange={setActive} />
      </div>
    );
  },
};
