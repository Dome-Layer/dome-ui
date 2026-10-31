import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ToolHeader, AuthProvider, StagingBanner } from "../src";

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

/** Full-width / edge-aligned: for tools whose working view spans the viewport (e.g. DI dashboard, DocI). */
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

/** Mobile viewport: nav collapses behind the menu button. */
export const Mobile: Story = {
  args: {
    toolName: "Process Analyzer",
    navLinks: [{ label: "Saved", href: "/saved" }],
  },
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
};

/* ─── The blue top bar (design system v2.7) ─────────────────────────────
 * Each story below pins its theme, its session and its viewport, so they
 * can be compared side by side and screenshotted. */

function sessionCookie(email: string | null) {
  if (email === null) {
    document.cookie = "dome_auth_token=; Max-Age=0; Path=/";
    return;
  }
  const payload = btoa(JSON.stringify({ email }))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  document.cookie = `dome_auth_token=header.${payload}.sig; Path=/`;
}

/** Page in the given theme with some neutral content under the bar, and the session set. */
function page(theme: "light" | "dark", email: string | null = null): Decorator {
  return (Story) => {
    sessionCookie(email);
    // ThemeToggle reads its icon from the theme cookie, so match it to the story's theme.
    document.cookie = `dome-theme=${theme}; Path=/`;
    return (
      <div
        data-theme={theme}
        style={{
          minHeight: "100vh",
          background: "var(--color-bg-base)",
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-sans)",
        }}
      >
        <AuthProvider>
          <Story />
        </AuthProvider>
        <main style={{ padding: "32px 24px", maxWidth: 1152, margin: "0 auto" }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: "0 0 8px" }}>Saved analyses</h1>
          <p style={{ color: "var(--color-text-secondary)", margin: 0 }}>
            The screens inside the tools stay neutral; only the bar is blue.
          </p>
        </main>
      </div>
    );
  };
}

const phone = { viewport: { value: "mobile1", isRotated: false } };
const barArgs = {
  toolName: "Process Analyzer",
  navLinks: [{ label: "Saved", href: "/saved" }],
  currentPath: "/saved",
};

/** Desktop, signed out: white wordmark, tool name and links, Saved as the current page, inverse Sign in. */
export const BarLight: Story = { args: barArgs, decorators: [page("light")] };

export const BarDark: Story = { args: barArgs, decorators: [page("dark")] };

/** Desktop, signed in: "All tools" (back to the hub, domelayer.com/app) leads the nav, then the tool's own links. */
export const BarSignedInLight: Story = {
  args: barArgs,
  decorators: [page("light", "francesco@domelayer.com")],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole("link", { name: /all tools/i })).toBeVisible();
  },
};

export const BarSignedInDark: Story = {
  ...BarSignedInLight,
  decorators: [page("dark", "francesco@domelayer.com")],
};

/** Desktop, signed in, account menu open: email and Sign out, on the page colour; the bar stays solid. */
export const BarAccountMenuLight: Story = {
  args: barArgs,
  decorators: [page("light", "francesco@domelayer.com")],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByLabelText(/account/i));
    await expect(canvas.getByRole("menu")).toBeVisible();
  },
};

export const BarAccountMenuDark: Story = {
  ...BarAccountMenuLight,
  decorators: [page("dark", "francesco@domelayer.com")],
};

/** Phone width: theme toggle and menu button stay on the bar. */
export const BarPhoneLight: Story = {
  args: barArgs,
  globals: phone,
  decorators: [page("light")],
};

export const BarPhoneDark: Story = {
  args: barArgs,
  globals: phone,
  decorators: [page("dark")],
};

/** Phone menu open: the page-colour menu, "All tools" first; the bar stays solid above it. */
export const BarPhoneMenuLight: Story = {
  args: barArgs,
  globals: phone,
  decorators: [page("light", "francesco@domelayer.com")],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /open menu/i }));
    await expect(canvas.getByRole("button", { name: /close menu/i })).toBeVisible();
  },
};

export const BarPhoneMenuDark: Story = {
  ...BarPhoneMenuLight,
  decorators: [page("dark", "francesco@domelayer.com")],
};

/** Staging deploys: the amber banner sits above the bar, the same in both themes. */
const withStagingBanner: Decorator = (Story) => (
  <>
    <StagingBanner environment="staging" />
    <Story />
  </>
);

export const BarWithStagingBannerLight: Story = {
  args: barArgs,
  decorators: [withStagingBanner, page("light")],
};

export const BarWithStagingBannerDark: Story = {
  args: barArgs,
  decorators: [withStagingBanner, page("dark")],
};
