import { arrayIntersection, arrayDifference } from "./data-sets"
import { it, describe, expect } from "vitest"

describe("data sets utility", () => {
  describe("arrayIntersection", () => {
    const ARR_1 = [1, 2, 3, 4, 5]
    const ARR_2 = [1, 2, 3]
    it("should return the intersection of two arrays", () => {
      expect(arrayIntersection(ARR_1, ARR_2)).toEqual([1, 2, 3])
    })
  })

  describe("arrayDifference", () => {
    const ARR_1 = [1, 2, 3, 4, 5]
    const ARR_2 = [1, 2, 3]
    it("should return the difference of two arrays", () => {
      expect(arrayDifference(ARR_1, ARR_2)).toEqual([4, 5])
    })
  })
})
