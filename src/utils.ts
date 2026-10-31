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
