import { CarouselContextProvider } from "../common/context"
import type { CarouselProps } from "../common/types"
import { arrayFromNumber } from "@social-hustle/utils-arrays"
import cn from "@social-hustle/utils-classnames"
import { useDimensions } from "@social-hustle/utils-hooks"
import { getMin, getMax, clamp } from "@social-hustle/utils-numbers"
import type { PanInfo } from "framer-motion"
import {
  animate,
  motion,
  type ValueAnimationTransition,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion"
import { Children, useEffect, useState, useMemo, type CSSProperties, useReducer } from "react"
import { useWindowSize } from "react-use"

const getCurrentBreakpoint = (arr: number[], windowWidth: number) => {
  let breakpoint = 0

  for (let i = 0; i < arr.length; i++) {
    // Set `current` to the window width we are currently evaluating
    let current = arr[i]
    // If 1. `current` is defined` and 2. `current` is less than the window width
    if (current && windowWidth >= current) {
      breakpoint = current
    }
  }

  return breakpoint
}

export const useVisibleItems = (visibleItems: VisibleItems): number => {
  const { width: windowWidth } = useWindowSize()

  /** Return early if we already have a number */
  if (typeof visibleItems === "number") return visibleItems

  /** Otherwise, we have an array of breakpoints */
  const breakpoints = Object.keys(visibleItems).map(Number)

  /** Sort the breakpoints in ascending order */
  breakpoints.sort((a, b) => a - b)

  /** Get the current breakpoint */
  const breakpoint = getCurrentBreakpoint(breakpoints, windowWidth)

  /** Return the number of visible items for the current breakpoint */
  const visibleItemCount = visibleItems[breakpoint]

  /** Return 1 if we don't have a visible item count */
  return visibleItemCount || 1
}

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

/** Either a single static number or an object mapping breakpoints and numbers */
export type VisibleItems = number | Record<number, number>

interface RenderPropProps {
  setPage: (page: number) => void
  page: number
}

type RenderProp = (props: RenderPropProps) => JSX.Element

interface CarouselItemComponentProps {
  /** Width of the carousel item as a percentage */
  width: number
  className?: string
}

interface CarouselItemProps extends CarouselItemComponentProps {
  index: number
  renderPage: (props: { index: number }) => JSX.Element
}

const CarouselItem = ({ index, renderPage, width, className }: CarouselItemProps) => {
  const child = useMemo(() => renderPage({ index }), [index, renderPage])

  // Ensure width will be a valid percentage
  const itemWidth = clamp(width, [1, 100])

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        width: `${itemWidth}%`,
        height: "100%",
        //x,
        // Offset each item to center the carousel
        left: `${(index + 1) * itemWidth}%`,
        //right: `${index * 100}%`,
      }}
      //draggable
      //drag="x"
      //dragElastic={0}
      //onDragEnd={onDragEnd}
    >
      {child}
    </div>
  )
}

const Virtualizer = ({
  range,
  children,
  index,
  itemProps,
}: {
  children: (props: { index: number }) => JSX.Element
  index: number
  range: number[]
  itemProps: CarouselItemComponentProps
}) => {
  return (
    <>
      {range.map((rangeValue) => {
        return (
          <CarouselItem
            {...itemProps}
            key={rangeValue + index}
            index={rangeValue + index}
            renderPage={children}
          />
        )
      })}
    </>
  )
}

export interface InfiniteCarouselProps extends CarouselProps {
  /** Number of items that should be shown within the carousel bounds */
  visibleItems?: VisibleItems
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
  height: number | string
  renderBefore?: RenderProp
  renderAfter?: RenderProp
}

interface State {
  dragging: boolean
  page: number
  animating: boolean
}

type Action =
  | {
      type: "SET_DRAGGING"
      dragging: boolean
    }
  | {
      type: "SET_PAGE"
      page: number
    }
  | {
      type: "SET_ANIMATING"
      animating: boolean
    }

