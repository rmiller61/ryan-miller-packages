import type { VirtualizerProps } from "../types"
import { Item } from "./Item"
import { animate, motion, MotionStyle, PanInfo, useMotionValue } from "framer-motion"
import type { FunctionComponent } from "react"
import { useEffect, useState } from "react"
import { useMeasure } from "react-use"

export const Virtualizer: FunctionComponent<VirtualizerProps> = ({
  range,
  children,
  index,
  itemProps,
}) => {
  return (
    <>
      {range.map((rangeValue) => {
        return (
          <Item
            {...itemProps}
            key={rangeValue + index}
            //x={x}
            //onDragEnd={handleEndDrag}
            index={rangeValue + index}
            renderPage={children}
          />
        )
      })}
    </>
  )
}
