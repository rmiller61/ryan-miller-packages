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

// Stop words from https://www.ranks.nl/stopwords
export const stopWords = [
  "a",
  "about",
  "above",
  "after",
  "again",
  "against",
  "all",
  "am",
  "an",
  "and",
  "any",
  "are",
  "aren't",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "by",
  "can't",
  "cannot",
  "could",
  "couldn't",
  "did",
  "didn't",
  "do",
  "does",
  "doesn't",
  "doing",
  "don't",
  "down",
  "during",
  "each",
  "few",
  "for",
  "from",
  "further",
  "had",
  "hadn't",
  "has",
  "hasn't",
  "have",
  "haven't",
  "having",
  "he",
  "he'd",
  "he'll",
  "he's",
  "her",
  "here",
  "here's",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "how's",
  "i",
  "i'd",
  "i'll",
  "i'm",
  "i've",
  "if",
  "in",
  "into",
  "is",
  "isn't",
  "it",
  "it's",
  "its",
  "itself",
  "let's",
  "me",
  "more",
  "most",
  "mustn't",
  "my",
  "myself",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "ought",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "shan't",
  "she",
  "she'd",
  "she'll",
  "she's",
  "should",
  "shouldn't",
  "so",
  "some",
  "such",
  "than",
  "that",
  "that's",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "there's",
  "these",
  "they",
  "they'd",
  "they'll",
  "they're",
  "they've",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "very",
  "was",
  "wasn't",
  "we",
  "we'd",
  "we'll",
  "we're",
  "we've",
  "were",
  "weren't",
  "what",
  "what's",
  "when",
  "when's",
  "where",
  "where's",
  "which",
  "while",
  "who",
  "who's",
  "whom",
  "why",
  "why's",
  "with",
  "won't",
  "would",
  "wouldn't",
  "you",
  "you'd",
  "you'll",
  "you're",
  "you've",
  "your",
  "yours",
  "yourself",
  "yourselves",
] as const

export type StopWord = (typeof stopWords)[number]

export const removeStopWords = (str: string) => {
  const words = str.split(" ")
  const filteredWords = words.filter((word) => !stopWords.includes(word as StopWord))
  const filteredStr = filteredWords.join(" ")

  return filteredStr
}
