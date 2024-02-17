import { useMediaQuery } from "./useMediaQuery"
import { renderHook, act } from "@testing-library/react-hooks"
import { renderHook as renderHookSSR } from "@testing-library/react-hooks/server"
import { it, describe, expect } from "vitest"
import MatchMediaMock from "vitest-matchmedia-mock"

describe("useMedia", () => {
  let matchMediaMock = new MatchMediaMock()
  beforeEach(() => {
    matchMediaMock.useMediaQuery("(min-width: 768px)")
  })

  afterEach(() => {
    matchMediaMock.clear()
  })

  afterAll(() => {
    matchMediaMock.destroy()
  })

  it("should return true if media query matches", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"))
    expect(result.current).toBe(true)
  })
  it("should return false if media query does not match", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 1200px)"))
    expect(result.current).toBe(false)
  })
  it("should return false during SSR", () => {
    const { result } = renderHookSSR(() => useMediaQuery("(min-width: 768px)"))
    expect(result.current).toBe(false)
  })
  it("should return true during SSR if defaultState is true", () => {
    const { result } = renderHookSSR(() =>
      useMediaQuery("(min-width: 768px)", { defaultState: true })
    )
    expect(result.current).toBe(true)
  })
})
