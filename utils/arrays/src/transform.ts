import type { Primitive, RecordKey } from "@social-hustle/utils-types"

/**
 * Collection of functions that transform arrays
 * or create new arrays from another input (of any type)
 */

export const removeDuplicates = <T extends Primitive>(arr: T[]) => {
  return [...new Set(arr)]
}

export const removeDuplicateObjects = <T extends Record<RecordKey, unknown>>(
  arr: T[],
  key: keyof T
) => {
  const map = new Map<T[keyof T], T>()

  arr.forEach((item) => {
    const value = item[key]
    map.set(value, item)
  })

  const uniqueList = Array.from(map.values())
  console.log(uniqueList)
  return uniqueList
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
