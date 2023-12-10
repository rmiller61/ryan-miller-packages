/* eslint-disable @next/next/no-img-element */

import { Grid, type GridCarouselProps, type RenderPropProps } from "./Grid"
import cn from "@social-hustle/utils-classnames"
import { clamp } from "@social-hustle/utils-numbers"
import type { Meta, StoryObj } from "@storybook/react"
import { useTransform, motion, animate, useSpring, useMotionValueEvent } from "framer-motion"
import { useState, createContext } from "react"
import { GoChevronLeft, GoChevronRight } from "react-icons/go"

const images = [
  `https://loremflickr.com/600/600?random=1`,
  `https://loremflickr.com/600/600?random=2`,
  `https://loremflickr.com/600/600?random=3`,
  `https://loremflickr.com/600/600?random=4`,
  `https://loremflickr.com/600/600?random=5`,
  `https://loremflickr.com/600/600?random=6`,
  `https://loremflickr.com/600/600?random=7`,
]

const imagesWithContext = [
  {
    src: `https://loremflickr.com/600/600?random=1`,
    categories: ["Nature"],
  },
  {
    src: `https://loremflickr.com/600/600?random=2`,
    categories: ["Technology"],
  },
  {
    src: `https://loremflickr.com/600/600?random=3`,
    categories: ["Nature"],
  },
  {
    src: `https://loremflickr.com/600/600?random=4`,
    categories: ["Nature", "Technology"],
  },
  {
    src: `https://loremflickr.com/600/600?random=5`,
    categories: ["Nature"],
  },
  {
    src: `https://loremflickr.com/600/600?random=6`,
    categories: ["Technology"],
  },
  {
    src: `https://loremflickr.com/600/600?random=7`,
    categories: ["Nature"],
  },
  {
    src: `https://loremflickr.com/600/600?random=8`,
    categories: ["Technology"],
  },
]

const ProgressBar = ({ x, constraints }: RenderPropProps) => {
  const progress = useTransform(x, [constraints.right, constraints.left], [0, 1])
  return (
    <div className="relative mx-10 mt-8 h-1 overflow-hidden rounded bg-slate-500">
      <motion.div
        className="absolute inset-0 origin-left scale-x-0 bg-red-500"
        style={{
          scaleX: useSpring(progress, { damping: 100, stiffness: 1000 }),
        }}
      />
    </div>
  )
}

const NavButtons = ({ x, boundingBox, itemCount, gap, constraints }: RenderPropProps) => {
  const totalGap = gap * (itemCount - 1)
  const itemWith = (boundingBox.width - totalGap) / itemCount + gap
  const [offset, setOffset] = useState(0)

  const paginate = (val: number) => {
    const isAnimating = x.isAnimating()
    const newX = offset + val
    if (!isAnimating) {
      void animate(x, clamp(newX, [constraints.left, constraints.right]), {
        type: "spring",
        bounce: 0,
      })
      setOffset(offset + val)
    }
  }
  return (
    <>
      <button
        className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-slate-500 text-white"
        onClick={() => paginate(itemWith)}
        disabled={offset === constraints.right}
      >
        <GoChevronLeft />
      </button>
      <button
        className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-slate-500 text-white"
        onClick={() => paginate(-itemWith)}
        disabled={offset <= constraints.left}
      >
        <GoChevronRight />
      </button>
    </>
  )
}

const CategoriesContext = createContext<{ category: string }>({
  category: "Nature",
})

const CategoriesContextProvider = ({
  children,
}: {
  children: (category: string) => JSX.Element
}) => {
  const [category, setCategory] = useState("Nature")

  return (
    <CategoriesContext.Provider value={{ category }}>
      <div className="my-5 flex items-center justify-center gap-5 text-xl">
        <button
          onClick={() => setCategory("Nature")}
          className={cn("px-4 py-2", category === "Nature" ? "text-red-500" : "text-black")}
        >
          Nature
        </button>
        <button
          onClick={() => setCategory("Technology")}
          className={cn("px-4 py-2", category === "Technology" ? "text-red-500" : "text-black")}
        >
          Technology
        </button>
      </div>
      {children(category)}
    </CategoriesContext.Provider>
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
  gap: 20,
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

export const WithNavigation: Story = {
  args: {
    ...args,
    renderAfter: (props) => <NavButtons {...props} />,
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

export const WithNavigationAndProgress: Story = {
  args: {
    ...args,
    renderAfter: (props) => (
      <>
        <NavButtons {...props} />
        <ProgressBar {...props} />
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

export const WithContextProvider: Story = {
  args: {
    ...args,
  },
  decorators: [
    (Story, ctx) => (
      <CategoriesContextProvider>
        {(category) => {
          const filteredImages = imagesWithContext.filter((image) =>
            image.categories.includes(category)
          )
          return (
            <Story
              {...ctx}
              args={{
                ...args,
                children: filteredImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.src}
                    draggable={false}
                    alt=""
                    style={{ width: "100%" }}
                  />
                )),
              }}
            />
          )
        }}
      </CategoriesContextProvider>
    ),
  ],
}

// Parallax
