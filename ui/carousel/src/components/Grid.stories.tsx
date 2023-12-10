/* eslint-disable @next/next/no-img-element */

import { Grid, type GridCarouselProps, type RenderPropProps } from "./Grid"
import type { Meta, StoryObj } from "@storybook/react"
import { useTransform, motion } from "framer-motion"
import { useWindowSize } from "react-use"

const images = [
  `https://loremflickr.com/600/600?random=1`,
  `https://loremflickr.com/600/600?random=2`,
  `https://loremflickr.com/600/600?random=3`,
  `https://loremflickr.com/600/600?random=4`,
  `https://loremflickr.com/600/600?random=5`,
  `https://loremflickr.com/600/600?random=6`,
  `https://loremflickr.com/600/600?random=7`,
]

const ProgressBar = ({ x, boundingBox }: RenderPropProps) => {
  const { width: windowWidth } = useWindowSize()
  const progress = useTransform(x, [0, windowWidth - boundingBox.width], [0, 1])
  return (
    <div className="relative mx-10 mt-8 h-1 overflow-hidden rounded bg-slate-500">
      <motion.div
        className="absolute inset-0 origin-left scale-x-0 bg-red-500"
        style={{
          scaleX: progress,
        }}
      />
    </div>
  )
}

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

export const WithProgressBar: Story = {
  args: {
    ...args,
    renderAfter: (props) => <ProgressBar {...props} />,
  },
}
