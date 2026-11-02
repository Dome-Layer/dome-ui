declare function isStagingHost(host: string): boolean;
declare function isProductionHost(host: string): boolean;
declare function isHttpsHost(): boolean;
declare function cookieDomain(): string;
declare function getAuthSiteUrl(): string;
declare function parseCookieExpiry(expiresAt: string): string;
declare function getToken(): string | null;
declare function setToken(token: string, expiresAt?: string): void;
declare function clearToken(): void;
declare function authHeaders(): Record<string, string>;
declare function isAuthenticated(): boolean;
declare function sanitizeRedirect(raw: string | null | undefined): string;
/**
 * Host-aware URL of the logged-in tools hub (`/app` on the marketing site).
 * On a staging host the hub lives at `staging.domelayer.com/app`; on production
 * (and anywhere else, e.g. localhost preview) we point at production, the only
 * reachable real target. Mirrors the website's `toolHref` philosophy.
 */
declare function getHubUrl(): string;
interface UserClaims {
    email?: string;
    sub?: string;
    exp?: number;
    [key: string]: unknown;
}
/**
 * Decode the (already-trusted) session JWT payload client-side to surface the
 * signed-in user's identity for display, with no network round-trip (keeps the
 * DA-005 "verify locally" property). Returns null for a missing/opaque/malformed
 * token. NOT a verification step: the cookie is the trusted session; this is
 * display-only.
 */
declare function getUserClaims(): UserClaims | null;
/** Convenience: the signed-in user's email, or null. */
declare function getUserEmail(): string | null;

type Theme = "light" | "dark";
/** The theme cookie's name on this host: `dome-theme-staging` on staging, `dome-theme` elsewhere. */
declare function themeCookieName(host?: string): string;
declare function getTheme(): Theme;
/** Puts the theme on the page without remembering it. */
declare function applyTheme(theme: Theme): void;
/** An explicit choice: applies the theme and remembers it for every host of this environment. */
declare function setTheme(theme: Theme): void;
declare function toggleTheme(): Theme;
/** Applies the remembered theme, or the dark default. Never writes: the default is not a choice. */
declare function initTheme(): void;
/**
 * The same rule as getTheme, as a script for the tools to inline in `<head>` so the page paints in
 * the right theme before React loads. Self-contained ES5, no regex.
 */
declare const THEME_INIT_SCRIPT = "(function () {\n  var theme = \"dark\";\n  try {\n    var host = window.location.hostname;\n    var name = host === \"staging.domelayer.com\" || host.slice(-22) === \".staging.domelayer.com\" ? \"dome-theme-staging\" : \"dome-theme\";\n    var parts = document.cookie.split(\"; \");\n    var saved = null;\n    for (var i = 0; i < parts.length; i++) {\n      if (parts[i].indexOf(name + \"=\") === 0) { saved = parts[i].slice(name.length + 1); break; }\n    }\n    if (saved !== \"light\" && saved !== \"dark\") saved = window.localStorage.getItem(\"dome-theme\");\n    if (saved === \"light\") theme = \"light\";\n  } catch (e) {}\n  document.documentElement.setAttribute(\"data-theme\", theme);\n})();";

declare function clsx(...args: (string | undefined | null | false)[]): string;

/** The site's four languages, which the tools follow (DOME_DECISIONS 2026-11-02, roadmap row 6). */
declare const LOCALES: readonly ["en", "it", "nl", "de"];
type Locale = (typeof LOCALES)[number];
declare const DEFAULT_LOCALE: Locale;
/** Each language named in itself, as the language menu lists them. */
declare const LOCALE_NAMES: Record<Locale, string>;
/** The locale `Intl` formats dates, numbers and amounts with (the same tags as the site's Content-Language). */
declare const INTL_LOCALES: Record<Locale, string>;
/** Fired on `window` after setLocale, so every useLocale hook on the page re-renders. */
declare const LOCALE_CHANGE_EVENT = "dome-locale-change";
declare function isLocale(value: unknown): value is Locale;
/** `de-AT` to `de`, `it` to `it`; undefined when the language is not one of ours. */
declare function matchLocale(tag: string | null | undefined): Locale | undefined;
/** The language cookie's name on this host: `dome-lang-staging` on staging, `dome-lang` elsewhere. */
declare function localeCookieName(host?: string): string;
declare function getLocale(): Locale;
/** Puts the language on the page (`<html lang>`) without remembering it. */
declare function applyLocale(locale: Locale): void;
/** An explicit choice: applies it, remembers it for every host of this environment, and tells the page. */
declare function setLocale(locale: Locale): void;
/** Applies the remembered or browser language. Never writes: a default is not a choice. */
declare function initLocale(): void;
/** Calls onChange after every setLocale on this page; returns the unsubscribe function. */
declare function onLocaleChange(onChange: () => void): () => void;
/**
 * A tool's own strings, one object per language. English is the source type, so a key missing from
 * another language fails the type check, as on the site.
 */
type Catalogue<T> = Record<Locale, T>;
/**
 * The same rule as getLocale, as a script for the tools to inline in `<head>` next to
 * THEME_INIT_SCRIPT, so `<html lang>` is right before React loads. Self-contained ES5, no regex.
 */
declare const LOCALE_INIT_SCRIPT: string;

export { type Catalogue, DEFAULT_LOCALE, INTL_LOCALES, LOCALES, LOCALE_CHANGE_EVENT, LOCALE_INIT_SCRIPT, LOCALE_NAMES, type Locale, THEME_INIT_SCRIPT, type Theme, type UserClaims, applyLocale, applyTheme, authHeaders, clearToken, clsx, cookieDomain, getAuthSiteUrl, getHubUrl, getLocale, getTheme, getToken, getUserClaims, getUserEmail, initLocale, initTheme, isAuthenticated, isHttpsHost, isLocale, isProductionHost, isStagingHost, localeCookieName, matchLocale, onLocaleChange, parseCookieExpiry, sanitizeRedirect, setLocale, setTheme, setToken, themeCookieName, toggleTheme };
