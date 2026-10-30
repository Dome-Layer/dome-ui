import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The blue top bar (design system v2.7, "Blue surface"): every foreground on it, measured
 * against the token values actually shipped. WCAG 2.1: 4.5:1 for text, 3:1 for the focus ring
 * and other non-text UI.
 */
const tokens = readFileSync(join(__dirname, "..", "src", "tokens.css"), "utf8");

function token(name: string): string {
  const match = tokens.match(new RegExp(`${name}:\\s*(#[0-9A-Fa-f]{6})`));
  if (!match) throw new Error(`${name} not found in tokens.css`);
  return match[1];
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe("top bar contrast", () => {
  const bar = token("--color-bar");
  const white = token("--color-text-on-accent");
  const inverseText = token("--primitive-blue-600");
  const inverseHover = token("--primitive-blue-50");

  it("defines --color-bar once, as #0070E0, for both themes", () => {
    expect(bar.toUpperCase()).toBe("#0070E0");
    expect(tokens.match(/--color-bar:/g)).toHaveLength(1);
  });

  it("white wordmark, tool name, links, icons and focus ring pass on the bar", () => {
    expect(contrast(white, bar)).toBeGreaterThanOrEqual(4.5);
  });

  it("the inverse Sign in and avatar pass at rest and on hover", () => {
    expect(contrast(inverseText, white)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(inverseText, inverseHover)).toBeGreaterThanOrEqual(4.5);
  });
});
