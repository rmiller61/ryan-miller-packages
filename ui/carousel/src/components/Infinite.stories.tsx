/* eslint-disable @next/next/no-img-element */

import { InfiniteCarousel, type VisibleItems } from "./Infinite"
import { arrayFromNumber } from "@social-hustle/utils-arrays"
import { wrap } from "@social-hustle/utils-numbers"
import type { Meta, StoryObj } from "@storybook/react"
import { motion } from "framer-motion"
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
    renderAfter: ({ setPage, page }) => (
      <>
        <button
          className="absolute left-0 top-1/2 -mt-5 flex h-10 w-10 items-center justify-center bg-white"
          onClick={() => setPage(page + 1)}
        >
          <GoChevronLeft />
        </button>
        <button
          className="absolute right-0 top-1/2 -mt-5 flex h-10 w-10 items-center justify-center bg-white"
          onClick={() => setPage(page - 1)}
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

export const WithPagination: Story = {
  args: {
    ...args,
    renderAfter: ({ setPage, page }) => {
      const wrappedPage = wrap(page, [0, images.length])
      return (
        <div className="mt-10 flex px-20">
          {images.map((_, index) => (
            <button
              key={index}
              className="relative h-0.5 flex-1 bg-black"
              onClick={() => setPage(index)}
            >
              {index === wrappedPage && (
                <motion.div
                  layoutId="active"
                  className="absolute inset-x-0 -top-[1px] h-1 w-full bg-zinc-500"
                />
              )}
            </button>
          ))}
        </div>
      )
    },
  },
}
