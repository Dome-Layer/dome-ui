import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  getLocale,
  setLocale,
  initLocale,
  matchLocale,
  localeCookieName,
  LOCALE_CHANGE_EVENT,
  LOCALE_INIT_SCRIPT,
} from "../src/locale";
import { UI_MESSAGES } from "../src/messages";

function setBrowserLanguages(languages: string[]) {
  vi.spyOn(navigator, "languages", "get").mockReturnValue(languages);
  vi.spyOn(navigator, "language", "get").mockReturnValue(languages[0] ?? "");
}

beforeEach(() => {
  document.cookie = "dome-lang=; Max-Age=0; Path=/";
  document.documentElement.removeAttribute("lang");
  setBrowserLanguages(["en-GB"]);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("matchLocale", () => {
  it("reduces a tag to one of the four languages", () => {
    expect(matchLocale("de-AT")).toBe("de");
    expect(matchLocale("it")).toBe("it");
    expect(matchLocale("NL_be")).toBe("nl");
  });

  it("returns undefined for a language the tools do not have", () => {
    expect(matchLocale("fr-FR")).toBeUndefined();
    expect(matchLocale("")).toBeUndefined();
    expect(matchLocale(undefined)).toBeUndefined();
  });
});

describe("getLocale", () => {
  it("falls back to English when neither a choice nor the browser gives a supported language", () => {
    setBrowserLanguages(["fr-FR", "es"]);
    expect(getLocale()).toBe("en");
  });

  it("uses the browser's first supported language", () => {
    setBrowserLanguages(["fr-FR", "de-CH", "it"]);
    expect(getLocale()).toBe("de");
  });

  it("a remembered choice beats the browser", () => {
    setBrowserLanguages(["de-DE"]);
    document.cookie = "dome-lang=it; Path=/";
    expect(getLocale()).toBe("it");
  });

  it("ignores a cookie value that is not one of the languages", () => {
    setBrowserLanguages(["nl-NL"]);
    document.cookie = "dome-lang=fr; Path=/";
    expect(getLocale()).toBe("nl");
  });
});

describe("localeCookieName", () => {
  it("uses its own name on staging, so a production cookie cannot shadow it", () => {
    expect(localeCookieName("analyzer.staging.domelayer.com")).toBe("dome-lang-staging");
    expect(localeCookieName("staging.domelayer.com")).toBe("dome-lang-staging");
    expect(localeCookieName("analyzer.domelayer.com")).toBe("dome-lang");
    expect(localeCookieName("localhost")).toBe("dome-lang");
  });
});

describe("setLocale and initLocale", () => {
  it("setLocale applies the language, remembers it and tells the page", () => {
    const heard = vi.fn();
    window.addEventListener(LOCALE_CHANGE_EVENT, heard);
    setLocale("nl");
    window.removeEventListener(LOCALE_CHANGE_EVENT, heard);
    expect(document.documentElement.lang).toBe("nl");
    expect(document.cookie).toContain("dome-lang=nl");
    expect(heard).toHaveBeenCalledTimes(1);
    expect(getLocale()).toBe("nl");
  });

  it("initLocale applies the browser language without writing a cookie", () => {
    setBrowserLanguages(["it-IT"]);
    initLocale();
    expect(document.documentElement.lang).toBe("it");
    expect(document.cookie).not.toContain("dome-lang=");
  });
});

describe("LOCALE_INIT_SCRIPT", () => {
  it("sets <html lang> by the same rule, before React", () => {
    setBrowserLanguages(["de-DE"]);
    new Function(LOCALE_INIT_SCRIPT)();
    expect(document.documentElement.lang).toBe("de");

    document.cookie = "dome-lang=it; Path=/";
    new Function(LOCALE_INIT_SCRIPT)();
    expect(document.documentElement.lang).toBe("it");
  });

  it("falls back to English for an unsupported browser language", () => {
    setBrowserLanguages(["ja-JP"]);
    new Function(LOCALE_INIT_SCRIPT)();
    expect(document.documentElement.lang).toBe("en");
  });
});

describe("UI_MESSAGES", () => {
  it("has the same keys in every language", () => {
    const keys = Object.keys(UI_MESSAGES.en).sort();
    for (const locale of ["it", "nl", "de"] as const) {
      expect(Object.keys(UI_MESSAGES[locale]).sort()).toEqual(keys);
    }
  });
});
