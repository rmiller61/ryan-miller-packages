import axios from "./index"
import { http, HttpResponse } from "msw"
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
      http.get(url, () => {
        return HttpResponse.json({ message: "hello" })
      })
    )

    const response = await request<{ message: string }>({ url })

    expect(response.data).toStrictEqual({ message: "hello" })
  })

  it("should return a response object with a stream", async () => {
    server.use(
      http.get(url, () => {
        return HttpResponse.json({ message: "hello" })
      })
    )

    const response = await request<{ message: string }>({ url, responseType: "stream" })

    expect(response.data).toBeDefined()
  })

  it("auth should work", async () => {
    server.use(
      http.get(url, ({ request }) => {
        if (request.headers.get("Authorization") == "Basic dXNlcm5hbWU6cGFzc3dvcmQ=") {
          return HttpResponse.json({ message: "hello" })
        }
        return HttpResponse.json(null, { status: 401 })
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
      http.get(url, ({ request }) => {
        if (request.headers.get("Authorization") == "Basic dXNlcm5hbWU6cGFzc3dvcmQ=") {
          return HttpResponse.json({ message: "hello" })
        }
        return HttpResponse.json(null, { status: 401 })
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
      http.get(url, () => {
        return HttpResponse.json({ message: "hello" })
      })
    )

    const response = request<{ message: string }>({ url, timeout: 500 })

    await expect(response).rejects.toThrow()
  })

  it("should thow if max content length is exceeded", async () => {
    server.use(
      http.get(url, () => {
        return HttpResponse.json({ message: "hello" })
      })
    )

    const response = request<{ message: string }>({ url, maxContentLength: 1 })

    await expect(response).rejects.toThrow()
  })

  it("should throw if the status code is not in the 2xx range", async () => {
    server.use(
      http.get(url, () => {
        return HttpResponse.json(null, { status: 300 })
      })
    )

    const response = request<{ message: string }>({ url })

    await expect(response).rejects.toThrow()
  })

  it("should pass custom validation", async () => {
    server.use(
      http.get(url, () => {
        return HttpResponse.json(null, { status: 300 })
      })
    )

    const response = request<{ message: string }>({
      url,
      validateStatus: (status) => status >= 200 && status < 400,
    })

    await expect(response).resolves.toBeDefined()
  })

  it("custom fetcher should work", async () => {
    server.use(
      http.get(url, ({ request }) => {
        const headers = Object.fromEntries(request.headers.entries())
        return HttpResponse.json({ message: "hello", headers })
      })
    )

    const response = await request<{ message: string }>({
      url,
      fetch: (_, opts) => fetch(_, { ...opts, headers: { ...opts?.headers, "X-Test": "test" } }),
    })

    console.log(JSON.stringify(response, null, 2))

    expect(response.data).toStrictEqual({ message: "hello", headers: { "x-test": "test" } })
  })
})
