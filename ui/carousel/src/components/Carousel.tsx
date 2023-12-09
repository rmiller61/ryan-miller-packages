import { useVisibleItems } from "../hooks/useVisibleItems"
import { useVisualRange } from "../hooks/useVisualRange"
import type { CarouselProps } from "../types"
import { swipePower } from "../utils"
import { Virtualizer } from "./Virtualizer"
import cn from "@social-hustle/utils-classnames"
import { useDimensions } from "@social-hustle/utils-hooks"
import { getMin, getMax, clamp } from "@social-hustle/utils-numbers"
import type { PanInfo } from "framer-motion"
import { animate, motion, MotionStyle, useMotionValue } from "framer-motion"
import { Children, useEffect, useState, type CSSProperties } from "react"

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
  controls,
  infinite = false,
  height,
  ...props
}: CarouselProps) {
  const x = useMotionValue(0)
  const childrenArray = Children.toArray(children)
  const childCount = Children.count(children)

  const visibleItemsNumber = useVisibleItems(visibleItems)

  const moveBy = props.moveBy ?? visibleItemsNumber

  const offsetVisualRangeWithDuplicates = useVisualRange({
    childCount,
    moveBy,
    isInfinite: infinite,
  }).map((i) => i - Math.floor(visibleItemsNumber / 2))

  const [ref, { width }] = useDimensions<HTMLDivElement>()
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

  const carouselHeight = typeof height === "number" ? `${height}px` : height

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
          page,
          pageCount: childCount,
          isFirst: page === 0,
          isLast: page === childCount - 1,
        })}
      <div
        className={cn("carouselWrapper", wrapperClassName)}
        style={
          {
            "--carousel-height": carouselHeight,
          } as CSSProperties
        }
      >
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
          //onDrag={(event, info) => console.log({ event, info })}
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
          page,
          pageCount: childCount,
          isFirst: page === 0,
          isLast: page === childCount - 1,
        })}
    </>
  )
}
