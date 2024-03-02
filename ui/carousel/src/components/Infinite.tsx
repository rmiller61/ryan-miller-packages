import { CarouselContextProvider } from "../common/context"
import type { CarouselProps } from "../common/types"
import { getSwipePower } from "../common/utils"
import { arrayFromNumber } from "@social-hustle/utils-arrays"
import cn from "@social-hustle/utils-classnames"
import { useDimensions } from "@social-hustle/utils-hooks"
import { getMin, getMax, clamp, wrap } from "@social-hustle/utils-numbers"
import type { PanInfo } from "framer-motion"
import { animate, motion, useMotionValue, useMotionValueEvent } from "framer-motion"
import { Children, useEffect, useMemo, type CSSProperties, useReducer } from "react"
import { useWindowSize, usePrevious } from "react-use"
import { useDebouncedCallback } from "use-debounce"

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

/** Either a single static number or an object mapping breakpoints and numbers */
export type VisibleItems = number | Record<number, number>

interface RenderPropProps {
  setPage: (page: number) => void
  page: number
}
export interface InfiniteCarouselProps extends CarouselProps<RenderPropProps> {
  /**
   * Whether the carousel should be centered
   */
  centered?: boolean
  /** Number of items that should be shown within the carousel bounds */
  visibleItems?: VisibleItems
  /** Px value that needs to be exceeded to swipe.
   * TODO: Why is the default value 10000?
   */
  swipePowerThreshold?: number
  /** Integer between 0 and 1 denoting how much the drag offset has to satisfy the itemWidth value for a swipe to occur
   * E.g. given a itemWidth of 500 and a swipeThreshold of 0.5, the drag offset has to be >= 250px to trigger a swipe
   */
  swipeThreshold?: number
  /**
   * Number of carousel items to translate on a swipe
   * @default 1
   */
  moveBy?: number
  /** Value to debounce the drag transition by.
   * E.g. if debounceBy is 200, the carousel will debounce the drag transition by 200ms.
   * NOTE: this is only used when dragging the carousel, not when controlling the carousel via the setPage function.
   * @default 200
   */
  debounceBy?: number
  /** The starting page/index. Defaults to 0 */
  startAt?: number
}

