// Src: https://blog.openreplay.com/forever-functional-waiting-with-promises
export const until = async (
  fn: () => Promise<boolean> | boolean,
  time: number = 1000,
  wait: number = 10000
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
    if (new Date().getTime() - startTime > wait) {
      throw new Error(
        `Max wait reached. ${new Date().getTime() - startTime} > ${wait}`
      ) /* 5. Check if enough time has passed; if so, throw an exception */
    } else {
      /* 6. Wait and test again */
      await new Promise((resolve) => setTimeout(resolve, time))
    }
  }
}
