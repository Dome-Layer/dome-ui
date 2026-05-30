import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../src";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "accent"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: "Default" } };
export const Success: Story = { args: { variant: "success", children: "Passed" } };
export const Warning: Story = { args: { variant: "warning", children: "Review" } };
export const Error: Story = { args: { variant: "error", children: "Failed" } };
export const Accent: Story = { args: { variant: "accent", children: "Active" } };

export const AllVariants: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge>Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="accent">Accent</Badge>
    </div>
  ),
};
