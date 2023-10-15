import { until } from "./until"
import { describe, it, expect } from "vitest"

describe("until", () => {
  it("Async function should resolve to true", async () => {
    let count = 0
    const fn = async () => {
      count++
      return count === 3
    }
    const result = await until(fn, 100, 1000)
    expect(result).toBe(true)
  })

  it("Sync function should resolve to true", async () => {
    let count = 0
    const fn = () => {
      count++
      return count === 3
    }
    const result = await until(fn, 100, 1000)
    expect(result).toBe(true)
  })

  it("Should throw an error if the function throws an error", async () => {
    const fn = async () => {
      throw new Error("Async error")
    }
    try {
      await until(fn, 100, 1000)
    } catch (e) {
      expect(e.message).toBe("Async error")
    }
  })

  it("Should throw an error if the function never returns true", async () => {
    let count = 0
    const fn = async () => {
      return count === 3
    }

    await expect(until(fn, 100, 1000)).rejects.toThrow(/Max wait reached/)
  })
})
