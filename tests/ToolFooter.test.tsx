import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ToolFooter } from "../src/components/ToolFooter";

describe("ToolFooter", () => {
  beforeEach(() => {
    document.cookie = "dome-lang=; Max-Age=0; Path=/";
  });

  it("stays English unless the tool turns languages on", () => {
    document.cookie = "dome-lang=de; Path=/";
    const { container } = render(<ToolFooter toolName="Process Analyzer" />);
    expect(container.textContent).toContain(
      "Process Analyzer is a free tool by Dome: governance-driven operational AI.",
    );
    expect(screen.getByText("Explore Dome")).toBeTruthy();
  });

  it("speaks the remembered language when languages is on", async () => {
    document.cookie = "dome-lang=de; Path=/";
    const { container } = render(<ToolFooter toolName="Process Analyzer" languages />);
    expect(await screen.findByText("Dome entdecken")).toBeTruthy();
    expect(container.textContent).toContain(
      "Process Analyzer ist ein kostenloses Tool von Dome: operative KI, gesteuert durch Governance.",
    );
  });
});
