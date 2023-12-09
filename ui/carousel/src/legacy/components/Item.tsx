import type { CarouselItemProps } from "../types"
import cn from "@social-hustle/utils-classnames"
import { clamp } from "@social-hustle/utils-numbers"
import type { FunctionComponent } from "react"
import React from "react"

export const Item: FunctionComponent<CarouselItemProps> = ({
  index,
  renderPage,
  width,
  className,
}) => {
  const child = React.useMemo(() => renderPage({ index }), [index, renderPage])

  // Ensure width will be a valid percentage
  const itemWidth = clamp(width, [1, 100])

  return (
    <div
      className={cn("carouselItem", className)}
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
