import { useEffectOnce } from "./useEffectOnce"
import { renderHook } from "@testing-library/react-hooks"
import { vi } from "vitest"

const mockEffectCleanup = vi.fn()
const mockEffectCallback = vi.fn().mockReturnValue(mockEffectCleanup)

it("should run provided effect only once", () => {
  const { rerender } = renderHook(() => useEffectOnce(mockEffectCallback))
  expect(mockEffectCallback).toHaveBeenCalledTimes(1)

  rerender()
  expect(mockEffectCallback).toHaveBeenCalledTimes(1)
})
