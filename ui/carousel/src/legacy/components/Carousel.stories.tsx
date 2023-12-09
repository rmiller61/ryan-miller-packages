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
  title: "Legacy Carousel",
  component: Carousel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const args = {
  children: images.map((src, index) => (
    <img
      key={index}
      src={src}
      draggable={false}
      alt="Mountain"
      style={{ width: "100%" }}
    />
  )),
  moveBy: 1,
  visibleItems,
  height: 275,
}

export const Default: Story = {
  args,
}

export const Infinite: Story = {
  args: {
    ...args,
    infinite: true,
  },
}

export const WithControls: Story = {
  args: {
    ...args,
    draggable: false,
    infinite: true,
    controls: {
      position: "after",
      render: ({ setPage, isFirst, page }) => (
        <>
          <button
            className="absolute left-0 top-1/2 -mt-5 flex h-10 w-10 items-center justify-center bg-white"
            onClick={() => setPage(1)}
            disabled={isFirst}
          >
            {" "}
            &lt;{" "}
          </button>
          <button
            className="absolute right-0 top-1/2 -mt-5 flex h-10 w-10 items-center justify-center bg-white"
            onClick={() => setPage(-1)}
            disabled={page === 2}
          >
            {" "}
            &gt;{" "}
          </button>
        </>
      ),
    },
  },
  decorators: [
    (Story) => (
      <div className="relative">
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
}
