import type { VisibleItems } from "../types"
import { getCurrentBreakpoint } from "../utils"
import { useWindowSize } from "react-use"

export const useVisibleItems = (visibleItems: VisibleItems): number => {
  const { width: windowWidth } = useWindowSize()

  /** Return early if we already have a number */
  if (typeof visibleItems === "number") return visibleItems

  if (!visibleItems.get(0)) {
    visibleItems.set(0, 1)
  }

  const visibleItemsArray = Array.from(visibleItems.keys()).sort((a, b) => a - b)

  return visibleItems.get(getCurrentBreakpoint(visibleItemsArray, windowWidth)) ?? 1
}
