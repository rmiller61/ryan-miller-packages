import type { CachifiedOptions } from "cachified"

export type CacheOptions<T> = Omit<CachifiedOptions<T>, "cache">
