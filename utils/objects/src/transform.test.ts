import { removeEmpty } from "transform"
import { it, describe, expect } from "vitest"

describe("object transform utils", () => {
  describe("removeEmpty", () => {
    it("should remove empty values from an object", () => {
      const obj = { a: 1, b: undefined }
      const cleaned = removeEmpty(obj)

      expect(cleaned).toEqual({ a: 1 })
    })
  })
})
