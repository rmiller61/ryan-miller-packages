import { useUnmount } from "./useUnmount"
import { renderHook } from "@testing-library/react-hooks"
import { vi } from "vitest"

describe("useUnmount", () => {
  it("should be defined", () => {
    expect(useUnmount).toBeDefined()
  })

  it("should not call provided callback on mount", () => {
    const spy = vi.fn()
    renderHook(() => useUnmount(spy))

    expect(spy).not.toHaveBeenCalled()
  })

  it("should not call provided callback on re-renders", () => {
    const spy = vi.fn()
    const { rerender } = renderHook(() => useUnmount(spy))

    rerender()
    rerender()
    rerender()
    rerender()

    expect(spy).not.toHaveBeenCalled()
  })

  it("should call provided callback on unmount", () => {
    const spy = vi.fn()
    const { unmount } = renderHook(() => useUnmount(spy))

    unmount()

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it("should call provided callback if is has been changed", () => {
    const spy = vi.fn()
    const spy2 = vi.fn()
    const spy3 = vi.fn()
    const { rerender, unmount } = renderHook((cb) => useUnmount(cb), { initialProps: spy })

    rerender(spy2)
    rerender(spy3)
    unmount()

    expect(spy).not.toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()
    expect(spy3).toHaveBeenCalledTimes(1)
  })
})
