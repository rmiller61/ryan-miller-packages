import cn from "@social-hustle/utils-classnames"
import { useDimensions } from "@social-hustle/utils-hooks"
import {
  motion,
  useMotionValue,
  type MotionValue,
  type DraggableProps,
  useMotionValueEvent,
} from "framer-motion"
import { Children, useState } from "react"
import { useWindowSize } from "react-use"

export interface RenderPropProps {
  x: MotionValue
  boundingBox: DOMRectReadOnly
}

type RenderProp = (props: RenderPropProps) => JSX.Element

export interface GridCarouselProps {
  children: JSX.Element[]
  wrapperClassName?: string
  itemClassName?: string
  className?: string
  renderBefore?: RenderProp
  renderAfter?: RenderProp
  dragProps?: Omit<DraggableProps, "drag">
  calculateConstraints?: ({ width, windowWidth }: { width: number; windowWidth: number }) => {
    left: number
    right: number
  }
}

export const Grid = ({
  children,
  wrapperClassName,
  itemClassName,
  className,
  renderAfter,
  renderBefore,
  dragProps,
  calculateConstraints,
}: GridCarouselProps) => {
  const x = useMotionValue(0)
  const items = Children.toArray(children)
  //console.log(x.isAnimating())

  const [ref, boundingBox] = useDimensions<HTMLDivElement>()

  const [dragging, setDragging] = useState(false)

  const { width: windowWidth } = useWindowSize()

  return (
    <>
      {renderBefore && renderBefore({ x, boundingBox })}
      <div
        data-dragging={dragging}
        className={cn(
          "group flex flex-nowrap overflow-hidden data-[dragging=false]:cursor-grab data-[dragging=true]:cursor-grabbing",
          wrapperClassName
        )}
      >
        <motion.div
          {...dragProps}
          ref={ref}
          drag="x"
          style={{ x }}
          className={cn("grid auto-cols-[1fr] grid-flow-col", className)}
          onDragStart={() => setDragging(true)}
          onDragEnd={() => setDragging(false)}
          dragConstraints={
            calculateConstraints
              ? calculateConstraints({ width: boundingBox.width, windowWidth })
              : dragProps?.dragConstraints
          }
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
      {renderAfter && renderAfter({ x, boundingBox })}
    </>
  )
}
