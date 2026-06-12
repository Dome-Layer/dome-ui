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
 * (and anywhere else, e.g. localhost preview) we point at production — the only
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
 * signed-in user's identity for display — no network round-trip (keeps the
 * DA-005 "verify locally" property). Returns null for a missing/opaque/malformed
 * token. NOT a verification step: the cookie is the trusted session; this is
 * display-only.
 */
declare function getUserClaims(): UserClaims | null;
/** Convenience: the signed-in user's email, or null. */
declare function getUserEmail(): string | null;

type Theme = "light" | "dark";
declare function getTheme(): Theme;
declare function setTheme(theme: Theme): void;
declare function toggleTheme(): Theme;
declare function initTheme(): void;

declare function clsx(...args: (string | undefined | null | false)[]): string;

export { type Theme, type UserClaims, authHeaders, clearToken, clsx, cookieDomain, getAuthSiteUrl, getHubUrl, getTheme, getToken, getUserClaims, getUserEmail, initTheme, isAuthenticated, isHttpsHost, isProductionHost, isStagingHost, parseCookieExpiry, sanitizeRedirect, setTheme, setToken, toggleTheme };
