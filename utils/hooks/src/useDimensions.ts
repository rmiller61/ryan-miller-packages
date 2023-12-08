import { useResizeObserver } from "./useResizeObserver"
import { useState } from "react"

export function useDimensions<T extends HTMLElement>() {
  const [node, setNode] = useState<T | null>(null)
  const [dimensions, setDimensions] = useState<DOMRectReadOnly>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    toJSON: () => "",
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  })
  const ref = (node: T) => {
    setNode(node)
  }
  useResizeObserver(node, () => {
    if (node) {
      setDimensions(node.getBoundingClientRect())
    }
  })
  return [ref, dimensions] as const
}
