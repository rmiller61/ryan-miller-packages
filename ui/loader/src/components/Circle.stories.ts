import { Circle } from "./Circle"
import type { Meta, StoryObj } from "@storybook/react"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Example/Circle",
  component: Circle,
  argTypes: {
    fill: { control: "color" },
  },
} satisfies Meta<typeof Circle>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    fill: "black",
  },
}

export const Secondary: Story = {
  args: {
    fill: "grey",
  },
}

export const Large: Story = {
  args: {
    fill: "red",
  },
}
