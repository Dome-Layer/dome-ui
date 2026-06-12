"use client";

// src/components/DomeLogo.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function DomeLogo({
  className = "",
  size = "md",
  color = "#0080FF"
}) {
  const heights = { sm: 24, md: 32, lg: 44, xl: 56 };
  const h = heights[size];
  const w = Math.round(h * (640 / 166));
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 640 166",
      width: w,
      height: h,
      className,
      "aria-label": "Dome",
      role: "img",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: color,
            d: "M42.67,163.73H.76v-27.74h40.27c10.74,0,19.7-1.95,26.89-5.85,7.18-3.9,12.55-9.78,16.11-17.66,3.55-7.87,5.33-17.73,5.33-29.58s-1.8-21.68-5.39-29.48-8.94-13.65-16.05-17.55c-7.11-3.9-16-5.85-26.67-5.85H0V2.27h43.32c16.25,0,30.26,3.25,42.01,9.75s20.81,15.77,27.16,27.79c6.35,12.03,9.52,26.39,9.52,43.07s-3.19,31.17-9.58,43.23c-6.39,12.07-15.49,21.35-27.32,27.85-11.83,6.5-25.98,9.75-42.45,9.75Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: color,
            d: "M216.17,166c-14.37,0-27.27-3.28-38.7-9.86-11.43-6.57-20.48-16.05-27.16-28.44-6.68-12.39-10.01-27.25-10.01-44.59s3.34-32.33,10.01-44.75c6.68-12.43,15.73-21.93,27.16-28.5C188.9,3.29,201.8,0,216.17,0s27.35,3.29,38.75,9.86c11.39,6.58,20.41,16.07,27.05,28.5,6.64,12.42,9.96,27.34,9.96,44.75s-3.32,32.2-9.96,44.59c-6.64,12.39-15.66,21.87-27.05,28.44-11.39,6.58-24.31,9.86-38.75,9.86ZM216.17,137.18c8.49,0,15.95-2.08,22.37-6.23,6.42-4.16,11.43-10.26,15.02-18.31,3.59-8.05,5.39-17.9,5.39-29.53s-1.8-21.6-5.39-29.69c-3.59-8.09-8.6-14.21-15.02-18.37-6.42-4.15-13.88-6.23-22.37-6.23s-15.93,2.1-22.31,6.29c-6.39,4.19-11.37,10.31-14.97,18.37-3.59,8.06-5.39,17.94-5.39,29.64s1.8,21.46,5.39,29.47c3.59,8.02,8.58,14.13,14.97,18.31,6.38,4.19,13.82,6.29,22.31,6.29Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: color,
            d: "M480.27,14.76c-8.78-8.52-21.62-12.84-38.15-12.84-8.41,0-15.94,1.43-22.36,4.25-5.33,2.35-9.85,5.69-13.49,9.97-3.64-4.28-8.16-7.62-13.49-9.97-6.42-2.83-13.94-4.25-22.36-4.25-16.53,0-29.37,4.32-38.15,12.84-8.8,8.54-13.27,21.23-13.27,37.71v110.74h31.13V56.27c0-4.05.31-7.95.92-11.58.58-3.44,1.64-6.49,3.15-9.06,1.45-2.47,3.43-4.38,6.04-5.83,2.6-1.44,6.02-2.17,10.18-2.17s7.52.73,10.05,2.16c2.57,1.46,4.56,3.38,6.09,5.88,1.57,2.57,2.66,5.6,3.23,9.02.61,3.64.91,7.53.91,11.58v106.94h31.13V56.27c0-4.06.31-7.96.91-11.58.58-3.44,1.64-6.49,3.15-9.06,1.45-2.47,3.43-4.38,6.04-5.83,2.6-1.44,6.02-2.17,10.18-2.17s7.53.73,10.05,2.16c2.56,1.46,4.56,3.38,6.09,5.88,1.57,2.57,2.66,5.61,3.23,9.02.61,3.63.92,7.53.92,11.58v106.94h31.13V52.47c0-16.48-4.46-29.17-13.27-37.71Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: color,
            d: "M597.52,3.02h41.72v27.62h-40.09c-10.69,0-19.61,1.94-26.77,5.83-7.15,3.88-12.5,9.74-16.04,17.58-3.54,7.84-5.31,17.66-5.31,29.45s1.79,21.58,5.36,29.35c3.58,7.77,8.91,13.59,15.98,17.48,7.08,3.89,15.93,5.83,26.55,5.83h41.07v27.62h-43.13c-16.18,0-30.13-3.24-41.83-9.71-11.7-6.47-20.72-15.7-27.04-27.67-6.32-11.97-9.48-26.27-9.48-42.88s3.18-31.03,9.53-43.04c6.36-12.01,15.43-21.25,27.2-27.72,11.78-6.47,25.86-9.71,42.26-9.71Z"
          }
        ),
        /* @__PURE__ */ jsx("ellipse", { fill: color, cx: "589.19", cy: "83.39", rx: "17.89", ry: "17.81" })
      ]
    }
  );
}
function DomeLogoLarge({
  className = "",
  size = "lg",
  color = "#0080FF"
}) {
  const heights = { sm: 36, md: 48, lg: 64, xl: 80 };
  const h = heights[size];
  const w = Math.round(h * (930 / 492));
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 930 492",
      width: w,
      height: h,
      className,
      "aria-label": "Dome",
      role: "img",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: color,
            d: "M187.67,326.73h-41.91v-27.74h40.27c10.74,0,19.7-1.95,26.89-5.85,7.18-3.9,12.55-9.78,16.11-17.66,3.55-7.87,5.33-17.73,5.33-29.58s-1.8-21.68-5.39-29.48-8.94-13.65-16.05-17.55c-7.11-3.9-16-5.85-26.67-5.85h-41.25v-27.74h43.32c16.25,0,30.26,3.25,42.01,9.75s20.81,15.77,27.16,27.79c6.35,12.03,9.52,26.39,9.52,43.07s-3.19,31.17-9.58,43.23c-6.39,12.07-15.49,21.35-27.32,27.85-11.83,6.5-25.98,9.75-42.45,9.75Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: color,
            d: "M361.17,329c-14.37,0-27.27-3.28-38.7-9.86-11.43-6.57-20.48-16.05-27.16-28.44-6.68-12.39-10.01-27.25-10.01-44.59s3.34-32.33,10.01-44.75c6.68-12.43,15.73-21.93,27.16-28.5,11.43-6.57,24.33-9.86,38.7-9.86s27.35,3.29,38.75,9.86c11.39,6.58,20.41,16.07,27.05,28.5,6.64,12.42,9.96,27.34,9.96,44.75s-3.32,32.2-9.96,44.59c-6.64,12.39-15.66,21.87-27.05,28.44-11.39,6.58-24.31,9.86-38.75,9.86ZM361.17,300.18c8.49,0,15.95-2.08,22.37-6.23,6.42-4.16,11.43-10.26,15.02-18.31,3.59-8.05,5.39-17.9,5.39-29.53s-1.8-21.6-5.39-29.69c-3.59-8.09-8.6-14.21-15.02-18.37-6.42-4.15-13.88-6.23-22.37-6.23s-15.93,2.1-22.31,6.29c-6.39,4.19-11.37,10.31-14.97,18.37-3.59,8.06-5.39,17.94-5.39,29.64s1.8,21.46,5.39,29.47c3.59,8.02,8.58,14.13,14.97,18.31,6.38,4.19,13.82,6.29,22.31,6.29Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: color,
            d: "M625.27,177.76c-8.78-8.52-21.62-12.84-38.15-12.84-8.41,0-15.94,1.43-22.36,4.25-5.33,2.35-9.85,5.69-13.49,9.97-3.64-4.28-8.16-7.62-13.49-9.97-6.42-2.83-13.94-4.25-22.36-4.25-16.53,0-29.37,4.32-38.15,12.84-8.8,8.54-13.27,21.23-13.27,37.71v110.74h31.13v-106.94c0-4.05.31-7.95.92-11.58.58-3.44,1.64-6.49,3.15-9.06,1.45-2.47,3.43-4.38,6.04-5.83,2.6-1.44,6.02-2.17,10.18-2.17s7.52.73,10.05,2.16c2.57,1.46,4.56,3.38,6.09,5.88,1.57,2.57,2.66,5.6,3.23,9.02.61,3.64.91,7.53.91,11.58v106.94h31.13v-106.94c0-4.06.31-7.96.91-11.58.58-3.44,1.64-6.49,3.15-9.06,1.45-2.47,3.43-4.38,6.04-5.83,2.6-1.44,6.02-2.17,10.18-2.17s7.53.73,10.05,2.16c2.56,1.46,4.56,3.38,6.09,5.88,1.57,2.57,2.66,5.61,3.23,9.02.61,3.63.92,7.53.92,11.58v106.94h31.13v-110.74c0-16.48-4.46-29.17-13.27-37.71Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: color,
            d: "M742.52,166.02h41.72v27.62h-40.09c-10.69,0-19.61,1.94-26.77,5.83-7.15,3.88-12.5,9.74-16.04,17.58-3.54,7.84-5.31,17.66-5.31,29.45s1.79,21.58,5.36,29.35c3.58,7.77,8.91,13.59,15.98,17.48,7.08,3.89,15.93,5.83,26.55,5.83h41.07v27.62h-43.13c-16.18,0-30.13-3.24-41.83-9.71-11.7-6.47-20.72-15.7-27.04-27.67-6.32-11.97-9.48-26.27-9.48-42.88s3.18-31.03,9.53-43.04c6.36-12.01,15.43-21.25,27.2-27.72,11.78-6.47,25.86-9.71,42.26-9.71Z"
          }
        ),
        /* @__PURE__ */ jsx("ellipse", { fill: color, cx: "734.19", cy: "246.39", rx: "17.89", ry: "17.81" })
      ]
    }
  );
}
function DomeSymbol({
  className = "",
  size = "lg"
}) {
  const sizes = { sm: 32, md: 48, lg: 64, xl: 96 };
  const s = sizes[size];
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 128 128",
      width: s,
      height: s,
      className,
      "aria-label": "Dome",
      role: "img",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#99CFFF",
            d: "M64,104.75c29.02,0,53.79-18.09,63.71-43.6C124.68,28.62,97.32,3.16,64,3.16h0C30.68,3.16,3.32,28.62.29,61.15c9.92,25.51,34.69,43.6,63.71,43.6Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#CCE4FF",
            d: "M64,94.44c-23.3,0-43.9-13.56-53.16-34.75,1.71-12.32,7.66-23.65,16.91-32.13,9.91-9.08,22.79-14.09,36.25-14.09s26.33,5,36.25,14.09c9.25,8.48,15.2,19.81,16.91,32.13-9.26,21.19-29.86,34.75-53.16,34.75Z"
          }
        ),
        /* @__PURE__ */ jsx("circle", { fill: "#FFFFFF", cx: "64", cy: "53.95", r: "17.41" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#0080FF",
            d: "M10,114.84v-21.67c2.88,2.73,5.97,5.26,9.26,7.56,13.17,9.18,28.64,14.03,44.74,14.03s31.57-4.85,44.74-14.03c3.3-2.3,6.39-4.82,9.26-7.56v21.67H10Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#0080FF",
            d: "M127.71,61.16c-9.92,25.51-34.69,43.6-63.71,43.6S10.21,86.67.29,61.16c-.18,1.98-.29,3.98-.29,6.01v49.23c0,4.66,3.78,8.44,8.44,8.44h111.12c4.66,0,8.44-3.78,8.44-8.44v-49.23c0-2.03-.11-4.03-.29-6.01h0Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#0080FF",
            d: "M64,94.75c-23.45,0-44.19-13.67-53.48-35.02,3.64-26.71,26.23-46.57,53.48-46.57s49.84,19.86,53.48,46.57c-9.29,21.35-30.03,35.02-53.48,35.02Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#0080FF",
            d: "M64,23.16c11.03,0,21.58,4.1,29.7,11.54,6.9,6.32,11.56,14.57,13.4,23.61-3.61,7.1-8.91,13.19-15.52,17.8-8.11,5.65-17.64,8.64-27.58,8.64s-19.47-2.99-27.58-8.64c-6.62-4.61-11.92-10.71-15.52-17.8,1.84-9.03,6.5-17.28,13.4-23.61,8.12-7.44,18.67-11.54,29.7-11.54M64,3.16h0C30.68,3.16,3.32,28.62.29,61.15c9.92,25.51,34.69,43.6,63.71,43.6s53.79-18.09,63.71-43.6C124.68,28.62,97.32,3.16,64,3.16h0Z"
          }
        )
      ]
    }
  );
}
function DomeFavicon({
  className = "",
  size = 32
}) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 128 128",
      width: size,
      height: size,
      className,
      "aria-label": "Dome",
      role: "img",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#99CFFF",
            d: "M64,104.75c29.02,0,53.79-18.09,63.71-43.6C124.68,28.62,97.32,3.16,64,3.16h0C30.68,3.16,3.32,28.62.29,61.15c9.92,25.51,34.69,43.6,63.71,43.6Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#CCE4FF",
            d: "M64,94.44c-23.3,0-43.9-13.56-53.16-34.75,1.71-12.32,7.66-23.65,16.91-32.13,9.91-9.08,22.79-14.09,36.25-14.09s26.33,5,36.25,14.09c9.25,8.48,15.2,19.81,16.91,32.13-9.26,21.19-29.86,34.75-53.16,34.75Z"
          }
        ),
        /* @__PURE__ */ jsx("circle", { fill: "#FFFFFF", cx: "64", cy: "53.95", r: "17.41" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#0080FF",
            d: "M10,114.84v-21.67c2.88,2.73,5.97,5.26,9.26,7.56,13.17,9.18,28.64,14.03,44.74,14.03s31.57-4.85,44.74-14.03c3.3-2.3,6.39-4.82,9.26-7.56v21.67H10Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#0080FF",
            d: "M127.71,61.16c-9.92,25.51-34.69,43.6-63.71,43.6S10.21,86.67.29,61.16c-.18,1.98-.29,3.98-.29,6.01v49.23c0,4.66,3.78,8.44,8.44,8.44h111.12c4.66,0,8.44-3.78,8.44-8.44v-49.23c0-2.03-.11-4.03-.29-6.01h0Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#0080FF",
            d: "M64,94.75c-23.45,0-44.19-13.67-53.48-35.02,3.64-26.71,26.23-46.57,53.48-46.57s49.84,19.86,53.48,46.57c-9.29,21.35-30.03,35.02-53.48,35.02Z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#0080FF",
            d: "M64,23.16c11.03,0,21.58,4.1,29.7,11.54,6.9,6.32,11.56,14.57,13.4,23.61-3.61,7.1-8.91,13.19-15.52,17.8-8.11,5.65-17.64,8.64-27.58,8.64s-19.47-2.99-27.58-8.64c-6.62-4.61-11.92-10.71-15.52-17.8,1.84-9.03,6.5-17.28,13.4-23.61,8.12-7.44,18.67-11.54,29.7-11.54M64,3.16h0C30.68,3.16,3.32,28.62.29,61.15c9.92,25.51,34.69,43.6,63.71,43.6s53.79-18.09,63.71-43.6C124.68,28.62,97.32,3.16,64,3.16h0Z"
          }
        )
      ]
    }
  );
}

