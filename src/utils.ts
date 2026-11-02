export {
  isStagingHost,
  isProductionHost,
  isHttpsHost,
  cookieDomain,
  getAuthSiteUrl,
  parseCookieExpiry,
  getToken,
  setToken,
  clearToken,
  authHeaders,
  isAuthenticated,
  sanitizeRedirect,
  getHubUrl,
  getUserClaims,
  getUserEmail,
} from "./auth";

export type { UserClaims } from "./auth";

export {
  getTheme,
  setTheme,
  applyTheme,
  toggleTheme,
  initTheme,
  themeCookieName,
  THEME_INIT_SCRIPT,
} from "./theme";

export type { Theme } from "./theme";

export { clsx } from "./clsx";

export {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_NAMES,
  INTL_LOCALES,
  LOCALE_CHANGE_EVENT,
  LOCALE_INIT_SCRIPT,
  isLocale,
  matchLocale,
  localeCookieName,
  getLocale,
  setLocale,
  applyLocale,
  initLocale,
  onLocaleChange,
} from "./locale";

export type { Locale, Catalogue } from "./locale";
