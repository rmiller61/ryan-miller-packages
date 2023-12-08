import { useMemo, useEffect, useRef } from "react"

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 * @url https://github.com/radix-ui/primitives/blob/main/packages/react/use-callback-ref/src/useCallbackRef.tsx
 */
export function useCallbackRef<T extends (...args: any[]) => any>(callback: T | undefined): T {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  // https://github.com/facebook/react/issues/19240
  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, [])
}
