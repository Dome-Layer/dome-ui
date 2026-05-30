import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToolFooter } from "../src";

const meta: Meta<typeof ToolFooter> = {
  title: "Layout/ToolFooter",
  component: ToolFooter,
  argTypes: {
    toolName: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ToolFooter>;

export const ProcessAnalyzer: Story = { args: { toolName: "Process Analyzer" } };
export const LLMCouncil: Story = { args: { toolName: "LLM Council" } };
export const DocumentIntelligence: Story = { args: { toolName: "Document Intelligence" } };
export const DataIntelligence: Story = { args: { toolName: "Data Intelligence" } };
