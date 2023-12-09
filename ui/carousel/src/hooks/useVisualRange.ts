import { arrayFromNumber } from "@social-hustle/utils-arrays"
import { getMin, getMax } from "@social-hustle/utils-numbers"

export const useVisualRange = ({
  childCount,
  isInfinite = false,
  moveBy,
}: {
  childCount: number
  isInfinite?: boolean
  moveBy: number
}) => {
  /**
   * Create an array created from the # of children provided
   */
  const visualRange = arrayFromNumber(childCount)

  if (!isInfinite) return visualRange

  // Note: these are offset by 1 to account for the fact that the first index will be 0

  /**
   * Prepend items outside the visual range of the carousel.
   * By default, the length of the array is equal to the # of visible items so
   * that the carousel can appear to be 'infinite' even when dragged to its maximum.
   */
  const prepend = arrayFromNumber(moveBy).map((i) => getMin(visualRange) - i - 1)

  /**
   * Append items outside the visual range of the carousel.
   * By default, the length of the array is equal to the # of visible items so
   * that the carousel can appear to be 'infinite' even when dragged to its maximum.
   */
  const append = arrayFromNumber(moveBy).map((i) => getMax(visualRange) + i + 1)

  /**
   * Append/prepend items outside the visual range of the carousel
   * to create a smooth transition when dragging.
   */
  const visualRangeWithDuplicates = [...visualRange, ...prepend, ...append].sort((a, b) => a - b)

  return visualRangeWithDuplicates
}
