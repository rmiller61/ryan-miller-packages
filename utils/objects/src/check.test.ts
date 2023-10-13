import { objectHasUndefined, objectToUrlEncoded, objectsAreEqual, isObjectEmpty } from "./check"
import { it, describe, expect } from "vitest"

describe("object check utils", () => {
  describe("objectHasUndefined", () => {
    it("should return true if object has undefined value", () => {
      expect(objectHasUndefined({ a: 1, b: undefined })).toBe(true)
    })

    it("should return false if object has no undefined value", () => {
      expect(objectHasUndefined({ a: 1, b: 2 })).toBe(false)
    })
  })

  describe("objectToUrlEncoded", () => {
    it("should return url encoded string", () => {
      expect(objectToUrlEncoded({ a: 1, b: 2 })).toBe("a=1&b=2")
    })
  })

  describe("objectsAreEqual", () => {
    it("should return true if objects are equal", () => {
      expect(objectsAreEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true)
    })

    it("should return false if objects are not equal", () => {
      expect(objectsAreEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false)
    })
  })

  describe("isObjectEmpty", () => {
    it("should return true if object is empty", () => {
      expect(isObjectEmpty({})).toBe(true)
    })

    it("should return false if object is not empty", () => {
      expect(isObjectEmpty({ a: 1, b: 2 })).toBe(false)
    })
  })
})
