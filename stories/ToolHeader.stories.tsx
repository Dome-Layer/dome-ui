import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToolHeader, AuthProvider } from "../src";

const meta: Meta<typeof ToolHeader> = {
  title: "Layout/ToolHeader",
  component: ToolHeader,
  parameters: { layout: "fullscreen" },
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

/** Full-width / edge-aligned — for tools whose working view spans the viewport (e.g. DI dashboard, DocI). */
export const Fluid: Story = {
  args: {
    toolName: "Data Intelligence",
    width: "fluid",
    navLinks: [{ label: "Saved", href: "/saved" }],
  },
};

/** Hub link suppressed (e.g. a standalone surface). */
export const NoHubLink: Story = {
  args: {
    toolName: "Document Intelligence",
    showHubLink: false,
  },
};

/** Signed-in: the account avatar + dropdown replaces the Sign in button. */
export const SignedIn: Story = {
  args: {
    toolName: "Data Intelligence",
    navLinks: [{ label: "Saved", href: "/saved" }],
  },
  decorators: [
    (Story) => {
      // Fake session JWT so AuthProvider surfaces an identity (display-only decode).
      const payload = btoa(JSON.stringify({ email: "francesco@domelayer.com" }))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
      document.cookie = `dome_auth_token=header.${payload}.sig`;
      return (
        <AuthProvider>
          <Story />
        </AuthProvider>
      );
    },
  ],
};

/** Mobile viewport — nav collapses behind the menu button. */
export const Mobile: Story = {
  args: {
    toolName: "Process Analyzer",
    navLinks: [{ label: "Saved", href: "/saved" }],
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
