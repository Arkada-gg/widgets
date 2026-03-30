import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI Kit/Base/Button",
  component: Button,
  args: {
    children: "Verify",
    variant: "primary",
    size: "md",
  },
  argTypes: {
    variant: { control: "radio", options: ["primary", "ghost"] },
    size: { control: "radio", options: ["sm", "md"] },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Small: Story = {
  args: { size: "sm" },
};
