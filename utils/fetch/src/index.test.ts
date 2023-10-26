import axios from "./index"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, expect, it } from "vitest"
import "isomorphic-fetch"

const request = axios.request

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const url = "https://example.com"

describe("request", () => {
  it("should return a response object", async () => {
    server.use(
      rest.get(url, (req, res, ctx) => {
        return res(ctx.json({ message: "hello" }))
      })
    )

    const response = await request<{ message: string }>({ url })

    expect(response.data).toStrictEqual({ message: "hello" })
  })

  it("should return a response object with a stream", async () => {
    server.use(
      rest.get(url, (req, res, ctx) => {
        return res(ctx.json({ message: "hello" }))
      })
    )

    const response = await request<{ message: string }>({ url, responseType: "stream" })

    expect(response.data).toBeDefined()
  })

  it("auth should work", async () => {
    server.use(
      rest.get(url, (req, res, ctx) => {
        if (req.headers.get("Authorization") == "Basic dXNlcm5hbWU6cGFzc3dvcmQ=") {
          return res(ctx.json({ message: "hello" }))
        }
        return res(ctx.status(401))
      })
    )

    const response = await request<{ message: string }>({
      url,
      auth: { username: "username", password: "password" },
    })

    expect(response.data).toStrictEqual({ message: "hello" })
  })

  it("should throw if auth fails", async () => {
    server.use(
      rest.get(url, (req, res, ctx) => {
        if (req.headers.get("Authorization") == "Basic dXNlcm5hbWU6cGFzc3dvcmQ=") {
          return res(ctx.json({ message: "hello" }))
        }
        return res(ctx.status(401))
      })
    )

    const response = request<{ message: string }>({
      url,
      auth: { username: "wrongusername", password: "wrongpassword" },
    })

    await expect(response).rejects.toThrow()
  })

  it("should throw an error if the request times out", async () => {
    server.use(
      rest.get(url, (req, res, ctx) => {
        return res(ctx.delay(1000), ctx.json({ message: "hello" }))
      })
    )

    const response = request<{ message: string }>({ url, timeout: 500 })

    await expect(response).rejects.toThrow()
  })

  it("should thow if max content length is exceeded", async () => {
    server.use(
      rest.get(url, (req, res, ctx) => {
        return res(
          ctx.set({
            "Content-Length": "100",
          }),
          ctx.json({ message: "hello" })
        )
      })
    )

    const response = request<{ message: string }>({ url, maxContentLength: 1 })

    await expect(response).rejects.toThrow()
  })

  it("should throw if the status code is not in the 2xx - 3xx range", async () => {
    server.use(
      rest.get(url, (req, res, ctx) => {
        return res(ctx.status(400))
      })
    )

    const response = request<{ message: string }>({ url })

    await expect(response).rejects.toThrow()
  })

  it("should throw if the status code is 3xx and custom validation fails", async () => {
    server.use(
      rest.get(url, (req, res, ctx) => {
        return res(ctx.status(300))
      })
    )

    const response = request<{ message: string }>({
      url,
      validateStatus: (status) => status >= 200 && status < 300,
    })

    await expect(response).rejects.toThrow()
  })
})
