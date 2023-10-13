// blatantly stolen from https://github.com/bdsqqq/try/blob/main/src/index.ts
// which was blatantly stolen from fireship at https://www.youtube.com/watch?v=ITogH7lJTyE

export const tryCatch = async <T>(promise: Promise<T>): Promise<[T, null] | [null, Error]> => {
  try {
    const data = await promise
    return [data, null]
  } catch (throwable) {
    if (throwable instanceof Error) return [null, throwable]

    throw throwable
  }
}
