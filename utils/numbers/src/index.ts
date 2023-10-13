import type { InputRange, OutputRange, NumberToLetterOptions } from "../types"
import invariant from "tiny-invariant"

export const isEven = (num: number) => num % 2 === 0

export const isOdd = (num: number) => !isEven(num)

export const evenOrOdd = (number: number) => (isEven(number) ? "even" : "odd")

export const parseNumber = (number: number | string | null | undefined) => {
  if (typeof number === "string") {
    return parseFloat(number)
  }
  invariant(typeof number === "number", "Number must be a number")
  return number
}

export const isPrime = (number: number) => {
  if (number < 2) return false
  if (number === 2) return true
  if (number % 2 === 0) return false
  for (let i = 3; i <= Math.sqrt(number); i += 2) {
    if (number % i === 0) return false
  }
  return true
}

export const isDivisible = (number: number, divisor: number) => number % divisor === 0

export const isDivisibleByEvery = (number: number, divisors: number[]) => {
  return divisors.every((divisor) => isDivisible(number, divisor))
}

export const isDivisibleByAny = (number: number, divisors: number[]) => {
  return divisors.some((divisor) => isDivisible(number, divisor))
}

export const isDivisibleBy = (number: number, divisors: number[]) => {
  return isDivisibleByEvery(number, divisors) || isDivisibleByAny(number, divisors)
}

export const isInRange = (number: number, [min, max]: InputRange, exclusive = false) => {
  return (exclusive ? number > min : number >= min) && (exclusive ? number < max : number <= max)
}

export const clamp = (number: number, [min, max]: InputRange) =>
  Math.min(Math.max(number, min), max)

export const interpolate = (number: number, input: InputRange, output: OutputRange) => {
  return ((number - input[0]) * (output[1] - output[0])) / (input[1] - input[0]) + output[0]
}

export const wrap = (number: number, [min, max]: InputRange) => {
  const rangeSize = max - min
  return ((((number - min) % rangeSize) + rangeSize) % rangeSize) + min
}

export const randomNumber = (numbers: number[]) => {
  return Math.floor(Math.random() * (getMax(numbers) - getMin(numbers) + 1) + getMin(numbers))
}

export const getSum = (numbers: number[]) => {
  return numbers.reduce((acc, curr) => acc + curr)
}

export const getAverage = (numbers: number[]) => {
  return getSum(numbers) / numbers.length
}

export const getMin = (numbers: number[]) => {
  return Math.min(...numbers)
}

export const getMax = (numbers: number[]) => {
  return Math.max(...numbers)
}

export const getMedian = (numbers: number[]) => {
  const mid = Math.floor(numbers.length / 2),
    nums = [...numbers].sort((a, b) => a - b)

  return numbers.length % 2 !== 0
    ? nums[mid]
    : (parseNumber(nums[mid - 1]) + parseNumber(nums[mid])) / 2
}

export const getQuartiles = (numbers: number[]): [number, number] => {
  const avg = getAverage(numbers),
    min = getMin(numbers),
    max = getMax(numbers),
    q1 = Math.round(avg - min / 2),
    q3 = Math.round(max - avg / 2)
  return [q1, q3]
}

export const roundTo = (number: number, precision: number) => {
  return Math.round(number / precision) * precision
}

export const findClosest = (number: number, numbers: number[]) => {
  return numbers.reduce((prev, curr) => {
    return Math.abs(curr - number) < Math.abs(prev - number) ? curr : prev
  })
}

export const numberToLetter = (
  number: number,
  options: NumberToLetterOptions = {
    case: "lower",
    startIndex: 0,
    outOfRange: "concat",
  }
) => {
  number = options.startIndex === 1 ? number : number + 1
  const startCharCode = options.case === "upper" ? 64 : 96
  if (options.outOfRange === "wrap") {
    return String.fromCharCode(startCharCode + wrap(number, [1, 26]))
  } else if (options.outOfRange === "clamp") {
    return String.fromCharCode(startCharCode + clamp(number, [1, 26]))
  } else if (options.outOfRange === "error") {
    invariant(isInRange(number, [1, 26]), "Number must be between 1 and 26")
    return String.fromCharCode(startCharCode + number)
  } else {
    // 27 should return "aa", 28 should return "ab" etc.
    let result = ""
    while (number > 0) {
      const remainder = number % 26 || 26
      result = String.fromCharCode(startCharCode + remainder) + result
      number = Math.floor((number - remainder) / 26)
    }
    return result
  }
}
