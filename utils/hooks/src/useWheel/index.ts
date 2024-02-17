/**
 * Yes this is blatantly copied from https://github.com/dipeshrai123/react-ui-animate/blob/v2.0.0/src/gestures/hooks/useWheel.ts
 * Deal with it.
 */

import type { UseWheelCallback } from "./types"
import { WheelGesture } from "./wheelGesture"
import * as React from "react"

export function useWheel<T extends HTMLElement>(callback: UseWheelCallback) {
  const gesture = React.useRef(new WheelGesture()).current

  return useRecognizer<T>([gesture, callback])
}

type UseRecognizerHandlerType = [gesture: WheelGesture, callback: UseWheelCallback]

export const useRecognizer = <T extends HTMLElement>(handler: UseRecognizerHandlerType) => {
  const ref = React.useRef<T | null>(null)
  const elementRefs = React.useRef<Array<any>>([])
  const subscribers = React.useRef<Map<string, { gesture: WheelGesture; unsubscribe: any }>>(
    new Map()
  ).current

  // re-initiate callback on change
  React.useEffect(() => {
    for (let [, { gesture }] of subscribers.entries()) {
      const [, callback] = handler
      gesture.applyCallback(callback)
    }
  }, [handler])

  React.useEffect(() => {
    const [gesture, callback] = handler
    subscribers.set("wheel", {
      gesture,
      unsubscribe: gesture.applyGesture({
        targetElement: ref.current,
        targetElements: elementRefs.current,
        callback,
      }),
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
