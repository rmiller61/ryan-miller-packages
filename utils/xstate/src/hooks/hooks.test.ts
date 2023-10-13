/**
 * @vitest-environment jsdom
 */

import { usePersistentMachine } from "./index"
import { renderHook, act } from "@testing-library/react-hooks"
import { it, describe, expect, beforeEach, test } from "vitest"
import { createMachine } from "xstate"

// Simple machine to test
const toggleMachine = createMachine({
  id: "toggle",
  initial: "inactive",
  states: {
    inactive: {
      on: {
        ACTIVATE: "active",
      },
    },
    active: {
      on: {
        DEACTIVATE: "inactive",
      },
    },
  },
})

describe("xstate hook", () => {
  describe("usePersistentMachine", () => {
    it("should persist state after rerendering", () => {
      const { result, rerender } = renderHook(() => usePersistentMachine(toggleMachine))
      const [_, send] = result.current
      act(() => {
        send("ACTIVATE")
      })
      rerender()
      const [state] = result.current
      expect(state.value).toBe("active")
    })
  })
})
