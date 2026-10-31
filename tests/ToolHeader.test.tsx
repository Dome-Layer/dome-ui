import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
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

describe("ToolHeader, signed out", () => {
  it("renders the tool name, Home + Saved nav links, and a Sign in button", () => {
    renderHeader();
    expect(screen.getByText("Data Intelligence")).toBeTruthy();
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Saved")).toBeTruthy();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeTruthy();
  });

  it("does NOT surface All tools when signed out (the hub needs a sign-in)", () => {
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

describe("ToolHeader, width", () => {
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

describe("ToolHeader, signed in", () => {
  it("shows an account avatar; menu reveals email and Sign out", async () => {
    signIn();
    renderHeader();

    const avatar = await screen.findByLabelText(/account: fp@domelayer\.com/i);
    expect(avatar.textContent).toBe("F");
    expect(screen.queryByRole("button", { name: /sign in/i })).toBeNull();

    fireEvent.click(avatar);
    expect(screen.getByText("fp@domelayer.com")).toBeTruthy();
    expect(screen.getByRole("menuitem", { name: /sign out/i })).toBeTruthy();
    // All tools lives in the bar now, not in the account menu.
    expect(screen.queryByRole("menuitem", { name: /all tools/i })).toBeNull();
  });

  it("leads the desktop nav with All tools, linking to the hub", async () => {
    signIn();
    const { container } = renderHeader();
    await screen.findByLabelText(/account/i);
    const links = Array.from(container.querySelectorAll("nav a.dome-navlink"));
    expect(links.map((a) => a.textContent)).toEqual(["All tools", "Home", "Saved"]);
    expect(links[0].getAttribute("href")).toBe("https://domelayer.com/app");
    // It leaves the tool, so it is never marked as the current page.
    expect(links[0].getAttribute("aria-current")).toBeNull();
  });

  it("puts All tools first in the phone menu", async () => {
    signIn();
    const { container } = renderHeader();
    await screen.findByLabelText(/account/i);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const links = Array.from(container.querySelectorAll(".dome-mobile-panel a.dome-mobile-link"));
    expect(links.map((a) => a.textContent)).toEqual(["All tools", "Home", "Saved"]);
    expect(links[0].getAttribute("href")).toBe("https://domelayer.com/app");
  });

  it("omits All tools everywhere when showHubLink is false", async () => {
    signIn();
    renderHeader({ showHubLink: false });
    const avatar = await screen.findByLabelText(/account/i);
    expect(screen.queryByRole("link", { name: /all tools/i })).toBeNull();
    fireEvent.click(avatar);
    expect(screen.queryByText(/all tools/i)).toBeNull();
    expect(screen.getByRole("menuitem", { name: /sign out/i })).toBeTruthy();
  });

  it("renders a custom hub label", async () => {
    signIn();
    renderHeader({ hubLabel: "Dome apps" });
    expect(await screen.findByRole("link", { name: /dome apps/i })).toBeTruthy();
  });
});

describe("ToolHeader, blue bar (design system v2.7)", () => {
  it("renders the bar surface with the white wordmark", () => {
    const { container } = renderHeader();
    const header = container.querySelector("header");
    expect(header?.classList.contains("dome-bar")).toBe(true);
    const fills = Array.from(
      container.querySelectorAll(".dome-brand svg path, .dome-brand svg ellipse")
    ).map((el) => el.getAttribute("fill"));
    expect(fills.length).toBeGreaterThan(0);
    expect(new Set(fills)).toEqual(new Set(["#FFFFFF"]));
  });

  it("uses the inverse Sign in on the bar and the filled primary in the phone menu", () => {
    renderHeader();
    const barSignIn = screen.getByRole("button", { name: /sign in/i });
    expect(barSignIn.className).toContain("btn-inverse");
    expect(barSignIn.className).not.toContain("btn-primary");

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const [, panelSignIn] = screen.getAllByRole("button", { name: /sign in/i });
    expect(panelSignIn.className).toContain("btn-primary");
    expect(panelSignIn.closest(".dome-mobile-panel")).toBeTruthy();
  });
});

describe("ToolHeader, current page", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
  });

  function current() {
    return Array.from(document.querySelectorAll('[aria-current="page"]'));
  }

  it("marks the link for currentPath with aria-current and the underline class", () => {
    renderHeader({ currentPath: "/saved" });
    const marked = current();
    expect(marked).toHaveLength(1);
    expect(marked[0].textContent).toBe("Saved");
    expect(marked[0].className).toContain("dome-navlink");
    expect(marked[0].className).toContain("is-current");
    expect(screen.getByText("Home").getAttribute("aria-current")).toBeNull();
  });

  it("marks a link the path sits under, but Home only on an exact match", () => {
    const { unmount } = renderHeader({ currentPath: "/saved/42/" });
    expect(current().map((el) => el.textContent)).toEqual(["Saved"]);

    unmount();
    renderHeader({ currentPath: "/analysis/7" });
    expect(current()).toHaveLength(0);
  });

  it("prefers the most specific link when two match", () => {
    renderHeader({
      currentPath: "/saved/archive",
      navLinks: [
        { label: "Saved", href: "/saved" },
        { label: "Archive", href: "/saved/archive" },
      ],
    });
    expect(current().map((el) => el.textContent)).toEqual(["Archive"]);
  });

  it("falls back to the browser location when currentPath is not passed", () => {
    window.history.replaceState(null, "", "/saved?tab=all");
    renderHeader();
    expect(current().map((el) => el.textContent)).toEqual(["Saved"]);
  });

  it("follows back and forward navigation in the fallback", () => {
    renderHeader();
    expect(current().map((el) => el.textContent)).toEqual(["Home"]);
    act(() => {
      window.history.pushState(null, "", "/saved");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(current().map((el) => el.textContent)).toEqual(["Saved"]);
  });

  it("never marks a link to another site", () => {
    renderHeader({
      currentPath: "/docs",
      navLinks: [{ label: "Docs", href: "https://example.com/docs" }],
    });
    expect(current()).toHaveLength(0);
  });

  it("marks the current page in the phone menu too", () => {
    renderHeader({ currentPath: "/saved" });
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const marked = current();
    expect(marked).toHaveLength(2);
    const inPanel = marked.find((el) => el.closest(".dome-mobile-panel"));
    expect(inPanel?.textContent).toBe("Saved");
    expect(inPanel?.className).toContain("dome-mobile-link");
    expect(inPanel?.className).toContain("is-current");
  });

  it("passes aria-current through a custom renderLink", () => {
    const renderLink = vi.fn((props: Record<string, unknown>) => (
      <a href={props.href as string} aria-current={props["aria-current"] as "page"}>
        {props.children as string}
      </a>
    ));
    renderHeader({ currentPath: "/saved", renderLink });
    expect(current().map((el) => el.textContent)).toEqual(["Saved"]);
  });
});

describe("ToolHeader, menus open on the page colour", () => {
  it("keeps the bar solid with the phone menu open, the menu on its own surface", () => {
    const { container } = renderHeader();
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const header = container.querySelector("header");
    expect(header?.className).toContain("dome-bar");
    const panel = container.querySelector(".dome-mobile-panel");
    expect(panel).toBeTruthy();
    expect(panel?.closest("header")).toBe(header);
    expect(screen.getByRole("button", { name: /close menu/i })).toBeTruthy();
  });

  it("renders the account menu as a page-colour menu with an inverse avatar trigger", async () => {
    signIn();
    const { container } = renderHeader();
    const avatar = await screen.findByLabelText(/account/i);
    expect(avatar.className).toContain("dome-avatar");
    fireEvent.click(avatar);
    expect(avatar.getAttribute("aria-expanded")).toBe("true");
    const menu = screen.getByRole("menu");
    expect(menu.className).toContain("dome-menu");
    expect(container.querySelector("header")?.className).toContain("dome-bar");
  });
});
