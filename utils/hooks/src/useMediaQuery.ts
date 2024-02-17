import type { CSSUnit } from "@social-hustle/utils-types"
import { useSyncExternalStore, useCallback } from "react"

export type MediaQuery = `(${"min" | "max"}-width: ${number}${CSSUnit})`

/**
 * Based on Tailwind CSS breakpoints
 * @url https://tailwindcss.com/docs/responsive-design
 */
export const defaultMediaQueryMap = new Map<string, MediaQuery>([
  ["sm", "(min-width: 640px)"],
  ["md", "(min-width: 768px)"],
  ["lg", "(min-width: 1024px)"],
  ["xl", "(min-width: 1280px)"],
  ["2xl", "(min-width: 1536px)"],
])

export const useMediaQuery = (
  query: MediaQuery,
  options = {
    defaultState: false,
  }
): boolean => {
  const subscribe = useCallback(
    (callback) => {
      const matchMedia = window.matchMedia(query)

      matchMedia.addEventListener("change", callback)
      return () => {
        matchMedia.removeEventListener("change", callback)
      }
    },
    [query]
  )

  const getSnapshot = () => {
    return window.matchMedia(query).matches
  }

  const getServerSnapshot = () => {
    return options.defaultState
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
