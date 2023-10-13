import { Redis } from "@upstash/redis"
import type { CacheEntry, Cache } from "cachified"
import { cachified, totalTtl } from "cachified"
import { type CacheOptions } from "common/types"

let upstashRedisClient: Redis | undefined

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  upstashRedisClient = new Redis({
    url: `${process.env.UPSTASH_REDIS_REST_URL}`,
    token: `${process.env.UPSTASH_REDIS_REST_TOKEN}`,
  })
}

export function upstashRedisAdapter(redisCache: Redis): Cache {
  return {
    async set(key, value) {
      const ttl = totalTtl(value?.metadata)
      let opts = {}
      if (ttl > 0 && ttl < Infinity) {
        opts = { px: ttl }
      }
      const resp = await redisCache.set(key, JSON.stringify(value), opts)
      if (resp === "OK") {
        return value
      } else {
        throw new Error(`Failed to set cache entry: ${resp}`)
      }
    },
    async get(key) {
      const value = await redisCache.get<CacheEntry<unknown>>(key)
      if (!value) {
        return null
      }
      //return JSON.parse(value)
      return value
    },
    delete(key) {
      return redisCache.del(key)
    },
  }
}

export async function getUpstashRedisValue<T extends unknown>(
  options: CacheOptions<T>
): Promise<T> {
  if (!upstashRedisClient) {
    throw new Error(
      "Upstash Redis client is not defined. Check to make sure you've included the UPSTASH_REDIS_REST_URL and/or UPSTASH_REDIS_REST_TOKEN environment variables."
    )
  }
  const cache = upstashRedisAdapter(upstashRedisClient)
  const cachedValue = await cachified({
    cache,
    ...options,
  })

  return cachedValue
}
