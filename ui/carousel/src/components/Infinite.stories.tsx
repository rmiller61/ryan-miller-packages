/* eslint-disable @next/next/no-img-element */

import { InfiniteCarousel, type VisibleItems } from "./Infinite"
import { arrayFromNumber } from "@social-hustle/utils-arrays"
import type { Meta, StoryObj } from "@storybook/react"
import { GoChevronLeft, GoChevronRight } from "react-icons/go"

const visibleItems: VisibleItems = {
  600: 2,
  900: 3,
}

const images = arrayFromNumber(8).map((i) => `/images/${i + 1}.jpg`)

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Infinite Carousel",
  component: InfiniteCarousel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof InfiniteCarousel>

export default meta
type Story = StoryObj<typeof meta>

const args = {
  children: images.map((src, index) => (
    <div
      key={index}
      className="flex h-full w-full items-center justify-center border border-white bg-black text-2xl text-white"
    >
      {index}
    </div>
  )),
  moveBy: 1,
  visibleItems,
  height: `33vw`,
}

export const Default: Story = {
  args,
}

export const WithControls: Story = {
  args: {
    ...args,
    renderAfter: ({ setPage }) => (
      <>
        <button
          className="absolute left-0 top-1/2 -mt-5 flex h-10 w-10 items-center justify-center bg-white"
          onClick={() => setPage(1)}
        >
          <GoChevronLeft />
        </button>
        <button
          className="absolute right-0 top-1/2 -mt-5 flex h-10 w-10 items-center justify-center bg-white"
          onClick={() => setPage(-1)}
        >
          <GoChevronRight />
        </button>
      </>
    ),
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
