export type Theme = "light" | "dark";

/**
 * The theme rule, the same on domelayer.com and in every tool:
 *
 * - Dark by default. DOME is a dark-first brand, so the OS `prefers-color-scheme` is not
 *   consulted (the website made this call in September 2026; the tools now follow it, so the
 *   hub and a tool never disagree for someone who never chose).
 * - Only an explicit choice through a theme toggle is remembered, in a cookie shared by every
 *   host of one environment, so it follows the visitor between the site, the hub and the tools.
 *
 * Staging uses its own cookie name. A production cookie (`Domain=.domelayer.com`) is also sent to
 * every `*.staging.domelayer.com` host, and when both exist under one name the browser lists the
 * older one first, so a choice made on staging was overridden on every page load.
 *
 * Keep in step with THEME_INIT_SCRIPT below and with dome-website's `ThemeContext.tsx` and
 * `public/theme-init.js`.
 */

const COOKIE_NAME = "dome-theme";
const STAGING_COOKIE_NAME = "dome-theme-staging";
/** localStorage is per origin, so its key needs no environment split. */
const STORAGE_KEY = "dome-theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function isStagingHost(host: string): boolean {
  return (
    host === "staging.domelayer.com" ||
    host.endsWith(".staging.domelayer.com")
  );
}

function isProductionHost(host: string): boolean {
  if (isStagingHost(host)) return false;
  return host === "domelayer.com" || host.endsWith(".domelayer.com");
}

function currentHost(): string {
  return typeof window === "undefined" ? "" : window.location.hostname;
}

function isHttpsHost(): boolean {
  const host = currentHost();
  return isStagingHost(host) || isProductionHost(host);
}

function cookieDomain(): string {
  const host = currentHost();
  if (isStagingHost(host)) return ".staging.domelayer.com";
  if (isProductionHost(host)) return ".domelayer.com";
  return "";
}

/** The theme cookie's name on this host: `dome-theme-staging` on staging, `dome-theme` elsewhere. */
export function themeCookieName(host: string = currentHost()): string {
  return isStagingHost(host) ? STAGING_COOKIE_NAME : COOKIE_NAME;
}

function readThemeCookie(): Theme | null {
  if (typeof document === "undefined") return null;
  const name = themeCookieName();
  const match = document.cookie
    .split("; ")
    .find((r) => r.startsWith(`${name}=`));
  if (!match) return null;
  const val = match.split("=")[1];
  return val === "light" || val === "dark" ? val : null;
}

function writeThemeCookie(theme: Theme): void {
  if (typeof document === "undefined") return;
  const domain = cookieDomain();
  const domainPart = domain ? `; Domain=${domain}` : "";
  const secure = isHttpsHost() ? "; Secure" : "";
  document.cookie = `${themeCookieName()}=${theme}; Path=/; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}${domainPart}${secure}`;
}

export function getTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const cookie = readThemeCookie();
  if (cookie) return cookie;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage may be unavailable.
  }
  return "dark";
}

/** Puts the theme on the page without remembering it. */
export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
}

/** An explicit choice: applies the theme and remembers it for every host of this environment. */
export function setTheme(theme: Theme): void {
  applyTheme(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage may be unavailable; the cookie still carries the choice.
  }
  writeThemeCookie(theme);
}

export function toggleTheme(): Theme {
  const current = document.documentElement.getAttribute(
    "data-theme"
  ) as Theme | null;
  const next: Theme = current === "light" ? "dark" : "light";
  setTheme(next);
  return next;
}

/** Applies the remembered theme, or the dark default. Never writes: the default is not a choice. */
export function initTheme(): void {
  applyTheme(getTheme());
}

/**
 * The same rule as getTheme, as a script for the tools to inline in `<head>` so the page paints in
 * the right theme before React loads. Self-contained ES5, no regex.
 */
export const THEME_INIT_SCRIPT = `(function () {
  var theme = "dark";
  try {
    var host = window.location.hostname;
    var name = host === "staging.domelayer.com" || host.slice(-22) === ".staging.domelayer.com" ? "${STAGING_COOKIE_NAME}" : "${COOKIE_NAME}";
    var parts = document.cookie.split("; ");
    var saved = null;
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].indexOf(name + "=") === 0) { saved = parts[i].slice(name.length + 1); break; }
    }
    if (saved !== "light" && saved !== "dark") saved = window.localStorage.getItem("${STORAGE_KEY}");
    if (saved === "light") theme = "light";
  } catch (e) {}
  document.documentElement.setAttribute("data-theme", theme);
})();`;
