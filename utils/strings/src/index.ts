import { createRegExp, exactly } from "magic-regexp"

const endSlashRegex = createRegExp(exactly("/").at.lineEnd())
const startSlashRegex = createRegExp(exactly("/").at.lineStart())

export const stripEndSlash = (str: string) => str.replace(endSlashRegex, "")

export const forceEndSlash = (str: string) => `${stripEndSlash(str)}/`

export const stripStartSlash = (str: string) => str.replace(startSlashRegex, "")

export const forceStartSlash = (str: string) => `${stripStartSlash(str)}/`

export const capitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`

/**
 *
 * @param str
 * @returns Deburrs string by converting Latin-1 Supplement and Latin Extended-A letters to basic Latin letters and removing combining diacritical marks.
 * @see https://youmightnotneed.com/lodash#deburr
 */
export const deburr = (str: string) => str.normalize("NFD").replace(/\p{Diacritic}/gu, "")

/**
 *
 * @param str
 * @returns Converts the characters “&”, “<”, “>”, ‘"’, and “’” in string to their corresponding HTML entities.
 * @see https://youmightnotneed.com/lodash#escape
 */
export const escape = (str: string) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }
  return str.replace(/[&<>"']/g, (m) => map[m])
}

export const toKebabCase = (str: string) => {
  const re = /([0-9]+|([A-Z][a-z]+)|[a-z]+|([A-Z]+)(?![a-z]))/g

  return (String(str ?? "").match(re) || []).map((x) => x.toLowerCase()).join("-")
}

export const toCamelCase = (input: string) => {
  const words = input.toLowerCase().split(/[\s_-]+/)
  const camelCaseWords = words.map((word, index) =>
    index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
  )
  return camelCaseWords.join("")
}

export const toPascalCase = (input: string) => {
  const camelCase = toCamelCase(input)
  return capitalize(camelCase)
}

export const truncate = (str: string, num: number, endStr = "...") => {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + endStr
}

export const acronym = (str: string) => {
  const acronym = str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")

  return acronym
}
