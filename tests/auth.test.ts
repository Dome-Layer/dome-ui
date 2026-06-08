import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  isStagingHost,
  isProductionHost,
  isHttpsHost,
  cookieDomain,
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
} from "../src/auth";

function b64url(obj: unknown): string {
  return Buffer.from(JSON.stringify(obj))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function makeJwt(payload: Record<string, unknown>): string {
  return `${b64url({ alg: "HS256", typ: "JWT" })}.${b64url(payload)}.sig`;
}

beforeEach(() => {
  document.cookie = "dome_auth_token=; Max-Age=0";
});

function withHostname(hostname: string, fn: () => void): void {
  const original = window.location.hostname;
  Object.defineProperty(window, "location", {
    value: { ...window.location, hostname },
    writable: true,
    configurable: true,
  });
  try {
    fn();
  } finally {
    Object.defineProperty(window, "location", {
      value: { ...window.location, hostname: original },
      writable: true,
      configurable: true,
    });
  }
}

describe("isStagingHost", () => {
  it("returns true for staging.domelayer.com", () => {
    expect(isStagingHost("staging.domelayer.com")).toBe(true);
  });

  it("returns true for tool subdomain on staging", () => {
    expect(isStagingHost("analyzer.staging.domelayer.com")).toBe(true);
  });

  it("returns false for production root", () => {
    expect(isStagingHost("domelayer.com")).toBe(false);
  });

  it("returns false for production subdomain", () => {
    expect(isStagingHost("analyzer.domelayer.com")).toBe(false);
  });

  it("returns false for localhost", () => {
    expect(isStagingHost("localhost")).toBe(false);
  });

  it("returns false for subdomain-spoof", () => {
    expect(isStagingHost("evil-staging.domelayer.com")).toBe(false);
  });
});

describe("isProductionHost", () => {
  it("returns true for domelayer.com", () => {
    expect(isProductionHost("domelayer.com")).toBe(true);
  });

  it("returns true for production subdomain", () => {
    expect(isProductionHost("analyzer.domelayer.com")).toBe(true);
  });

  it("returns false for staging root", () => {
    expect(isProductionHost("staging.domelayer.com")).toBe(false);
  });

  it("returns false for staging subdomain", () => {
    expect(isProductionHost("analyzer.staging.domelayer.com")).toBe(false);
  });

  it("returns false for localhost", () => {
    expect(isProductionHost("localhost")).toBe(false);
  });

  it("returns false for external domain ending in domelayer.com", () => {
    expect(isProductionHost("evil-domelayer.com")).toBe(false);
  });
});

describe("isHttpsHost", () => {
  it("returns true on production host", () => {
    withHostname("domelayer.com", () => {
      expect(isHttpsHost()).toBe(true);
    });
  });

  it("returns true on staging host", () => {
    withHostname("staging.domelayer.com", () => {
      expect(isHttpsHost()).toBe(true);
    });
  });

  it("returns false on localhost", () => {
    withHostname("localhost", () => {
      expect(isHttpsHost()).toBe(false);
    });
  });
});

describe("cookieDomain", () => {
  it("returns .domelayer.com on production", () => {
    withHostname("analyzer.domelayer.com", () => {
      expect(cookieDomain()).toBe(".domelayer.com");
    });
  });

  it("returns .staging.domelayer.com on staging", () => {
    withHostname("staging.domelayer.com", () => {
      expect(cookieDomain()).toBe(".staging.domelayer.com");
    });
  });

  it("returns empty string on localhost", () => {
    withHostname("localhost", () => {
      expect(cookieDomain()).toBe("");
    });
  });
});

describe("parseCookieExpiry", () => {
  it("returns positive seconds for a future date", () => {
    const future = new Date(Date.now() + 3600 * 1000).toISOString();
    const result = Number(parseCookieExpiry(future));
    expect(result).toBeGreaterThanOrEqual(3598);
    expect(result).toBeLessThanOrEqual(3600);
  });

  it('returns "0" for a past date', () => {
    const past = new Date(Date.now() - 60_000).toISOString();
    expect(parseCookieExpiry(past)).toBe("0");
  });
});

describe("token management", () => {
  it("getToken returns null when no cookie is set", () => {
    expect(getToken()).toBeNull();
  });

  it("setToken + getToken round-trip", () => {
    withHostname("localhost", () => {
      setToken("test-jwt-123");
      expect(getToken()).toBe("test-jwt-123");
    });
  });

  it("clearToken removes the token", () => {
    withHostname("localhost", () => {
      setToken("test-jwt-123");
      clearToken();
      expect(getToken()).toBeNull();
    });
  });

  it("handles JWT with = characters", () => {
    withHostname("localhost", () => {
      const jwt = "eyJhbGciOiJIUzI1NiJ9.payload.sig==";
      setToken(jwt);
      expect(getToken()).toBe(jwt);
    });
  });
});

describe("cookie attributes", () => {
  it("sets correct attributes on localhost (no Domain, no Secure)", () => {
    const spy = vi.spyOn(document, "cookie", "set");
    withHostname("localhost", () => {
      setToken("tok", new Date(Date.now() + 3600_000).toISOString());
    });
    const written = spy.mock.calls[0]?.[0] as string;
    expect(written).toContain("dome_auth_token=tok");
    expect(written).toContain("Path=/");
    expect(written).toContain("SameSite=Lax");
    expect(written).not.toContain("Domain=");
    expect(written).not.toContain("Secure");
    spy.mockRestore();
  });

  it("includes Domain and Secure on production host", () => {
    const spy = vi.spyOn(document, "cookie", "set");
    withHostname("domelayer.com", () => {
      setToken("tok");
    });
    const written = spy.mock.calls[0]?.[0] as string;
    expect(written).toContain("Domain=.domelayer.com");
    expect(written).toContain("Secure");
    spy.mockRestore();
  });

  it("includes staging Domain and Secure on staging host", () => {
    const spy = vi.spyOn(document, "cookie", "set");
    withHostname("staging.domelayer.com", () => {
      setToken("tok");
    });
    const written = spy.mock.calls[0]?.[0] as string;
    expect(written).toContain("Domain=.staging.domelayer.com");
    expect(written).toContain("Secure");
    spy.mockRestore();
  });

  it("clearToken sets Max-Age=0", () => {
    const spy = vi.spyOn(document, "cookie", "set");
    withHostname("localhost", () => {
      clearToken();
    });
    const written = spy.mock.calls[0]?.[0] as string;
    expect(written).toContain("Max-Age=0");
    spy.mockRestore();
  });
});

describe("authHeaders", () => {
  it("returns empty object when not authenticated", () => {
    expect(authHeaders()).toEqual({});
  });

  it("returns Bearer header when authenticated", () => {
    withHostname("localhost", () => {
      setToken("my-token");
      expect(authHeaders()).toEqual({ Authorization: "Bearer my-token" });
    });
  });
});

describe("isAuthenticated", () => {
  it("returns false when no token", () => {
    expect(isAuthenticated()).toBe(false);
  });

  it("returns true when token is set", () => {
    withHostname("localhost", () => {
      setToken("my-token");
      expect(isAuthenticated()).toBe(true);
    });
  });
});

describe("sanitizeRedirect", () => {
  it('returns "/" for null', () => {
    expect(sanitizeRedirect(null)).toBe("/");
  });

  it('returns "/" for undefined', () => {
    expect(sanitizeRedirect(undefined)).toBe("/");
  });

  it('returns "/" for empty string', () => {
    expect(sanitizeRedirect("")).toBe("/");
  });

  it("allows simple relative path", () => {
    expect(sanitizeRedirect("/dashboard")).toBe("/dashboard");
  });

  it("allows relative path with query", () => {
    expect(sanitizeRedirect("/tools?tab=council")).toBe("/tools?tab=council");
  });

  it('blocks protocol-relative "//evil.com"', () => {
    expect(sanitizeRedirect("//evil.com")).toBe("/");
  });

  it("blocks javascript: protocol", () => {
    expect(sanitizeRedirect("javascript:alert(1)")).toBe("/");
  });

  it("blocks data: protocol", () => {
    expect(sanitizeRedirect("data:text/html,<script>alert(1)</script>")).toBe("/");
  });

  it("allows cross-subdomain within production band", () => {
    withHostname("domelayer.com", () => {
      expect(sanitizeRedirect("https://analyzer.domelayer.com/result")).toBe(
        "https://analyzer.domelayer.com/result"
      );
    });
  });

  it("allows cross-subdomain within staging band", () => {
    withHostname("staging.domelayer.com", () => {
      expect(
        sanitizeRedirect("https://analyzer.staging.domelayer.com/result")
      ).toBe("https://analyzer.staging.domelayer.com/result");
    });
  });

  it("blocks staging to production redirect", () => {
    withHostname("staging.domelayer.com", () => {
      expect(sanitizeRedirect("https://domelayer.com/admin")).toBe("/");
    });
  });

  it("blocks production to staging redirect", () => {
    withHostname("domelayer.com", () => {
      expect(sanitizeRedirect("https://staging.domelayer.com")).toBe("/");
    });
  });

  it("blocks external domain", () => {
    withHostname("domelayer.com", () => {
      expect(sanitizeRedirect("https://evil.com")).toBe("/");
    });
  });
});

describe("getHubUrl", () => {
  it("points at staging hub on a staging host", () => {
    withHostname("analyzer.staging.domelayer.com", () => {
      expect(getHubUrl()).toBe("https://staging.domelayer.com/app");
    });
  });

  it("points at production hub on a production host", () => {
    withHostname("analyzer.domelayer.com", () => {
      expect(getHubUrl()).toBe("https://domelayer.com/app");
    });
  });

  it("falls back to production hub on localhost/dev", () => {
    withHostname("localhost", () => {
      expect(getHubUrl()).toBe("https://domelayer.com/app");
    });
  });
});

describe("getUserClaims / getUserEmail", () => {
  it("returns null when no token is set", () => {
    expect(getUserClaims()).toBeNull();
    expect(getUserEmail()).toBeNull();
  });

  it("decodes email and sub from a valid JWT payload", () => {
    withHostname("localhost", () => {
      setToken(makeJwt({ email: "fp@domelayer.com", sub: "user-123" }));
      const claims = getUserClaims();
      expect(claims?.email).toBe("fp@domelayer.com");
      expect(claims?.sub).toBe("user-123");
      expect(getUserEmail()).toBe("fp@domelayer.com");
    });
  });

  it("returns null email when the claim is absent", () => {
    withHostname("localhost", () => {
      setToken(makeJwt({ sub: "user-123" }));
      expect(getUserClaims()?.sub).toBe("user-123");
      expect(getUserEmail()).toBeNull();
    });
  });

  it("returns null for an opaque (non-JWT) token", () => {
    withHostname("localhost", () => {
      setToken("opaque-token-no-dots");
      expect(getUserClaims()).toBeNull();
      expect(getUserEmail()).toBeNull();
    });
  });

  it("returns null for a malformed JWT payload", () => {
    withHostname("localhost", () => {
      setToken("header.%%%not-base64%%%.sig");
      expect(getUserClaims()).toBeNull();
    });
  });
});
