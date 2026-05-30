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
} from "./auth";

export {
  getTheme,
  setTheme,
  toggleTheme,
  initTheme,
} from "./theme";

export type { Theme } from "./theme";
