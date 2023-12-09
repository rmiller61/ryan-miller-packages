import type { ValueAnimationTransition } from "framer-motion"
import { ValueAnimationOptions } from "framer-motion"

/** Either a single static number or a map of breakpoints and numbers */
export type VisibleItems = number | Record<number, number>

export interface CarouselOptions {
  /** Number of items that should be shown within the carousel bounds */
  visibleItems?: VisibleItems
  /** Class name to be applied to the carousel wrapper */
  wrapperClassName?: string
  /** Class name to be applied to the carousel */
  className?: string
  /** Class name to be applied to each carousel item */
  itemClassName?: string
  /** Motion transition options */
  transition?: ValueAnimationTransition<number>
  /** Px value that needs to be exceeded to swipe */
  swipePowerThreshold?: number
  /** Integer between 0 and 1 denoting how much the drag offset has to satisfy the moveByPx value for a swipe to occur
   * E.g. given a moveByPx of 500 and a swipeThreshold of 0.5, the drag offset has to be >= 250px to trigger a swipe
   */
  swipeThreshold?: number
  /** Number of carousel items to translate on a swipe */
  moveBy?: number
  controls?: CarouselControls
  /** Whether the carousel should loop infinitely */
  infinite?: boolean
  /** Whether the carousel should be draggable */
  draggable?: boolean
  height: number | string
}

type CarouselControlPosition = "before" | "after"

type CarouselControlProps = {
  setPage: (page: number) => void
}

type CarouselControls = {
  render: (props: CarouselControlProps) => JSX.Element
  position: CarouselControlPosition
}

export type CarouselProps = CarouselOptions & {
  children: JSX.Element[]
}

export type VirtualizerProps = {
  children: (props: { index: number }) => JSX.Element
  index: number
  range: number[]
  itemProps: CarouselItemComponentProps
}

export type CarouselItemProps = CarouselItemComponentProps & {
  index: number
  renderPage: (props: { index: number }) => JSX.Element
}

export type CarouselItemComponentProps = {
  /** Width of the carousel item as a percentage */
  width: number
  className?: string
}

export type CarouselStore = {
  /** Number of visible items, calculated from the same prop in CarouselOptions */
  visibleItems: number
  /** Width of the carousel DOM element */
  carouselWidth: number
  /** Width of each carousel item */
  itemWidth: number
}
