export type InputRange = [number, number]

export type OutputRange = [number, number]

export type NumberToLetterOptions = {
  case?: "lower" | "upper"
  startIndex?: 0 | 1
  outOfRange?: "wrap" | "clamp" | "error" | "concat"
}