export const InfiniteCarousel = ({
  children,
  className = "",
  wrapperClassName = "",
  itemClassName = "",
  visibleItems = 2,
  transition = {
    type: "spring",
    bounce: 0,
  },
  swipePowerThreshold = 10000,
  swipeThreshold = 0.9,
  moveBy = 1,
  renderAfter,
  renderBefore,
  height,
  dragProps,
}: InfiniteCarouselProps) => {
  const x = useMotionValue(0)
  const childrenArray = Children.toArray(children)
  const childCount = Children.count(children)

  const visibleItemsNumber = useVisibleItems(visibleItems)
  const [{ page, dragging, animating }, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case "SET_DRAGGING":
          return {
            ...state,
            dragging: action.dragging,
          }
        case "SET_PAGE":
          return {
            ...state,
            page: action.page,
          }
        default:
          return state
      }
    },
    {
      dragging: false,
      page: 0,
      animating: false,
    }
  )

  const setDragging = (dragging: boolean) => dispatch({ type: "SET_DRAGGING", dragging })
  const setPage = (page: number) => dispatch({ type: "SET_PAGE", page })
  const setAnimating = (animating: boolean) => dispatch({ type: "SET_ANIMATING", animating })

  //console.log(page)

  /**
   * Create a range of numbers from -visibleItems/2 to visibleItems/2
   * Create an array created from the # of children provided
   */
  const visualRange = arrayFromNumber(childCount)

  // Note: these are offset by 1 to account for the fact that the first index will be 0

  const prepend = arrayFromNumber(moveBy).map((i) => getMin(visualRange) - i - 1)

  const append = arrayFromNumber(moveBy).map((i) => getMax(visualRange) + i + 1)

  /**
   * Append/prepend items outside the visual range of the carousel
   * to create a smooth transition when dragging.
   */
  const visualRangeWithDuplicates = [...visualRange, ...prepend, ...append].sort((a, b) => a - b)

  const offsetVisualRangeWithDuplicates = visualRangeWithDuplicates.map(
    (i) => i - Math.floor(visibleItemsNumber / 2)
  )

  const [ref, { width }] = useDimensions<HTMLDivElement>()

  /** Pixel value to translate the carousel */
  const moveByPx = width / visibleItemsNumber

  const calculateNewX = () => {
    const val = -page * moveByPx
    return val
  }

  const calculateDragConstraints = () => {
    const left = (page + moveBy) * -moveByPx
    const right = (page - moveBy) * -moveByPx
    return { left, right }
  }

  const handleEndDrag = (e: Event, dragProps: PanInfo) => {
    const isAnimating = x.isAnimating()
    const { offset, velocity } = dragProps
    const swipe = swipePower(offset.x, velocity.x)

    const swipePxThreshold = moveByPx * clamp(swipeThreshold, [0, 1])

    //setDragging(false)

    //if (isAnimating) return

    // If dragging RTL
    if (offset.x < -swipePxThreshold || swipe < -swipePowerThreshold) {
      setPage(page + moveBy)
      // If dragging LTR
    } else if (offset.x > swipePxThreshold || swipe > swipePowerThreshold) {
      setPage(page - moveBy)
    } else {
      void animate(x, calculateNewX(), transition)
    }
  }

  useEffect(() => {
    const controls = animate(x, calculateNewX(), transition)
    return controls.stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, width])

  const isDisabled = childCount < visibleItemsNumber || animating

  const renderProps: RenderPropProps = {
    setPage,
    page,
  }
  const carouselHeight = typeof height === "number" ? `${height}px` : height

  useMotionValueEvent(x, "animationStart", () => setAnimating(true))
  useMotionValueEvent(x, "animationComplete", () => setAnimating(false))

  return (
    <CarouselContextProvider
      dragging={dragging}
      x={x}
    >
      {renderBefore && renderBefore(renderProps)}
      <div
        data-dragging={dragging}
        style={
          {
            "--carousel-height": carouselHeight,
          } as CSSProperties
        }
        className={cn(
          "h-[var(--carousel-height)] w-full overflow-hidden data-[dragging=false]:cursor-grab data-[dragging=true]:cursor-grabbing",
          wrapperClassName
        )}
      >
        <motion.div
          ref={ref}
          className={cn("relative h-full w-full", className)}
          draggable={!isDisabled}
          drag={isDisabled ? false : "x"}
          dragElastic={0}
          onDragEnd={handleEndDrag}
          //onDragStart={() => setDragging(true)}
          style={{
            x,
          }}
          dragConstraints={calculateDragConstraints()}
        >
          <Virtualizer
            index={page}
            range={offsetVisualRangeWithDuplicates}
            itemProps={{
              className: itemClassName,
              width: 100 / visibleItemsNumber,
            }}
          >
            {({ index }) => {
              const modulo = index % childCount
              const imageIndex = modulo < 0 ? childCount + modulo : modulo
              //console.log(childrenArray[imageIndex])
              return <>{childrenArray[imageIndex]}</>
            }}
          </Virtualizer>
        </motion.div>
      </div>
      {renderAfter && renderAfter(renderProps)}
    </CarouselContextProvider>
  )
}
