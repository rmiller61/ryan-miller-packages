import type { CacheEntry } from "cachified"
import { cachified, lruCacheAdapter } from "cachified"
import { type CacheOptions } from "common/types"
import { LRUCache } from "lru-cache"

export type LRUCacheOptions = LRUCache.Options<string, CacheEntry, unknown>

export const createLRUCache = (options?: LRUCacheOptions) =>
  new LRUCache<string, CacheEntry>({ max: 1000, ...options })

const globalForLRUCache = globalThis as unknown as { lru?: LRUCache<string, CacheEntry> }

export async function getLRUCachedValue<T extends unknown>(
  cacheOptions: CacheOptions<T>,
  lruOptions?: LRUCacheOptions
): Promise<T> {
  const lru = globalForLRUCache.lru ?? createLRUCache(lruOptions)
  const cache = lruCacheAdapter(lru)

  const cachedValue = await cachified({
    cache,
    ...cacheOptions,
  })

  return cachedValue
}
