/**
 * Attempts to infer the intention of a swipe based on the offset and velocity,
 * i.e. whether the user is trying to swipe left or right.
 * If the user swipes slowly, the intention is likely not to transition to the next or previous page.
 * @param offset - The distance the swipe has traveled, in px.
 * @param velocity - The speed of the swipe, in px/ms.
 */
export const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}
