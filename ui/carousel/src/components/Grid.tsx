import { CarouselContextProvider } from "../common/context"
import type { CarouselProps } from "../common/types"
import cn from "@social-hustle/utils-classnames"
import { useDimensions, useResizeObserver } from "@social-hustle/utils-hooks"
import type { MotionValue } from "framer-motion"
import { motion, useMotionValue, type DraggableProps } from "framer-motion"
import { Children, useState, type CSSProperties } from "react"
import { useWindowSize } from "react-use"

export interface RenderPropProps {
  x: MotionValue
  boundingBox: DOMRectReadOnly
  itemCount: number
  gap: number
  constraints: XConstraints
  enabled: boolean
}

type XConstraints = Pick<DOMRectReadOnly, "left" | "right">

export interface GridCarouselProps extends CarouselProps<RenderPropProps> {
  /**
   *
   * Function that returns the x-axis constraints for the carousel.
   * @default ({ width, windowWidth }) => ({ left: windowWidth - width, right: 0 })
   */
  calculateConstraints?: ({
    width,
    windowWidth,
  }: {
    width: number
    windowWidth: number
  }) => XConstraints
  /**
   *
   * The gap between each item in the grid.
   * @default 0
   */
  gap?: number
  /**
   *
   * Whether or not to reset the carousel when the window resizes.
   * @default false
   */
  resetOnResize?: boolean
  /**
   * Disable the carousel when the width of the carousel is less than the width of the window,
   * i.e. when the carousel does not overflow.
   * @default true
   */
  disableOnInsufficientWidth?: boolean
}

export const GridCarousel = ({
  children,
  wrapperClassName,
  itemClassName,
  className,
  renderAfter,
  renderBefore,
  dragProps,
  gap = 0,
  calculateConstraints = ({ width, windowWidth }) => ({
    left: windowWidth - width,
    right: 0,
  }),
  resetOnResize = false,
  draggable = true,
  disableOnInsufficientWidth = true,
}: GridCarouselProps) => {
  const x = useMotionValue(0)
  const items = Children.toArray(children)

  const [ref, boundingBox, node] = useDimensions<HTMLDivElement>()

  const [dragging, setDragging] = useState(false)

  const { width: windowWidth } = useWindowSize()

  const constraints = calculateConstraints({ width: boundingBox.width, windowWidth })

  const enabled = disableOnInsufficientWidth && boundingBox.width <= windowWidth ? false : draggable

  const renderProps: RenderPropProps = {
    x,
    boundingBox,
    itemCount: items.length,
    constraints,
    gap,
    enabled,
  }

  useResizeObserver(node, () => {
    if (resetOnResize) {
      x.set(0)
    }
  })

  return (
    <CarouselContextProvider
      dragging={dragging}
      x={x}
    >
      {renderBefore && renderBefore(renderProps)}
      <div
        data-dragging={dragging}
        className={cn(
          "group flex flex-nowrap overflow-hidden",
          dragging && "data-[dragging=false]:cursor-grab data-[dragging=true]:cursor-grabbing",
          wrapperClassName
        )}
        style={
          {
            "--gap": `${gap}px`,
          } as CSSProperties
        }
      >
        <motion.div
          {...dragProps}
          ref={ref}
          draggable={enabled}
          drag={enabled ? "x" : false}
          style={{ x }}
          className={cn("grid auto-cols-[1fr] grid-flow-col gap-[var(--gap)]", className)}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
          dragConstraints={calculateConstraints({ width: boundingBox.width, windowWidth })}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={itemClassName}
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>
      {renderAfter && renderAfter(renderProps)}
    </CarouselContextProvider>
  )
}
