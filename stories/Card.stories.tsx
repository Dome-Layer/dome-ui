import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../src";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: "This is a card with some content inside it.",
  },
};

export const WithRichContent: StoryObj = {
  render: () => (
    <Card>
      <h3 style={{ margin: "0 0 8px", fontWeight: 600, color: "var(--color-text-primary)" }}>
        Analysis Complete
      </h3>
      <p style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)" }}>
        3 governance rules triggered. Review the results below.
      </p>
    </Card>
  ),
};