// src/components/ThemeToggle.tsx
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

// src/theme.ts
var COOKIE_NAME = "dome-theme";
var COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
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
function readThemeCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((r) => r.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  const val = match.split("=")[1];
  return val === "light" || val === "dark" ? val : null;
}
function writeThemeCookie(theme) {
  if (typeof document === "undefined") return;
  const domain = cookieDomain();
  const domainPart = domain ? `; Domain=${domain}` : "";
  const secure = isHttpsHost() ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${theme}; Path=/; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}${domainPart}${secure}`;
}
function getTheme() {
  if (typeof window === "undefined") return "light";
  const cookie = readThemeCookie();
  if (cookie) return cookie;
  const stored = localStorage.getItem(COOKIE_NAME);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(COOKIE_NAME, theme);
  writeThemeCookie(theme);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute(
    "data-theme"
  );
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

// src/components/ThemeToggle.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function ThemeToggle() {
  const [theme, setTheme2] = useState("light");
  useEffect(() => {
    setTheme2(getTheme());
  }, []);
  const handleToggle = () => {
    const next = toggleTheme();
    setTheme2(next);
  };
  return /* @__PURE__ */ jsx2(
    "button",
    {
      onClick: handleToggle,
      className: "theme-toggle",
      "aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
      children: theme === "dark" ? /* @__PURE__ */ jsx2(Sun, { size: 16, strokeWidth: 1.5 }) : /* @__PURE__ */ jsx2(Moon, { size: 16, strokeWidth: 1.5 })
    }
  );
}

// src/components/AuthGuard.tsx
import { useEffect as useEffect2, useState as useState2 } from "react";

// src/auth.ts
var COOKIE_NAME2 = "dome_auth_token";
function isStagingHost2(host) {
  return host === "staging.domelayer.com" || host.endsWith(".staging.domelayer.com");
}
function isProductionHost2(host) {
  if (isStagingHost2(host)) return false;
  return host === "domelayer.com" || host.endsWith(".domelayer.com");
}
function isHttpsHost2() {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return isStagingHost2(host) || isProductionHost2(host);
}
function cookieDomain2() {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  if (isStagingHost2(host)) return ".staging.domelayer.com";
  if (isProductionHost2(host)) return ".domelayer.com";
  return "";
}
function getAuthSiteUrl() {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  if (isStagingHost2(host)) return "https://staging.domelayer.com";
  if (isProductionHost2(host)) return "https://domelayer.com";
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
  const match = document.cookie.split("; ").find((row) => row.startsWith(`${COOKIE_NAME2}=`));
  if (!match) return null;
  return match.split("=").slice(1).join("=") || null;
}
function setToken(token, expiresAt) {
  if (typeof document === "undefined") return;
  const domain = cookieDomain2();
  const maxAge = expiresAt ? parseCookieExpiry(expiresAt) : "28800";
  const domainPart = domain ? `; Domain=${domain}` : "";
  const securePart = isHttpsHost2() ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME2}=${token}; Path=/${domainPart}; SameSite=Lax${securePart}; Max-Age=${maxAge}`;
}
function clearToken() {
  if (typeof document === "undefined") return;
  const domain = cookieDomain2();
  const domainPart = domain ? `; Domain=${domain}` : "";
  const securePart = isHttpsHost2() ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME2}=; Path=/${domainPart}; SameSite=Lax${securePart}; Max-Age=0`;
}
function getHubUrl() {
  if (typeof window === "undefined") return "https://domelayer.com/app";
  return isStagingHost2(window.location.hostname) ? "https://staging.domelayer.com/app" : "https://domelayer.com/app";
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

// src/components/AuthGuard.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function AuthGuard({ children, skip = false }) {
  const [checked, setChecked] = useState2(false);
  useEffect2(() => {
    if (skip) {
      setChecked(true);
      return;
    }
    if (!getToken()) {
      const returnUrl = encodeURIComponent(window.location.href);
      window.location.href = `${getAuthSiteUrl()}/login?redirect=${returnUrl}`;
    } else {
      setChecked(true);
    }
  }, [skip]);
  if (!checked) {
    return /* @__PURE__ */ jsx3(
      "div",
      {
        className: "flex min-h-screen items-center justify-center",
        style: { background: "var(--color-bg-subtle)" },
        children: /* @__PURE__ */ jsxs2("div", { className: "flex flex-col items-center gap-3", children: [
          /* @__PURE__ */ jsx3(
            "div",
            {
              className: "h-6 w-6 animate-spin rounded-full border-2",
              style: {
                borderColor: "var(--color-border-default)",
                borderTopColor: "var(--color-accent)"
              }
            }
          ),
          /* @__PURE__ */ jsx3(
            "p",
            {
              className: "text-xs font-semibold uppercase tracking-widest",
              style: { color: "var(--color-text-tertiary)" },
              children: "Loading"
            }
          )
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsx3(Fragment, { children });
}

// src/components/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect as useEffect3,
  useState as useState3,
  useCallback
} from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var AuthCtx = createContext({
  isAuthenticated: false,
  user: null,
  signIn: () => {
  },
  signOut: async () => {
  }
});
function readUser() {
  const claims = getUserClaims();
  if (!claims) return null;
  return { email: typeof claims.email === "string" ? claims.email : void 0 };
}
function AuthProvider({ children, onSignOut }) {
  const [isAuthenticated, setIsAuthenticated] = useState3(false);
  const [user, setUser] = useState3(null);
  useEffect3(() => {
    const authed = !!getToken();
    setIsAuthenticated(authed);
    setUser(authed ? readUser() : null);
  }, []);
  const signIn = useCallback((newToken, expiresAt) => {
    setToken(newToken, expiresAt);
    setIsAuthenticated(true);
    setUser(readUser());
  }, []);
  const signOut = useCallback(async () => {
    if (getToken() && onSignOut) {
      try {
        await onSignOut();
      } catch {
      }
    }
    clearToken();
    setIsAuthenticated(false);
    setUser(null);
  }, [onSignOut]);
  return /* @__PURE__ */ jsx4(AuthCtx.Provider, { value: { isAuthenticated, user, signIn, signOut }, children });
}
function useAuth() {
  return useContext(AuthCtx);
}

// src/components/ToolHeader.tsx
import { useState as useState4 } from "react";
import { LayoutGrid, Menu, X, LogOut } from "lucide-react";

// src/clsx.ts
function clsx(...args) {
  return args.filter(Boolean).join(" ");
}

// src/components/ToolHeader.tsx
import { Fragment as Fragment2, jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function DefaultLink(props) {
  return /* @__PURE__ */ jsx5("a", { ...props });
}
function ToolHeader({
  toolName,
  homeHref = "/",
  showHomeLink = true,
  homeLabel = "Home",
  navLinks = [],
  renderLink,
  extra,
  width = "contained",
  showHubLink = true,
  hubLabel = "All tools",
  onSignIn
}) {
  const { isAuthenticated, user, signOut } = useAuth();
  const Link = renderLink ?? DefaultLink;
  const [menuOpen, setMenuOpen] = useState4(false);
  const [accountOpen, setAccountOpen] = useState4(false);
  const email = user?.email;
  const initial = email ? email.charAt(0).toUpperCase() : "?";
  const hubHref = getHubUrl();
  const navItems = [
    ...showHomeLink ? [{ label: homeLabel, href: homeHref }] : [],
    ...navLinks
  ];
  const handleSignIn = () => {
    if (onSignIn) {
      onSignIn();
      return;
    }
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `${getAuthSiteUrl()}/login?redirect=${returnUrl}`;
  };
  const handleSignOut = async () => {
    await signOut();
    window.location.href = `${getAuthSiteUrl()}/login`;
  };
  return /* @__PURE__ */ jsxs3("header", { className: "site-header sticky top-0 z-40", children: [
    /* @__PURE__ */ jsxs3(
      "div",
      {
        className: clsx(
          "h-16 flex items-center justify-between gap-4 px-6 md:px-8",
          width === "fluid" ? "w-full" : "max-w-[1152px] mx-auto"
        ),
        children: [
          /* @__PURE__ */ jsxs3("div", { className: "flex items-center min-w-0", children: [
            Link({
              href: homeHref,
              "aria-label": "Home",
              className: "dome-brand",
              children: /* @__PURE__ */ jsx5(DomeLogo, { size: "md" })
            }),
            toolName ? /* @__PURE__ */ jsx5("span", { className: "dome-toolname", children: toolName }) : null
          ] }),
          /* @__PURE__ */ jsxs3("nav", { className: "hidden md:flex items-center gap-4", children: [
            navItems.map((link) => /* @__PURE__ */ jsx5("span", { children: Link({
              href: link.href,
              className: "dome-navlink",
              children: link.label
            }) }, `${link.href}:${link.label}`)),
            isAuthenticated ? /* @__PURE__ */ jsxs3("div", { className: "dome-account", children: [
              /* @__PURE__ */ jsx5(
                "button",
                {
                  type: "button",
                  className: "dome-avatar",
                  "aria-label": email ? `Account: ${email}` : "Account",
                  "aria-haspopup": "menu",
                  "aria-expanded": accountOpen,
                  onClick: () => setAccountOpen((v) => !v),
                  children: initial
                }
              ),
              accountOpen ? /* @__PURE__ */ jsxs3(Fragment2, { children: [
                /* @__PURE__ */ jsx5(
                  "button",
                  {
                    type: "button",
                    "aria-hidden": "true",
                    tabIndex: -1,
                    className: "dome-menu-backdrop",
                    onClick: () => setAccountOpen(false)
                  }
                ),
                /* @__PURE__ */ jsxs3("div", { className: "dome-menu", role: "menu", children: [
                  email ? /* @__PURE__ */ jsx5("p", { className: "dome-menu-email", title: email, children: email }) : null,
                  showHubLink ? /* @__PURE__ */ jsxs3("a", { href: hubHref, role: "menuitem", className: "dome-menu-item", children: [
                    /* @__PURE__ */ jsx5(LayoutGrid, { size: 15, strokeWidth: 1.75, "aria-hidden": "true" }),
                    hubLabel
                  ] }) : null,
                  /* @__PURE__ */ jsxs3(
                    "button",
                    {
                      type: "button",
                      role: "menuitem",
                      className: "dome-menu-item",
                      onClick: handleSignOut,
                      children: [
                        /* @__PURE__ */ jsx5(LogOut, { size: 15, strokeWidth: 1.75, "aria-hidden": "true" }),
                        "Sign out"
                      ]
                    }
                  )
                ] })
              ] }) : null
            ] }) : /* @__PURE__ */ jsx5("button", { className: "btn btn-primary", onClick: handleSignIn, children: "Sign in" }),
            extra,
            /* @__PURE__ */ jsx5(ThemeToggle, {})
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 md:hidden", children: [
            /* @__PURE__ */ jsx5(ThemeToggle, {}),
            /* @__PURE__ */ jsx5(
              "button",
              {
                type: "button",
                className: "dome-menu-btn",
                "aria-label": menuOpen ? "Close menu" : "Open menu",
                "aria-expanded": menuOpen,
                onClick: () => setMenuOpen((v) => !v),
                children: menuOpen ? /* @__PURE__ */ jsx5(X, { size: 18, strokeWidth: 1.75 }) : /* @__PURE__ */ jsx5(Menu, { size: 18, strokeWidth: 1.75 })
              }
            )
          ] })
        ]
      }
    ),
    menuOpen ? /* @__PURE__ */ jsxs3(Fragment2, { children: [
      /* @__PURE__ */ jsx5(
        "button",
        {
          type: "button",
          "aria-hidden": "true",
          tabIndex: -1,
          className: "dome-menu-backdrop",
          onClick: () => setMenuOpen(false)
        }
      ),
      /* @__PURE__ */ jsxs3("div", { className: "dome-mobile-panel md:hidden", children: [
        navItems.map((link) => /* @__PURE__ */ jsx5("span", { children: Link({
          href: link.href,
          className: "dome-mobile-link",
          onClick: () => setMenuOpen(false),
          children: link.label
        }) }, `${link.href}:${link.label}`)),
        isAuthenticated && showHubLink ? /* @__PURE__ */ jsxs3(
          "a",
          {
            href: hubHref,
            className: "dome-mobile-link",
            onClick: () => setMenuOpen(false),
            children: [
              /* @__PURE__ */ jsx5(LayoutGrid, { size: 16, strokeWidth: 1.75, "aria-hidden": "true" }),
              hubLabel
            ]
          }
        ) : null,
        isAuthenticated ? /* @__PURE__ */ jsxs3(Fragment2, { children: [
          email ? /* @__PURE__ */ jsx5("p", { className: "dome-menu-email", title: email, children: email }) : null,
          /* @__PURE__ */ jsx5("button", { className: "btn btn-neutral", onClick: handleSignOut, children: "Sign out" })
        ] }) : /* @__PURE__ */ jsx5(
          "button",
          {
            className: "btn btn-primary",
            onClick: () => {
              setMenuOpen(false);
              handleSignIn();
            },
            children: "Sign in"
          }
        )
      ] })
    ] }) : null
  ] });
}

// src/components/ToolFooter.tsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
function ToolFooter({ toolName, className }) {
  return /* @__PURE__ */ jsx6(
    "footer",
    {
      className,
      style: {
        borderTop: "1px solid var(--color-border-default)",
        marginTop: "auto"
      },
      children: /* @__PURE__ */ jsxs4(
        "div",
        {
          style: {
            maxWidth: 1152,
            margin: "0 auto",
            padding: "32px 24px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            fontFamily: "var(--font-sans)",
            fontSize: 14
          },
          children: [
            /* @__PURE__ */ jsxs4("p", { style: { color: "var(--color-text-secondary)", margin: 0 }, children: [
              toolName,
              " is a free tool by",
              " ",
              /* @__PURE__ */ jsx6(
                "a",
                {
                  href: "https://www.domelayer.com",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  style: {
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    textDecoration: "none"
                  },
                  children: "Dome"
                }
              ),
              " ",
              "\u2014 Governance-Driven Operational AI."
            ] }),
            /* @__PURE__ */ jsxs4(
              "a",
              {
                href: "https://www.domelayer.com",
                target: "_blank",
                rel: "noopener noreferrer",
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 600,
                  color: "var(--color-accent)",
                  textDecoration: "none",
                  whiteSpace: "nowrap"
                },
                children: [
                  "Explore Dome",
                  /* @__PURE__ */ jsx6(
                    "svg",
                    {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 14 14",
                      fill: "none",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsx6(
                        "path",
                        {
                          d: "M2.5 7h9M8 3.5 11.5 7 8 10.5",
                          stroke: "currentColor",
                          strokeWidth: "1.5",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      )
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
}

// src/components/Badge.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
var variantStyles = {
  default: {
    color: "var(--color-text-secondary)",
    borderColor: "var(--color-border-default)",
    background: "var(--color-bg-muted)"
  },
  success: {
    color: "var(--color-success)",
    borderColor: "var(--color-success-border)",
    background: "var(--color-success-subtle)"
  },
  warning: {
    color: "var(--color-warning)",
    borderColor: "var(--color-warning-border)",
    background: "var(--color-warning-subtle)"
  },
  error: {
    color: "var(--color-error)",
    borderColor: "var(--color-error-border)",
    background: "var(--color-error-subtle)"
  },
  accent: {
    color: "var(--color-accent)",
    borderColor: "var(--color-border-accent)",
    background: "var(--color-bg-accent)"
  }
};
function Badge({
  variant = "default",
  children,
  className
}) {
  return /* @__PURE__ */ jsx7(
    "span",
    {
      className: clsx(
        "inline-flex items-center text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded border",
        className
      ),
      style: variantStyles[variant],
      children
    }
  );
}

// src/components/Button.tsx
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var baseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1,
  borderRadius: "var(--radius-md)",
  cursor: "pointer",
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  whiteSpace: "nowrap",
  border: "none",
  outline: "none",
  textDecoration: "none"
};
var variantStyles2 = {
  primary: {
    background: "var(--color-accent)",
    color: "var(--color-text-on-accent)",
    padding: "12px 24px"
  },
  secondary: {
    background: "transparent",
    color: "var(--color-accent)",
    border: "1px solid var(--color-border-accent)",
    padding: "12px 24px"
  },
  ghost: {
    background: "transparent",
    color: "var(--color-accent)",
    padding: "8px 12px",
    textDecoration: "underline",
    textUnderlineOffset: 4
  }
};
function Button({
  variant = "primary",
  loading = false,
  disabled,
  className,
  children,
  style,
  ...props
}) {
  return /* @__PURE__ */ jsxs5(
    "button",
    {
      className: clsx("dome-btn", className),
      disabled: disabled || loading,
      style: {
        ...baseStyle,
        ...variantStyles2[variant],
        ...disabled || loading ? { opacity: 0.4, cursor: "not-allowed" } : {},
        ...style
      },
      ...props,
      children: [
        loading && /* @__PURE__ */ jsx8(
          "span",
          {
            className: "animate-spin",
            style: {
              width: 16,
              height: 16,
              border: "2px solid currentColor",
              borderTopColor: "transparent",
              borderRadius: "50%",
              display: "inline-block"
            }
          }
        ),
        children
      ]
    }
  );
}

// src/components/Card.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
function Card({ children, className }) {
  return /* @__PURE__ */ jsx9(
    "div",
    {
      className: clsx("rounded-lg border p-6", className),
      style: {
        background: "var(--color-bg-subtle)",
        borderColor: "var(--color-border-default)"
      },
      children
    }
  );
}

// src/components/StagingBanner.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
function StagingBanner({ environment, className }) {
  if (environment !== "staging") return null;
  return /* @__PURE__ */ jsx10(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className,
      style: {
        width: "100%",
        padding: "6px 16px",
        textAlign: "center",
        fontFamily: "var(--font-sans)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        // Fixed DOME "warning orange" (token-independent) so the banner is
        // identical on every tool AND the marketing site, regardless of each
        // app's theme tokens. The translucent tint adapts to any light/dark
        // background while the orange text stays legible on both.
        color: "#D97706",
        background: "rgba(217, 119, 6, 0.12)",
        borderBottom: "1px solid rgba(217, 119, 6, 0.35)"
      },
      children: "Staging environment \u2014 not production"
    }
  );
}
export {
  AuthGuard,
  AuthProvider,
  Badge,
  Button,
  Card,
  DomeFavicon,
  DomeLogo,
  DomeLogoLarge,
  DomeSymbol,
  StagingBanner,
  ThemeToggle,
  ToolFooter,
  ToolHeader,
  clsx,
  useAuth
};
