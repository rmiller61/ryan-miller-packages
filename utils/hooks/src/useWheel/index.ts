/**
 * Yes this is blatantly copied from https://github.com/dipeshrai123/react-ui-animate/blob/v2.0.0/src/gestures/hooks/useWheel.ts
 * Deal with it.
 */

import type { UseWheelCallback } from "./types"
import { WheelGesture } from "./wheelGesture"
import * as React from "react"

type UseRecognizerHandlerType = [gesture: WheelGesture, callback: UseWheelCallback]

export function useWheel<T extends HTMLElement>(callback: UseWheelCallback) {
  const ref = React.useRef<T | null>(null)
  const gesture = React.useRef(new WheelGesture()).current
  const handler: UseRecognizerHandlerType = [gesture, callback]

  // re-initiate callback on change
  React.useEffect(() => {
    const [gesture, callback] = handler
    gesture.applyCallback(callback)
    const unsubscribe = gesture.applyGesture({
      targetElement: ref.current,
      callback,
    })

    return () => {
      unsubscribe && unsubscribe()
    }
  }, [handler])

  return () => {
    return { ref }
  }
}
