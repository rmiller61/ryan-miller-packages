import { type DraggableProps } from "framer-motion"

export interface CarouselProps {
  wrapperClassName?: string
  itemClassName?: string
  className?: string
  dragProps?: Omit<DraggableProps, "drag" | "dragConstraints">
  children: JSX.Element[]
}
