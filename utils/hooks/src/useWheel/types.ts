export type WheelEventType = {
  target: HTMLElement | undefined | null
  isActive: boolean
  movementX: number
  movementY: number
  offsetX: number
  offsetY: number
  deltaX: number
  deltaY: number
  velocityX: number
  velocityY: number
  directionX: number
  directionY: number
}

export type Vector2 = { x: number; y: number }

/**
 * Callback for wheel event, e.g. animating a value
 */
export type UseWheelCallback = (event: WheelEventType) => void
