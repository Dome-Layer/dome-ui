import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../src";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { children: "Sign in" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Cancel" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Learn more" } };
export const Loading: Story = { args: { loading: true, children: "Saving..." } };
export const Disabled: Story = { args: { disabled: true, children: "Disabled" } };

export const AllVariants: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};
