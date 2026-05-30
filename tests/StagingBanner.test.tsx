import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { StagingBanner } from "../src/components/StagingBanner";

afterEach(cleanup);

describe("StagingBanner", () => {
  it("renders nothing in production", () => {
    const { container } = render(<StagingBanner environment="production" />);
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when environment is undefined", () => {
    const { container } = render(<StagingBanner />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the banner on staging", () => {
    const { container } = render(<StagingBanner environment="staging" />);
    const banner = container.querySelector('[role="status"]');
    expect(banner).not.toBeNull();
    expect(banner?.textContent ?? "").toMatch(/staging/i);
  });
});
