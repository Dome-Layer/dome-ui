import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeToggle } from "../src";

const meta: Meta<typeof ThemeToggle> = {
  title: "Layout/ThemeToggle",
  component: ThemeToggle,
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};
