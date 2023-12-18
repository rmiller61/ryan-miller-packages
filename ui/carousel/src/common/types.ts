import { type DraggableProps } from "framer-motion"

export type CarouselRenderProps<T> = (props: T) => JSX.Element

export interface CarouselProps<TRenderProps extends Record<string, any>> {
  /**
   * Classname of the div element wrapping the carousel,
   */
  wrapperClassName?: string
  /**
   * Classname of the div element wrapping the carousel items
   */
  itemClassName?: string
  /**
   * Classname of the motion.div carousel element.
   */
  className?: string
  /**
   * Framer Motion Draggable props, excluding `drag` and `dragConstraints`:
   * - `drag` is limited to "x" (default) or false (if `draggable` is false)
   * - `dragConstraints` is handled internally
   */
  dragProps?: Omit<DraggableProps, "drag" | "dragConstraints">
  /**
   * The `children` prop is used to render the carousel items,
   * type is enforced to be an array of JSX elements.
   */
  children: JSX.Element[]
  /**
   * Whether the carousel should be draggable or not
   * @default true
   */
  draggable?: boolean
  /** Render a component (such as nav buttons) before the carousel */
  renderBefore?: CarouselRenderProps<TRenderProps>
  /** Render a component (such as nav buttons) after the carousel */
  renderAfter?: CarouselRenderProps<TRenderProps>
}
