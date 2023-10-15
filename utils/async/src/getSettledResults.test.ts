import { getSettledResults } from "./getSettledResults"
import { describe, it, expect } from "vitest"

describe("getSettledResults", () => {
  it("Should return an array of results", async () => {
    const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]

    const results = await getSettledResults(promises)

    expect(results).toStrictEqual([1, 2, 3])
  })

  it("Should filter out rejected promises", async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject(new Error("I'm a failure")),
      Promise.resolve(3),
    ]

    const results = await getSettledResults(promises)

    expect(results).toStrictEqual([1, 3])
  })
})
