/**
 * Yes this is blatantly copied from https://github.com/dipeshrai123/react-ui-animate/blob/v2.0.0/src/gestures/hooks/useWheel.ts
 * Deal with it.
 */

import type { UseWheelCallback } from "./types"
import { WheelGesture } from "./wheelGesture"
import * as React from "react"

export function useWheel(callback: UseWheelCallback) {
  const gesture = React.useRef(new WheelGesture()).current

  return useRecognizer([["wheel", gesture, callback]])
}

type UseRecognizerHandlerType = Array<
  [key: "drag" | "wheel" | "move" | "scroll", gesture: any, callback: any, config?: any]
>

export const useRecognizer = (handlers: UseRecognizerHandlerType) => {
  const ref = React.useRef<any>()
  const elementRefs = React.useRef<Array<any>>([])
  const subscribers = React.useRef<
    Map<string, { keyIndex: number; gesture: any; unsubscribe: any }>
  >(new Map()).current

  // re-initiate callback on change
  React.useEffect(() => {
    for (let [, { keyIndex, gesture }] of subscribers.entries()) {
      const [, , callback] = handlers[keyIndex]!
      gesture.applyCallback(callback)
    }
  }, [handlers])

  React.useEffect(() => {
    handlers.forEach(([key, gesture, callback, config], keyIndex) => {
      subscribers.set(key, {
        keyIndex,
        gesture,
        unsubscribe: gesture.applyGesture({
          targetElement: ref.current,
          targetElements: elementRefs.current,
          callback,
          config,
        }),
      })
    })

    return () => {
      for (let [, { unsubscribe }] of subscribers.entries()) {
        unsubscribe && unsubscribe()
      }
    }
  }, [])

  return (index?: number) => {
    if (index === null || index === undefined) {
      return { ref }
    } else {
      elementRefs.current[index] = elementRefs.current[index] || React.createRef()

      return { ref: elementRefs.current[index] }
    }
  }
}
