import { generateBasicAuthHeader } from "./auth"
import { afterAll, afterEach, beforeAll, expect, it } from "vitest"

describe("generateBasicAuthHeader", () => {
  it("should return a valid auth header", () => {
    const header = generateBasicAuthHeader("username", "password")

    expect(header).toBe("Basic dXNlcm5hbWU6cGFzc3dvcmQ=")
  })
})
