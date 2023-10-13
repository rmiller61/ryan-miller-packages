export const getSettledResults = async <T>(promises: Promise<T>[]) => {
  const results = await Promise.allSettled(promises)
  const fulfilled = results.filter(
    (result) => result.status === "fulfilled"
  ) as PromiseFulfilledResult<T>[]
  return await fulfilled.map((result) => result.value)
}
