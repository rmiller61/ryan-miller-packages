import { sleep } from "./sleep"

export async function throttledPromiseAll<T>(
  promises: Promise<T>[],
  concurrencyLimit: number,
  delayBetweenBatches: number = 100
): Promise<T[]> {
  const results: T[] = []
  let currentIndex = 0

  while (currentIndex < promises.length) {
    const currentBatch = promises.slice(currentIndex, currentIndex + concurrencyLimit)

    const batchResults = await Promise.allSettled(currentBatch)

    for (const result of batchResults) {
      if (result.status === "fulfilled") {
        results.push(result.value)
      } else {
        throw result.reason
      }
    }

    currentIndex += concurrencyLimit

    // Introduce a delay between batches to avoid overloading the system
    await sleep(delayBetweenBatches) // Adjust the delay time as needed
  }

  return results
}
