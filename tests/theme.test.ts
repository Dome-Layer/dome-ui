import { describe, it, expect, vi, beforeEach } from "vitest";
import { getTheme, setTheme, toggleTheme } from "../src/theme";

beforeEach(() => {
  document.cookie = "dome-theme=; Max-Age=0";
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
});

describe("getTheme", () => {
  it("returns light by default when no cookie, localStorage, or system pref", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
    } as MediaQueryList);
    expect(getTheme()).toBe("light");
  });

  it("returns dark when system prefers dark", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
    } as MediaQueryList);
    expect(getTheme()).toBe("dark");
  });

  it("reads from localStorage", () => {
    localStorage.setItem("dome-theme", "dark");
    expect(getTheme()).toBe("dark");
  });

  it("cookie takes priority over localStorage", () => {
    localStorage.setItem("dome-theme", "light");
    document.cookie = "dome-theme=dark; Path=/";
    expect(getTheme()).toBe("dark");
  });
});

describe("setTheme", () => {
  it("sets data-theme attribute on html element", () => {
    setTheme("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("stores in localStorage", () => {
    setTheme("dark");
    expect(localStorage.getItem("dome-theme")).toBe("dark");
  });

  it("writes cookie", () => {
    const spy = vi.spyOn(document, "cookie", "set");
    setTheme("dark");
    const written = spy.mock.calls[0]?.[0] as string;
    expect(written).toContain("dome-theme=dark");
    spy.mockRestore();
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
});
