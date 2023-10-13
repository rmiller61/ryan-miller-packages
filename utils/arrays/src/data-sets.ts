/**
 * Collection of functions to work with mathematical sets
 * e.g. intersection, difference, etc.
 * Named "data sets" because "sets" is a reserved word in JS
 */

/**
 *
 * Get the elements that two arrays have in common
 */
export const arrayIntersection = <T>(a: T[], b: T[]): T[] => {
  const s = new Set(b)
  return a.filter((x) => s.has(x))
}

/**
 *
 * Get the elements contained in array A but not in array B
 * Note: order matters here!
 * Src: https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
 */
export const arrayDifference = <T>(a: T[], b: T[]): T[] => {
  const s = new Set(b)
  return a.filter((x) => !s.has(x))
}
