/* eslint-disable @next/next/no-img-element */

import type { VisibleItems } from "../types"
import { CarouselProps } from "../types"
import Carousel from "./Carousel"
import type { Meta, StoryObj } from "@storybook/react"

const visibleItems: VisibleItems = {
  600: 2,
  900: 3,
}

const images = [
  "https://unsplash.com/photos/1527pjeb6jg/download?force=true&w=640",
  "https://unsplash.com/photos/9wg5jCEPBsw/download?force=true&w=640",
  "https://unsplash.com/photos/phIFdC6lA4E/download?force=true&w=640",
]

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Carousel",
  component: Carousel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: images.map((src, index) => (
      <img
        key={index}
        src={src}
        draggable={false}
        alt="Mountain"
        style={{ width: "100%" }}
      />
    )),
    //moveBy: 1,
    visibleItems,
  },
}
