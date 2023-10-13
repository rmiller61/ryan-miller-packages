import { useVisibleItems } from "../hooks/useVisibleItems"
import type { CarouselProps } from "../types"
import { swipePower } from "../utils"
import { Virtualizer } from "./Virtualizer"
import { arrayFromNumber } from "@social-hustle/utils-arrays"
import cn from "@social-hustle/utils-classnames"
import { getMin, getMax, clamp } from "@social-hustle/utils-numbers"
import type { PanInfo } from "framer-motion"
import { animate, motion, MotionStyle, useMotionValue } from "framer-motion"
import { Children, useEffect, useState, useRef } from "react"
import { useMeasure } from "react-use"

export default function Carousel({
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
  controls,
}: CarouselProps) {
  const x = useMotionValue(0)
  const childrenArray = Children.toArray(children)
  const childCount = Children.count(children)

  const visibleItemsNumber = useVisibleItems(visibleItems)

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

  const [ref, { width }] = useMeasure<HTMLDivElement>()
  const [page, setPage] = useState(0)

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
    const { offset, velocity } = dragProps
    const swipe = swipePower(offset.x, velocity.x)

    const swipePxThreshold = moveByPx * clamp(swipeThreshold, [0, 1])

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

  const isDisabled = childCount < visibleItemsNumber

  return (
    <>
      {controls &&
        controls.position === "before" &&
        controls.render({
          setPage: (val: number) => setPage(page + val),
        })}
      <div className={cn("carouselWrapper", wrapperClassName)}>
        <motion.div
          ref={ref}
          className={cn("carousel", className)}
          draggable={!isDisabled}
          drag={isDisabled ? false : "x"}
          dragElastic={0}
          onDragEnd={handleEndDrag}
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
      {controls &&
        controls.position === "after" &&
        controls.render({
          setPage: (val: number) => setPage(page + val),
        })}
    </>
  )
}
