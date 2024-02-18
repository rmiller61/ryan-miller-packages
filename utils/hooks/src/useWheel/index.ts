/**
 * Yes this is blatantly copied from https://github.com/dipeshrai123/react-ui-animate/blob/v2.0.0/src/gestures/hooks/useWheel.ts
 * Deal with it.
 */

import { useConstant } from "../useConstant"
import type { UseWheelCallback } from "./types"
import { WheelGesture } from "./wheelGesture"
import * as React from "react"

export function useWheel<T extends HTMLElement = any>(callback: UseWheelCallback) {
  const ref = React.useRef<T | null>(null)
  const wheelGesture = useConstant(() => new WheelGesture())

  // re-initiate callback on change
  React.useEffect(() => {
    wheelGesture.applyCallback(callback)
    const unsubscribe = wheelGesture.applyGesture({
      targetElement: ref.current,
      callback,
    })

    return () => {
      unsubscribe && unsubscribe()
    }
  }, [wheelGesture, callback])

  return () => {
    return { ref }
  }
}
