import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { ComponentProps } from "react";
import { ToolHeader } from "../src/components/ToolHeader";
import { AuthProvider } from "../src/components/AuthContext";

function b64url(obj: unknown): string {
  return Buffer.from(JSON.stringify(obj))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
function makeJwt(payload: Record<string, unknown>): string {
  return `${b64url({ alg: "HS256", typ: "JWT" })}.${b64url(payload)}.sig`;
}

// jsdom doesn't implement matchMedia; ThemeToggle (inside ToolHeader) reads it via getTheme().
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

beforeEach(() => {
  document.cookie = "dome_auth_token=; Max-Age=0";
});

function renderHeader(props: Partial<ComponentProps<typeof ToolHeader>> = {}) {
  return render(
    <AuthProvider>
      <ToolHeader
        toolName="Data Intelligence"
        navLinks={[{ label: "Saved", href: "/saved" }]}
        {...props}
      />
    </AuthProvider>
  );
}

function signIn(email = "fp@domelayer.com") {
  document.cookie = "dome_auth_token=" + makeJwt({ email });
}

describe("ToolHeader — signed out", () => {
  it("renders the tool name, Home + Saved nav links, and a Sign in button", () => {
    renderHeader();
    expect(screen.getByText("Data Intelligence")).toBeTruthy();
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Saved")).toBeTruthy();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeTruthy();
  });

  it("does NOT surface All tools when signed out (it lives in the account menu)", () => {
    renderHeader();
    expect(screen.queryByText("All tools")).toBeNull();
  });

  it("omits the Home link when showHomeLink is false", () => {
    renderHeader({ showHomeLink: false });
    expect(screen.queryByText("Home")).toBeNull();
    expect(screen.getByText("Saved")).toBeTruthy();
  });

  it("calls a custom onSignIn handler instead of redirecting", () => {
    const onSignIn = vi.fn();
    renderHeader({ onSignIn });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(onSignIn).toHaveBeenCalledTimes(1);
  });
});

describe("ToolHeader — width", () => {
  it("uses a centered max-width container by default (contained)", () => {
    const { container } = renderHeader();
    const inner = container.querySelector("header > div");
    expect(inner?.className).toContain("max-w-[1152px]");
    expect(inner?.className).toContain("mx-auto");
  });

  it("uses a full-width container when width=fluid", () => {
    const { container } = renderHeader({ width: "fluid" });
    const inner = container.querySelector("header > div");
    expect(inner?.className).toContain("w-full");
    expect(inner?.className).not.toContain("max-w-[1152px]");
  });
});

describe("ToolHeader — signed in", () => {
  it("shows an account avatar; menu reveals email, All tools, and Sign out", async () => {
    signIn();
    renderHeader();

    const avatar = await screen.findByLabelText(/account: fp@domelayer\.com/i);
    expect(avatar.textContent).toBe("F");
    expect(screen.queryByRole("button", { name: /sign in/i })).toBeNull();

    fireEvent.click(avatar);
    expect(screen.getByText("fp@domelayer.com")).toBeTruthy();
    expect(screen.getByRole("menuitem", { name: /all tools/i })).toBeTruthy();
    expect(screen.getByRole("menuitem", { name: /sign out/i })).toBeTruthy();
  });

  it("omits All tools from the account menu when showHubLink is false", async () => {
    signIn();
    renderHeader({ showHubLink: false });
    const avatar = await screen.findByLabelText(/account/i);
    fireEvent.click(avatar);
    expect(screen.queryByRole("menuitem", { name: /all tools/i })).toBeNull();
    expect(screen.getByRole("menuitem", { name: /sign out/i })).toBeTruthy();
  });

  it("renders a custom hub label in the account menu", async () => {
    signIn();
    renderHeader({ hubLabel: "Dome apps" });
    const avatar = await screen.findByLabelText(/account/i);
    fireEvent.click(avatar);
    expect(screen.getByRole("menuitem", { name: /dome apps/i })).toBeTruthy();
  });
});
