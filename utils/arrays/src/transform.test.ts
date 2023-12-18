import {
  removeDuplicates,
  removeDuplicateObjects,
  arrayFromNumber,
  sliceIntoChunks,
  shuffleArray,
} from "./transform"
import { it, describe, expect } from "vitest"

describe("array transform utility", () => {
  describe("removeDuplicates", () => {
    it("should remove duplicates from array", () => {
      expect(removeDuplicates([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe("removeDuplicateObjects", () => {
    it("should remove duplicate objects from array", () => {
      expect(
        removeDuplicateObjects(
          [
            { name: "John" },
            { name: "Sara" },
            { name: "Sara" },
            { name: "Lynn" },
            { name: "Jake" },
            { name: "Jake" },
          ],
          "name"
        )
      ).toEqual([{ name: "John" }, { name: "Sara" }, { name: "Lynn" }, { name: "Jake" }])
    })
  })

  describe("arrayFromNumber", () => {
    it("should create array from number", () => {
      expect(arrayFromNumber(5)).toEqual([0, 1, 2, 3, 4])
    })
  })

  describe("sliceIntoChunks", () => {
    it("should slice array into chunks", () => {
      expect(sliceIntoChunks([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10],
      ])
    })
  })

  describe("shuffleArray", () => {
    it("should shuffle array", () => {
      expect(shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).not.toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      ])
    })
  })
})
