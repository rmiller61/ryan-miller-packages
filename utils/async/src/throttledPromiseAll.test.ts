import { throttledPromiseAll } from "./throttledPromiseAll"
import { describe, it, expect } from "vitest"

describe("throttledPromiseAll", () => {
  it("should resolve all promises", async () => {
    const promises = [
      Promise.resolve("result 1"),
      Promise.resolve("result 2"),
      Promise.resolve("result 3"),
    ]

    const results = await throttledPromiseAll(promises, 3)

    expect(results).toEqual(["result 1", "result 2", "result 3"])
  })

  it("should reject if any promise rejects", async () => {
    const promises = [
      Promise.resolve("result 1"),
      Promise.reject(new Error("error 1")),
      Promise.resolve("result 2"),
    ]

    await expect(throttledPromiseAll(promises, 3)).rejects.toThrow("error 1")
  })

  it("should throttle the number of concurrent promises", async () => {
    const promises = [
      Promise.resolve("result 1"),
      Promise.resolve("result 2"),
      Promise.resolve("result 3"),
      Promise.resolve("result 4"),
      Promise.resolve("result 5"),
    ]

    const startTime = Date.now()

    await throttledPromiseAll(promises, 2)

    const endTime = Date.now()

    expect(endTime - startTime).toBeGreaterThan(200)
  })

  it("should introduce a delay between batches", async () => {
    const promises = [
      Promise.resolve("result 1"),
      Promise.resolve("result 2"),
      Promise.resolve("result 3"),
      Promise.resolve("result 4"),
      Promise.resolve("result 5"),
    ]

    const startTime = Date.now()

    await throttledPromiseAll(promises, 2, 500)

    const endTime = Date.now()

    expect(endTime - startTime).toBeGreaterThan(1000)
  })
})
