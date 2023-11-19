import { upstashRedisAdapter } from ".."
import { Redis } from "@upstash/redis"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, expect, it, vi } from "vitest"
import "isomorphic-fetch"
import "dotenv/config"

const url = `${process.env.UPSTASH_REDIS_REST_URL}/`

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const redisCache = new Redis({
  url: `${process.env.UPSTASH_REDIS_REST_URL}`,
  token: `${process.env.UPSTASH_REDIS_REST_TOKEN}`,
})

const cachedValue = {
  metadata: { ttl: 1000, createdTime: 1700396596 },
  value: "value",
}

describe("upstashRedisAdapter", () => {
  it("should set a value", async () => {
    server.use(
      rest.post(url, (req, res, ctx) => {
        //console.log(req.json())
        return res(
          ctx.json({
            result: "OK",
          })
        )
      })
    )

    const cache = upstashRedisAdapter(redisCache)
    const value = await cache.set("key", cachedValue)

    expect(value).toStrictEqual(cachedValue)
  })

  it("should get a value", async () => {
    server.use(
      rest.post(url, (req, res, ctx) => {
        return res(
          ctx.json({
            result: JSON.stringify(cachedValue),
          })
        )
      })
    )

    const cache = upstashRedisAdapter(redisCache)
    const value = await cache.get("key")

    expect(value).toStrictEqual(cachedValue)
  })

  it("should delete a value", async () => {
    server.use(
      rest.post(url, (req, res, ctx) => {
        return res(
          ctx.json({
            result: 1,
          })
        )
      })
    )

    const cache = upstashRedisAdapter(redisCache)
    const value = await cache.delete("key")

    expect(value).toStrictEqual(1)
  })
})
