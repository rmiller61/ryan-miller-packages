export type WheelEventType = {
  target: HTMLElement | undefined | null
  isWheeling: boolean
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

export type UseWheelCallback = (event: WheelEventType) => void
