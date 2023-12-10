import cn from "@social-hustle/utils-classnames"
import { useDimensions } from "@social-hustle/utils-hooks"
import {
  motion,
  useMotionValue,
  type MotionValue,
  type DraggableProps,
  useMotionValueEvent,
} from "framer-motion"
import { Children, useState, type CSSProperties } from "react"
import { useWindowSize } from "react-use"

export interface RenderPropProps {
  x: MotionValue
  boundingBox: DOMRectReadOnly
  itemCount: number
  gap: number
  constraints: XConstraints
}

type RenderProp = (props: RenderPropProps) => JSX.Element

type XConstraints = Pick<DOMRectReadOnly, "left" | "right">

export interface GridCarouselProps {
  children: JSX.Element[]
  wrapperClassName?: string
  itemClassName?: string
  className?: string
  renderBefore?: RenderProp
  renderAfter?: RenderProp
  dragProps?: Omit<DraggableProps, "drag" | "dragConstraints">
  calculateConstraints?: ({
    width,
    windowWidth,
  }: {
    width: number
    windowWidth: number
  }) => XConstraints
  gap?: number
}

export const Grid = ({
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
}: GridCarouselProps) => {
  const x = useMotionValue(0)
  const items = Children.toArray(children)

  const [ref, boundingBox] = useDimensions<HTMLDivElement>()

  const [dragging, setDragging] = useState(false)

  const { width: windowWidth } = useWindowSize()

  const constraints = calculateConstraints({ width: boundingBox.width, windowWidth })

  const renderProps: RenderPropProps = {
    x,
    boundingBox,
    itemCount: items.length,
    constraints,
    gap,
  }

  return (
    <>
      {renderBefore && renderBefore(renderProps)}
      <div
        data-dragging={dragging}
        className={cn(
          "group flex flex-nowrap overflow-hidden data-[dragging=false]:cursor-grab data-[dragging=true]:cursor-grabbing",
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
          drag="x"
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
    </>
  )
}
