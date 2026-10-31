import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getTheme,
  setTheme,
  toggleTheme,
  initTheme,
  themeCookieName,
  THEME_INIT_SCRIPT,
} from "../src/theme";

beforeEach(() => {
  document.cookie = "dome-theme=; Max-Age=0";
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  vi.unstubAllGlobals();
});

// jsdom has no matchMedia, and Vitest 4 no longer lets vi.spyOn create a missing method.
const stubPrefersDark = (matches: boolean) =>
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches }) as MediaQueryList));

describe("getTheme", () => {
  it("defaults to dark when nothing was chosen, whatever the OS prefers", () => {
    stubPrefersDark(false);
    expect(getTheme()).toBe("dark");
  });

  it("reads from localStorage", () => {
    localStorage.setItem("dome-theme", "light");
    expect(getTheme()).toBe("light");
  });

  it("cookie takes priority over localStorage", () => {
    localStorage.setItem("dome-theme", "dark");
    document.cookie = "dome-theme=light; Path=/";
    expect(getTheme()).toBe("light");
  });
});

describe("themeCookieName", () => {
  it("gives staging its own name, so a production cookie cannot override it", () => {
    expect(themeCookieName("staging.domelayer.com")).toBe("dome-theme-staging");
    expect(themeCookieName("governance.staging.domelayer.com")).toBe("dome-theme-staging");
  });

  it("keeps dome-theme on production and anywhere else", () => {
    expect(themeCookieName("domelayer.com")).toBe("dome-theme");
    expect(themeCookieName("governance.domelayer.com")).toBe("dome-theme");
    expect(themeCookieName("localhost")).toBe("dome-theme");
    expect(themeCookieName("evilstaging.domelayer.com")).toBe("dome-theme");
  });
});

describe("setTheme", () => {
  it("sets data-theme attribute on html element", () => {
    setTheme("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("stores in localStorage", () => {
    setTheme("light");
    expect(localStorage.getItem("dome-theme")).toBe("light");
  });

  it("writes cookie", () => {
    const spy = vi.spyOn(document, "cookie", "set");
    setTheme("light");
    const written = spy.mock.calls[0]?.[0] as string;
    expect(written).toContain("dome-theme=light");
    spy.mockRestore();
  });
});

describe("initTheme", () => {
  it("applies the dark default without remembering it", () => {
    const spy = vi.spyOn(document, "cookie", "set");
    initTheme();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(spy).not.toHaveBeenCalled();
    expect(localStorage.getItem("dome-theme")).toBeNull();
    spy.mockRestore();
  });

  it("applies a remembered choice", () => {
    document.cookie = "dome-theme=light; Path=/";
    initTheme();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});

describe("toggleTheme", () => {
  it("toggles from light to dark", () => {
    document.documentElement.setAttribute("data-theme", "light");
    const result = toggleTheme();
    expect(result).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("toggles from dark to light", () => {
    document.documentElement.setAttribute("data-theme", "dark");
    const result = toggleTheme();
    expect(result).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("treats a page with no theme set as the dark default", () => {
    expect(toggleTheme()).toBe("light");
  });
});

describe("THEME_INIT_SCRIPT", () => {
  /** Runs the inline script against a fake host, cookie jar and localStorage. */
  function run(host: string, cookie: string, stored: string | null = null): string | null {
    const html = {
      theme: null as string | null,
      setAttribute(_name: string, value: string) {
        this.theme = value;
      },
    };
    const fakeWindow = {
      location: { hostname: host },
      localStorage: { getItem: () => stored },
    };
    const fakeDocument = { cookie, documentElement: html };
    new Function("window", "document", THEME_INIT_SCRIPT)(fakeWindow, fakeDocument);
    return html.theme;
  }

  it("defaults to dark", () => {
    expect(run("analyzer.domelayer.com", "")).toBe("dark");
  });

  it("reads the production cookie on production", () => {
    expect(run("analyzer.domelayer.com", "a=1; dome-theme=light")).toBe("light");
  });

  it("on staging reads the staging cookie, ignoring an older production one sent first", () => {
    expect(run("analyzer.staging.domelayer.com", "dome-theme=light; dome-theme-staging=dark")).toBe("dark");
    expect(run("staging.domelayer.com", "dome-theme=dark; dome-theme-staging=light")).toBe("light");
  });

  it("falls back to localStorage, then dark", () => {
    expect(run("localhost", "", "light")).toBe("light");
    expect(run("localhost", "", "purple")).toBe("dark");
  });

  it("agrees with getTheme on this host", () => {
    document.cookie = "dome-theme=light; Path=/";
    expect(run(window.location.hostname, document.cookie)).toBe(getTheme());
  });
});
