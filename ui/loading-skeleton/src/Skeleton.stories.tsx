import Skeleton from "."
import type { Meta, StoryObj } from "@storybook/react"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Skeleton",
  component: Skeleton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Multiple: Story = {
  args: {
    count: 5,
  },
}

export const Wrapper: Story = {
  args: {
    count: 16,
    wrapper: ({ children }) => <div className="grid grid-cols-4 gap-5 leading-[0]">{children}</div>,
  },
}

export const CustomSize: Story = {
  args: {
    height: `200px`,
    width: `200px`,
  },
}
