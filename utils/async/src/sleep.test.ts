import { sleep } from "./sleep"
import { describe, it, expect } from "vitest"

describe("sleep", () => {
  it("Should return a promise that resolves after the given delay", async () => {
    const start = Date.now()

    await sleep(100)

    const end = Date.now()

    expect(end - start).toBeGreaterThanOrEqual(100)
  })
})
