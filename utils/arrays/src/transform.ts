/**
 * Collection of functions that transform arrays
 * or create new arrays from another input (of any type)
 */

export const removeDuplicates = <T extends unknown>(arr: T[]) => {
  return [...new Set(arr)]
}

export const arrayFromNumber = (number: number): number[] => Array.from(Array(number).keys())

export const sliceIntoChunks = <T extends unknown>(arr: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize))
  }
  return chunks
}

export const shuffleArray = <T extends unknown>(array: T[]): T[] => {
  let currentIndex = array.length
  let temporaryValue: T
  let randomIndex: number

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex] as T
    array[currentIndex] = array[randomIndex] as T
    array[randomIndex] = temporaryValue
  }

  return array
}
