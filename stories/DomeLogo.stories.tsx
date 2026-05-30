import type { Meta, StoryObj } from "@storybook/react-vite";
import { DomeLogo, DomeLogoLarge, DomeSymbol, DomeFavicon } from "../src";

const meta: Meta<typeof DomeLogo> = {
  title: "Brand/DomeLogo",
  component: DomeLogo,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    color: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof DomeLogo>;

export const Default: Story = {};
export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "xl" } };
export const CustomColor: Story = { args: { color: "#DC2626" } };

export const AllVariants: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <p style={{ fontSize: 12, marginBottom: 8, color: "#737373" }}>DomeLogo (compact wordmark)</p>
        <DomeLogo />
      </div>
      <div>
        <p style={{ fontSize: 12, marginBottom: 8, color: "#737373" }}>DomeLogoLarge (spacious wordmark)</p>
        <DomeLogoLarge />
      </div>
      <div>
        <p style={{ fontSize: 12, marginBottom: 8, color: "#737373" }}>DomeSymbol (favicon icon)</p>
        <DomeSymbol />
      </div>
      <div>
        <p style={{ fontSize: 12, marginBottom: 8, color: "#737373" }}>DomeFavicon (square favicon)</p>
        <DomeFavicon />
      </div>
    </div>
  ),
};
