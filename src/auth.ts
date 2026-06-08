const COOKIE_NAME = "dome_auth_token";

export function isStagingHost(host: string): boolean {
  return (
    host === "staging.domelayer.com" ||
    host.endsWith(".staging.domelayer.com")
  );
}

export function isProductionHost(host: string): boolean {
  if (isStagingHost(host)) return false;
  return host === "domelayer.com" || host.endsWith(".domelayer.com");
}

export function isHttpsHost(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return isStagingHost(host) || isProductionHost(host);
}

export function cookieDomain(): string {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  if (isStagingHost(host)) return ".staging.domelayer.com";
  if (isProductionHost(host)) return ".domelayer.com";
  return "";
}

export function getAuthSiteUrl(): string {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  if (isStagingHost(host)) return "https://staging.domelayer.com";
  if (isProductionHost(host)) return "https://domelayer.com";
  return "";
}

export function parseCookieExpiry(expiresAt: string): string {
  const diffSec = Math.max(
    0,
    Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000)
  );
  return diffSec.toString();
}

export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  return match.split("=").slice(1).join("=") || null;
}

export function setToken(token: string, expiresAt?: string): void {
  if (typeof document === "undefined") return;
  const domain = cookieDomain();
  const maxAge = expiresAt ? parseCookieExpiry(expiresAt) : "28800";
  const domainPart = domain ? `; Domain=${domain}` : "";
  const securePart = isHttpsHost() ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${token}; Path=/${domainPart}; SameSite=Lax${securePart}; Max-Age=${maxAge}`;
}

export function clearToken(): void {
  if (typeof document === "undefined") return;
  const domain = cookieDomain();
  const domainPart = domain ? `; Domain=${domain}` : "";
  const securePart = isHttpsHost() ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=; Path=/${domainPart}; SameSite=Lax${securePart}; Max-Age=0`;
}

export function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function sanitizeRedirect(raw: string | null | undefined): string {
  if (!raw) return "/";

  if (raw.startsWith("/") && !raw.startsWith("//")) {
    return raw;
  }

  if (typeof window === "undefined") return "/";
  const currentHost = window.location.hostname;

  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "/";
    const host = url.hostname;
    if (isStagingHost(currentHost) && isStagingHost(host)) return raw;
    if (isProductionHost(currentHost) && isProductionHost(host)) return raw;
  } catch {
    // malformed URL
  }
  return "/";
}

/**
 * Host-aware URL of the logged-in tools hub (`/app` on the marketing site).
 * On a staging host the hub lives at `staging.domelayer.com/app`; on production
 * (and anywhere else, e.g. localhost preview) we point at production — the only
 * reachable real target. Mirrors the website's `toolHref` philosophy.
 */
export function getHubUrl(): string {
  if (typeof window === "undefined") return "https://domelayer.com/app";
  return isStagingHost(window.location.hostname)
    ? "https://staging.domelayer.com/app"
    : "https://domelayer.com/app";
}

export interface UserClaims {
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
export function getUserClaims(): UserClaims | null {
  const token = getToken();
  if (!token || typeof atob === "undefined") return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const json = decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    const claims = JSON.parse(json);
    return claims && typeof claims === "object"
      ? (claims as UserClaims)
      : null;
  } catch {
    return null;
  }
}

/** Convenience: the signed-in user's email, or null. */
export function getUserEmail(): string | null {
  const email = getUserClaims()?.email;
  return typeof email === "string" ? email : null;
}
