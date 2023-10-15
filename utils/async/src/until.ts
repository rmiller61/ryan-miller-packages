// Src: https://blog.openreplay.com/forever-functional-waiting-with-promises

/**
 *
 * @param fn A function that returns a promise or a boolean value
 * @param delay The delay between each attempt
 * @param maxWait The maximum time to wait before rejecting the promise
 * @returns A promise that resolves when the function returns true
 */
export const until = async (
  fn: () => Promise<boolean> | boolean,
  delay: number = 1000,
  maxWait: number = 10000
) => {
  const startTime =
    new Date().getTime() /* 1. Store the starting time in case the test takes too long */
  /* 2. Create an infinite loop */
  for (;;) {
    try {
      if (await fn()) {
        /* 3. Exit if the test function resolves to true... */
        return true
      }
    } catch (e) {
      /* ...or if it throws an exception */
      throw e
    }
    if (new Date().getTime() - startTime > maxWait) {
      throw new Error(
        `Max wait reached. ${new Date().getTime() - startTime} > ${maxWait}`
      ) /* 5. Check if enough time has passed; if so, throw an exception */
    } else {
      /* 6. Wait and test again */
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
}
