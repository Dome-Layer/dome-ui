// src/auth.ts
var COOKIE_NAME = "dome_auth_token";
function isStagingHost(host) {
  return host === "staging.domelayer.com" || host.endsWith(".staging.domelayer.com");
}
function isProductionHost(host) {
  if (isStagingHost(host)) return false;
  return host === "domelayer.com" || host.endsWith(".domelayer.com");
}
function isHttpsHost() {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return isStagingHost(host) || isProductionHost(host);
}
function cookieDomain() {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  if (isStagingHost(host)) return ".staging.domelayer.com";
  if (isProductionHost(host)) return ".domelayer.com";
  return "";
}
function getAuthSiteUrl() {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  if (isStagingHost(host)) return "https://staging.domelayer.com";
  if (isProductionHost(host)) return "https://domelayer.com";
  return "";
}
function parseCookieExpiry(expiresAt) {
  const diffSec = Math.max(
    0,
    Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1e3)
  );
  return diffSec.toString();
}
function getToken() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  return match.split("=").slice(1).join("=") || null;
}
function setToken(token, expiresAt) {
  if (typeof document === "undefined") return;
  const domain = cookieDomain();
  const maxAge = expiresAt ? parseCookieExpiry(expiresAt) : "28800";
  const domainPart = domain ? `; Domain=${domain}` : "";
  const securePart = isHttpsHost() ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${token}; Path=/${domainPart}; SameSite=Lax${securePart}; Max-Age=${maxAge}`;
}
function clearToken() {
  if (typeof document === "undefined") return;
  const domain = cookieDomain();
  const domainPart = domain ? `; Domain=${domain}` : "";
  const securePart = isHttpsHost() ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=; Path=/${domainPart}; SameSite=Lax${securePart}; Max-Age=0`;
}
function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
function isAuthenticated() {
  return !!getToken();
}
function sanitizeRedirect(raw) {
  if (!raw) return "/";
  if (raw.startsWith("/") && !raw.startsWith("//")) {
    return raw;
  }
  if (typeof window === "undefined") return "/";
  const currentHost2 = window.location.hostname;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "/";
    const host = url.hostname;
    if (isStagingHost(currentHost2) && isStagingHost(host)) return raw;
    if (isProductionHost(currentHost2) && isProductionHost(host)) return raw;
  } catch {
  }
  return "/";
}
function getHubUrl() {
  if (typeof window === "undefined") return "https://domelayer.com/app";
  return isStagingHost(window.location.hostname) ? "https://staging.domelayer.com/app" : "https://domelayer.com/app";
}
function getUserClaims() {
  const token = getToken();
  if (!token || typeof atob === "undefined") return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - b64.length % 4) % 4);
    const json = decodeURIComponent(
      atob(padded).split("").map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0")).join("")
    );
    const claims = JSON.parse(json);
    return claims && typeof claims === "object" ? claims : null;
  } catch {
    return null;
  }
}
function getUserEmail() {
  const email = getUserClaims()?.email;
  return typeof email === "string" ? email : null;
}

// src/theme.ts
var COOKIE_NAME2 = "dome-theme";
var STAGING_COOKIE_NAME = "dome-theme-staging";
var STORAGE_KEY = "dome-theme";
var COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
function isStagingHost2(host) {
  return host === "staging.domelayer.com" || host.endsWith(".staging.domelayer.com");
}
function isProductionHost2(host) {
  if (isStagingHost2(host)) return false;
  return host === "domelayer.com" || host.endsWith(".domelayer.com");
}
function currentHost() {
  return typeof window === "undefined" ? "" : window.location.hostname;
}
function isHttpsHost2() {
  const host = currentHost();
  return isStagingHost2(host) || isProductionHost2(host);
}
function cookieDomain2() {
  const host = currentHost();
  if (isStagingHost2(host)) return ".staging.domelayer.com";
  if (isProductionHost2(host)) return ".domelayer.com";
  return "";
}
function themeCookieName(host = currentHost()) {
  return isStagingHost2(host) ? STAGING_COOKIE_NAME : COOKIE_NAME2;
}
function readThemeCookie() {
  if (typeof document === "undefined") return null;
  const name = themeCookieName();
  const match = document.cookie.split("; ").find((r) => r.startsWith(`${name}=`));
  if (!match) return null;
  const val = match.split("=")[1];
  return val === "light" || val === "dark" ? val : null;
}
function writeThemeCookie(theme) {
  if (typeof document === "undefined") return;
  const domain = cookieDomain2();
  const domainPart = domain ? `; Domain=${domain}` : "";
  const secure = isHttpsHost2() ? "; Secure" : "";
  document.cookie = `${themeCookieName()}=${theme}; Path=/; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}${domainPart}${secure}`;
}
function getTheme() {
  if (typeof window === "undefined") return "dark";
  const cookie = readThemeCookie();
  if (cookie) return cookie;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
  }
  return "dark";
}
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}
function setTheme(theme) {
  applyTheme(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
  }
  writeThemeCookie(theme);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute(
    "data-theme"
  );
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
  return next;
}
function initTheme() {
  applyTheme(getTheme());
}
var THEME_INIT_SCRIPT = `(function () {
  var theme = "dark";
  try {
    var host = window.location.hostname;
    var name = host === "staging.domelayer.com" || host.slice(-22) === ".staging.domelayer.com" ? "${STAGING_COOKIE_NAME}" : "${COOKIE_NAME2}";
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

// src/clsx.ts
function clsx(...args) {
  return args.filter(Boolean).join(" ");
}
export {
  THEME_INIT_SCRIPT,
  applyTheme,
  authHeaders,
  clearToken,
  clsx,
  cookieDomain,
  getAuthSiteUrl,
  getHubUrl,
  getTheme,
  getToken,
  getUserClaims,
  getUserEmail,
  initTheme,
  isAuthenticated,
  isHttpsHost,
  isProductionHost,
  isStagingHost,
  parseCookieExpiry,
  sanitizeRedirect,
  setTheme,
  setToken,
  themeCookieName,
  toggleTheme
};
