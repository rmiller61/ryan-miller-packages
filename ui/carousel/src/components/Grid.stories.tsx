/* eslint-disable @next/next/no-img-element */

import { Grid, type GridCarouselProps } from "./Grid"
import type { Meta, StoryObj } from "@storybook/react"

const images = [
  `https://loremflickr.com/600/600?random=1`,
  `https://loremflickr.com/600/600?random=2`,
  `https://loremflickr.com/600/600?random=3`,
  `https://loremflickr.com/600/600?random=4`,
  `https://loremflickr.com/600/600?random=5`,
  `https://loremflickr.com/600/600?random=6`,
  `https://loremflickr.com/600/600?random=7`,
]

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Grid Carousel",
  component: Grid,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const args: GridCarouselProps = {
  children: images.map((src, index) => (
    <img
      key={index}
      src={src}
      draggable={false}
      alt=""
      style={{ width: "100%" }}
    />
  )),
  itemClassName: "w-[350px]",
  className: "gap-5",
  calculateConstraints: ({ width, windowWidth }) => ({
    left: windowWidth - width,
    right: 0,
  }),
}

export const Default: Story = {
  args,
}
