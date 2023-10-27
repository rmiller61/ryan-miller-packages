import { Slider } from "./slider"
import type { Meta, StoryObj } from "@storybook/react"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Primitives/Slider",
  component: Slider,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    className: "relative flex w-full touch-none select-none items-center",
    min: 0,
    max: 100,
    defaultValue: [25, 75],
    thumbCount: 2,
    trackClassName: "bg-gray-200",
    thumbClassName: "bg-black border-gray-200",
  },
}
