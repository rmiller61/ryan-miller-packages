import { Label } from "./label"
import { RadioGroup, RadioGroupItem } from "./radio"
import type { Meta, StoryObj } from "@storybook/react"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Primitives/Radio",
  component: RadioGroup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    className:
      "border-primary text-primary ring-offset-background focus-visible:ring-ring aspect-square h-4 w-4 rounded-full border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    defaultValue: "comfortable",
    children: (
      <>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="default"
            id="r1"
          />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="comfortable"
            id="r2"
          />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="compact"
            id="r3"
          />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </>
    ),
  },
}