interface State {
  dragging: boolean
  page: number
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

export const InfiniteCarousel = ({
  children,
  className = "",
  wrapperClassName = "",
  itemClassName = "",
  visibleItems = 2,
  swipePowerThreshold = 10000,
  swipeThreshold = 0.9,
  moveBy = 1,
  renderAfter,
  renderBefore,
  dragProps,
  debounceBy = 200,
  draggable = true,
  startAt = 0,
  centered = false,
}: InfiniteCarouselProps) => {
  const childrenArray = Children.toArray(children)
  const childCount = Children.count(children)

  const [ref, { width }] = useDimensions<HTMLDivElement>()

  const visibleItemsNumber = useVisibleItems(visibleItems)
  const itemWidth = width / visibleItemsNumber

  /**
   * If `centered: true`, items should be offset so the carousel is centered
   */
  const offsetFactor = centered ? Math.floor(visibleItemsNumber / 2) : 0

  /**
   * Calculate `offsetFactor` by `itemWidth` to get the value in px
   */
  const offset = offsetFactor * itemWidth

  const [{ page, dragging }, dispatch] = useReducer(
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
            dragging: false,
          }
        default:
          return state
      }
    },
    {
      dragging: false,
      page: startAt,
    }
  )

  const prepend = arrayFromNumber(visibleItemsNumber).map((i) => 0 - i - 1)

  const append = arrayFromNumber(visibleItemsNumber).map((i) => childCount + i)

  const loopedChildren = useMemo(() => {
    const childMap = new Map<number, React.ReactNode>()

    childrenArray.forEach((child, index) => {
      childMap.set(index, child)
    })

    prepend.reverse().forEach((i) => {
      const modulo = wrap(i, [0, childCount])
      childMap.set(i, childrenArray[modulo])
    })

    append.forEach((i) => {
      const modulo = wrap(i, [0, childCount])
      childMap.set(i, childrenArray[modulo])
    })

    return Array.from(childMap).sort((a, b) => a[0] - b[0])
  }, [childrenArray])

  const x = useMotionValue(0)

  const setDragging = (dragging: boolean) => dispatch({ type: "SET_DRAGGING", dragging })

  /**
   * Minimum `page` value. When `page` reaches this value, the carousel will loop on the left side.
   */
  const minPage = -visibleItemsNumber + offsetFactor

  /**
   * Maximum `page` value. When `page` reaches this value, the carousel will loop on the right side.
   */
  const maxPage = childCount - offsetFactor

  const setPage = (page: number) => {
    dispatch({ type: "SET_PAGE", page })
  }

  const setAnimation = async (value: number) => {
    const animateTo = -value * itemWidth
    return await animate(x, animateTo)
  }

  const translateCarousel = (newPageNumber: number) => {
    setPage(newPageNumber)
    const newWrappedPageNumber = wrap(newPageNumber, [0, childCount])
    void setAnimation(newPageNumber).then(() => {
      if (newPageNumber !== newWrappedPageNumber) {
        x.set(-newWrappedPageNumber * itemWidth)
        setPage(newWrappedPageNumber)
      }
      /**if (newPageNumber === maxPage) {
        console.log("max")
        x.set(0)
        setPage(0)
      }
      if (newPageNumber === minPage) {
        console.log("min")
        const resetToPage = childCount - visibleItemsNumber
        x.set(-resetToPage * itemWidth)
        setPage(resetToPage)
      }**/
    })
  }

  const calculateDragConstraints = () => {
    const left = (page + moveBy) * -itemWidth
    const right = (page - moveBy) * -itemWidth
    return { left, right }
  }

  /**
   * The threshold in pixels that needs to be exceeded to trigger a `swipe`, which will move the carousel to the next page.
   * This is calculated by multiplying the `itemWidth` value by the `swipeThreshold` prop.
   * E.g. if `itemWidth` is 500 and `swipeThreshold` is 0.5, the `swipePxThreshold` will be 250.
   * This means that the user has to drag the carousel by >= 250px to trigger a swipe.
   */
  const swipePxThreshold = itemWidth * clamp(swipeThreshold, [0, 1])

  const calculatePage = (offsetX: number) => {
    const newPage = Math.round(offsetX / -itemWidth) + page
    return clamp(newPage, [minPage, maxPage])
  }

  const handleEndDrag = useDebouncedCallback(
    (e: Event, dragProps: PanInfo) => {
      const { offset, velocity } = dragProps
      const swipePower = getSwipePower(offset.x, velocity.x)

      const translateTo = calculatePage(offset.x)

      // If dragging RTL
      if (offset.x < -swipePxThreshold || swipePower < -swipePowerThreshold) {
        translateCarousel(translateTo)

        // If dragging LTR
      } else if (offset.x > swipePxThreshold || swipePower > swipePowerThreshold) {
        translateCarousel(translateTo)
      } else {
        setDragging(false)
        // If the user didn't drag far enough to trigger a swipe, animate the carousel back to original position
        void setAnimation(page)
      }
    },
    debounceBy,
    {
      leading: true,
    }
  )

  const handleDragStart = () => {
    setDragging(true)
  }

  const shiftItemsBy = -itemWidth * prepend.length + offset

  const isDisabled = childCount < visibleItemsNumber || !draggable

  const renderProps: RenderPropProps = {
    setPage: translateCarousel,
    page,
  }

  /**
   * If width changes, reset the page to the startAt value.
   */
  useEffect(() => {
    translateCarousel(startAt)
  }, [startAt, width])

  useMotionValueEvent(x, "change", (latest) => {
    const pageNumber = Math.round(latest / -itemWidth)
    const wrappedPage = wrap(pageNumber, [0, childCount])
    console.log({ wrappedPage })
  })

  return (
    <CarouselContextProvider
      dragging={dragging}
      x={x}
      enabled={!isDisabled}
    >
      {renderBefore && renderBefore(renderProps)}
      <div
        data-dragging={dragging}
        style={
          {
            "--item-width": `${itemWidth}px`,
            "--item-shift": `${shiftItemsBy}px`,
          } as CSSProperties
        }
        className={cn(
          "w-full overflow-hidden",
          !isDisabled && "data-[dragging=false]:cursor-grab data-[dragging=true]:cursor-grabbing",
          wrapperClassName
        )}
      >
        <motion.div
          {...dragProps}
          ref={ref}
          dragDirectionLock
          className={cn(
            "relative left-[var(--item-shift)] flex h-full w-full flex-nowrap items-stretch justify-start",
            className
          )}
          draggable={!isDisabled}
          drag={isDisabled ? false : "x"}
          dragElastic={0}
          onDragEnd={handleEndDrag}
          onDragStart={handleDragStart}
          //onDrag={(event, info) => console.log({ event, info })}
          style={{
            x,
          }}
          //dragConstraints={calculateDragConstraints()}
        >
          {loopedChildren.map(([i, child], index) => {
            return (
              <div
                data-index={i}
                className={cn("w-[var(--item-width)] shrink-0", itemClassName)}
                key={index}
              >
                {child}
              </div>
            )
          })}
        </motion.div>
      </div>
      {renderAfter && renderAfter(renderProps)}
    </CarouselContextProvider>
  )
}
