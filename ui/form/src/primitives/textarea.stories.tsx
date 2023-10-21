import { Textarea } from "./textarea"
import type { Meta, StoryObj } from "@storybook/react"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Primitives/Textarea",
  component: Textarea,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    className:
      "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  },
}
