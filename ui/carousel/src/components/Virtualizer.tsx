import type { VirtualizerProps } from "../types"
import { Item } from "./Item"
import type { FunctionComponent } from "react"

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
