import { cookieDomain, isHttpsHost, isStagingHost } from "./auth";

/** The site's four languages, which the tools follow (DOME_DECISIONS 2026-11-02, roadmap row 6). */
export const LOCALES = ["en", "it", "nl", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Each language named in itself, as the language menu lists them. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  nl: "Nederlands",
  de: "Deutsch",
};

/** The locale `Intl` formats dates, numbers and amounts with (the same tags as the site's Content-Language). */
export const INTL_LOCALES: Record<Locale, string> = {
  en: "en-GB",
  it: "it-IT",
  nl: "nl-NL",
  de: "de-DE",
};

/**
 * The language rule, the same in every tool:
 *
 * 1. a choice made in a tool's language menu, or on domelayer.com (both write the cookie below);
 * 2. else the browser's first supported language;
 * 3. else English.
 *
 * Only an explicit choice is remembered, in a cookie shared by every host of one environment, so it
 * follows the visitor between the site, the hub and the tools. Staging uses its own name for the
 * same reason as the theme: a production cookie on `.domelayer.com` also reaches every staging host
 * and would shadow a choice made there. The site keeps its own host-only `dome_locale` for its
 * first-visit redirect; it writes this cookie as well when someone picks a language.
 *
 * Keep in step with LOCALE_INIT_SCRIPT below.
 */
const COOKIE_NAME = "dome-lang";
const STAGING_COOKIE_NAME = "dome-lang-staging";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/** Fired on `window` after setLocale, so every useLocale hook on the page re-renders. */
export const LOCALE_CHANGE_EVENT = "dome-locale-change";

function currentHost(): string {
  return typeof window === "undefined" ? "" : window.location.hostname;
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** `de-AT` to `de`, `it` to `it`; undefined when the language is not one of ours. */
export function matchLocale(tag: string | null | undefined): Locale | undefined {
  if (!tag) return undefined;
  const base = tag.trim().toLowerCase().split(/[-_]/)[0];
  return isLocale(base) ? base : undefined;
}

/** The language cookie's name on this host: `dome-lang-staging` on staging, `dome-lang` elsewhere. */
export function localeCookieName(host: string = currentHost()): string {
  return isStagingHost(host) ? STAGING_COOKIE_NAME : COOKIE_NAME;
}

function readLocaleCookie(): Locale | undefined {
  if (typeof document === "undefined") return undefined;
  const name = localeCookieName();
  const match = document.cookie.split("; ").find((r) => r.startsWith(`${name}=`));
  return match ? matchLocale(match.slice(name.length + 1)) : undefined;
}

function writeLocaleCookie(locale: Locale): void {
  if (typeof document === "undefined") return;
  const domain = cookieDomain();
  const domainPart = domain ? `; Domain=${domain}` : "";
  const secure = isHttpsHost() ? "; Secure" : "";
  document.cookie = `${localeCookieName()}=${locale}; Path=/; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}${domainPart}${secure}`;
}

function browserLocale(): Locale | undefined {
  if (typeof navigator === "undefined") return undefined;
  const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of tags) {
    const locale = matchLocale(tag);
    if (locale) return locale;
  }
  return undefined;
}

export function getLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  return readLocaleCookie() ?? browserLocale() ?? DEFAULT_LOCALE;
}

/** Puts the language on the page (`<html lang>`) without remembering it. */
export function applyLocale(locale: Locale): void {
  document.documentElement.lang = locale;
}

/** An explicit choice: applies it, remembers it for every host of this environment, and tells the page. */
export function setLocale(locale: Locale): void {
  applyLocale(locale);
  writeLocaleCookie(locale);
  window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
}

/** Applies the remembered or browser language. Never writes: a default is not a choice. */
export function initLocale(): void {
  applyLocale(getLocale());
}

/** Calls onChange after every setLocale on this page; returns the unsubscribe function. */
export function onLocaleChange(onChange: () => void): () => void {
  window.addEventListener(LOCALE_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(LOCALE_CHANGE_EVENT, onChange);
}

/**
 * A tool's own strings, one object per language. English is the source type, so a key missing from
 * another language fails the type check, as on the site.
 */
export type Catalogue<T> = Record<Locale, T>;

/**
 * The same rule as getLocale, as a script for the tools to inline in `<head>` next to
 * THEME_INIT_SCRIPT, so `<html lang>` is right before React loads. Self-contained ES5, no regex.
 */
export const LOCALE_INIT_SCRIPT = `(function () {
  var supported = ${JSON.stringify(LOCALES)};
  function match(tag) {
    if (!tag) return null;
    var base = String(tag).toLowerCase().split("-")[0].split("_")[0];
    for (var i = 0; i < supported.length; i++) { if (supported[i] === base) return base; }
    return null;
  }
  var locale = "${DEFAULT_LOCALE}";
  try {
    var host = window.location.hostname;
    var name = host === "staging.domelayer.com" || host.slice(-22) === ".staging.domelayer.com" ? "${STAGING_COOKIE_NAME}" : "${COOKIE_NAME}";
    var parts = document.cookie.split("; ");
    var saved = null;
    for (var j = 0; j < parts.length; j++) {
      if (parts[j].indexOf(name + "=") === 0) { saved = match(parts[j].slice(name.length + 1)); break; }
    }
    if (!saved) {
      var tags = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
      for (var k = 0; k < tags.length && !saved; k++) saved = match(tags[k]);
    }
    if (saved) locale = saved;
  } catch (e) {}
  document.documentElement.lang = locale;
})();`;
