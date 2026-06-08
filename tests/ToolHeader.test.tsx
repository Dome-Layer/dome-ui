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
      <ToolHeader toolName="Data Intelligence" {...props} />
    </AuthProvider>
  );
}

describe("ToolHeader — signed out", () => {
  it("renders the tool name and a Sign in button", () => {
    renderHeader();
    expect(screen.getByText("Data Intelligence")).toBeTruthy();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeTruthy();
  });

  it("shows the All tools hub link by default", () => {
    renderHeader();
    expect(screen.getAllByText("All tools").length).toBeGreaterThan(0);
  });

  it("hides the hub link when showHubLink is false", () => {
    renderHeader({ showHubLink: false });
    expect(screen.queryByText("All tools")).toBeNull();
  });

  it("renders a custom hub label", () => {
    renderHeader({ hubLabel: "Dome apps" });
    expect(screen.getByText("Dome apps")).toBeTruthy();
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
  it("shows an account avatar with the user initial, then reveals email + sign out", async () => {
    document.cookie = "dome_auth_token=" + makeJwt({ email: "fp@domelayer.com" });
    renderHeader();

    const avatar = await screen.findByLabelText(/account: fp@domelayer\.com/i);
    expect(avatar.textContent).toBe("F");
    expect(screen.queryByRole("button", { name: /sign in/i })).toBeNull();

    fireEvent.click(avatar);
    expect(screen.getByText("fp@domelayer.com")).toBeTruthy();
    expect(screen.getByRole("menuitem", { name: /sign out/i })).toBeTruthy();
  });
});
