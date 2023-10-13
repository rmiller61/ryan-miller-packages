export const sleep = async <T>(delay: number): Promise<T> => {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay)
  })
}
