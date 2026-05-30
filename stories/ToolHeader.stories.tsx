import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToolHeader, AuthProvider } from "../src";

const meta: Meta<typeof ToolHeader> = {
  title: "Layout/ToolHeader",
  component: ToolHeader,
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToolHeader>;

export const Default: Story = {
  args: {
    toolName: "Process Analyzer",
  },
};

export const WithNavLinks: Story = {
  args: {
    toolName: "Process Analyzer",
    navLinks: [{ label: "Saved", href: "/saved" }],
  },
};

export const MultipleNavLinks: Story = {
  args: {
    toolName: "Data Intelligence",
    navLinks: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "History", href: "/history" },
    ],
  },
};
