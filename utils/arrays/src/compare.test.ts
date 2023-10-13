import { arrayContainsAll, arrayContainsAny, arrayContainsNone } from "./compare"
import { it, describe, expect } from "vitest"

describe("array comparison utility", () => {
  describe("arrayContainsAll", () => {
    const ARR_1 = [1, 2, 3, 4, 5]
    const ARR_2 = [1, 2, 3]
    it("should return true if array contains all", () => {
      expect(arrayContainsAll(ARR_1, ARR_2)).toBe(true)
    })
    it("should return false if array does not contain all", () => {
      expect(arrayContainsAll(ARR_2, ARR_1)).toBe(false)
    })
  })

  describe("arrayContainsAny", () => {
    const ARR_1 = [1, 2, 3, 4, 5]
    const ARR_2 = [1, 2, 3]
    it("should return true if array contains any", () => {
      expect(arrayContainsAny(ARR_1, ARR_2)).toBe(true)
    })
    it("should return false if array does not contain any", () => {
      expect(arrayContainsAny([6, 7, 8], ARR_1)).toBe(false)
    })
  })

  describe("arrayContainsNone", () => {
    const ARR_1 = [1, 2, 3, 4, 5]
    const ARR_2 = [1, 2, 3]
    it("should return true if array contains none", () => {
      expect(arrayContainsNone([6, 7, 8], ARR_1)).toBe(true)
    })
    it("should return false if array does not contain none", () => {
      expect(arrayContainsNone(ARR_1, ARR_2)).toBe(false)
    })
  })
})
