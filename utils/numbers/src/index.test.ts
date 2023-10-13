import type { InputRange, OutputRange } from "../types"
import { clamp, interpolate, wrap, numberToLetter } from "./index"
import { it, describe, expect } from "vitest"

describe("number utilities", () => {
  describe("clamp function", () => {
    it("should clamp a high value to the range max", () => {
      expect(clamp(25, [10, 20])).toEqual(20)
    })
    it("should clamp a low value to the range min", () => {
      expect(clamp(5, [10, 20])).toEqual(10)
    })
  })

  describe("interpolate function", () => {
    it("should return an interpolated value given 2 ranges", () => {
      const input: InputRange = [0, 10]
      const output: OutputRange = [0, 100]
      expect(interpolate(5, input, output)).toEqual(50)
    })
  })

  describe("wrap function", () => {
    it("should wrap a value inside the given range", () => {
      expect(wrap(0.5, [0, 1])).toEqual(0.5)
    })
    it("should wrap a value outside the given range", () => {
      expect(wrap(1.5, [0, 1])).toEqual(0.5)
    })
  })

  describe("numberToLetter function", () => {
    it("should return a letter given a number", () => {
      expect(numberToLetter(25)).toEqual("z")
    })
    it("should return a double letter given a number greater than 26", () => {
      expect(numberToLetter(26)).toEqual("aa")
    })
  })
})
