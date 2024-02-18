import type { Vector2, UseWheelCallback, WheelEventType } from "./types"
import { clamp } from "@social-hustle/utils-numbers"
import type { MotionValue } from "framer-motion"
import { motionValue } from "framer-motion"

const LINE_HEIGHT = 40
const PAGE_HEIGHT = 800

export class WheelGesture {
  /**
   * Last time stamp for measuring time delta
   */
  lastTimeStamp: number = Date.now()
  /**
   * Whether the gestured and any composed animations are active
   */
  isActive: boolean = false
  /**
   * The target DOM element to attach the wheel event to
   */
  targetElement?: HTMLElement | null

  callback?: (event: WheelEventType) => void
  subscribe?: (eventKeys?: Array<string>) => void
  static _VELOCITY_LIMIT: number = 20

  isActiveID?: number | NodeJS.Timeout
  movement: Vector2 = { x: 0, y: 0 }
  previousMovement: Vector2 = { x: 0, y: 0 }
  direction: Vector2 = { x: 0, y: 0 }
  velocity: Vector2 = { x: 0, y: 0 }
  delta: Vector2 = { x: 0, y: 0 }
  motionVector: {
    x: MotionValue<number>
    y: MotionValue<number>
  } = {
    x: motionValue(0),
    y: motionValue(0),
  }

  // Holds offsets
  offset: Vector2 = { x: 0, y: 0 }
  translation: Vector2 = { x: 0, y: 0 }

  // initialize the events
  initEvents() {
    if (this.targetElement) {
      const callback = this.onWheel.bind(this)
      this.targetElement.addEventListener("wheel", callback)
      return function () {
        this.targetElement.removeEventListener("wheel", callback)
      }
    }
  }

  handleCallback() {
    if (this.callback) {
      this.callback({
        target: this.targetElement,
        isActive: this.isActive,
        deltaX: this.delta.x,
        deltaY: this.delta.y,
        directionX: this.direction.x,
        directionY: this.direction.y,
        movementX: this.movement.x,
        movementY: this.movement.y,
        offsetX: this.offset.x,
        offsetY: this.offset.y,
        velocityX: this.velocity.x,
        velocityY: this.velocity.y,
      })
    }
  }

  // re-apply new callback
  applyCallback(callback: UseWheelCallback) {
    this.callback = callback
  }

  // apply gesture
  applyGesture({
    targetElement,
    callback,
  }: {
    targetElement?: HTMLElement | null
    callback: (event: WheelEventType) => void
  }) {
    this.targetElement = targetElement
    this.callback = callback

    // initialize events
    this.initEvents()

    // unbind
    return () => this.subscribe && this.subscribe()
  }

  onWheel(event: WheelEvent) {
    let { deltaX, deltaY, deltaMode } = event

    const now: number = Date.now()
    const deltaTime = Math.min(now - this.lastTimeStamp, 64)
    this.lastTimeStamp = now
    const t = deltaTime / 1000 // seconds

    this.isActive = true

    if (this.isActiveID !== -1) {
      this.isActive = true
      clearTimeout(this.isActiveID)
    }

    this.isActiveID = setTimeout(() => {
      this.isActive = false
      this.translation = { x: this.offset.x, y: this.offset.y }
      this.handleCallback()

      this.velocity = { x: 0, y: 0 } // Reset Velocity
      this.movement = { x: 0, y: 0 }
    }, 200)

    // normalize wheel values, especially for Firefox
    if (deltaMode === 1) {
      deltaX *= LINE_HEIGHT
      deltaY *= LINE_HEIGHT
    } else if (deltaMode === 2) {
      deltaX *= PAGE_HEIGHT
      deltaY *= PAGE_HEIGHT
    }

    this.delta = { x: deltaX, y: deltaY }
    this.movement = {
      x: this.movement.x + deltaX,
      y: this.movement.y + deltaY,
    }
    this.offset = {
      x: this.translation.x + this.movement.x,
      y: this.translation.y + this.movement.y,
    }

    const diffX = this.movement.x - this.previousMovement.x
    const diffY = this.movement.y - this.previousMovement.y

    this.direction = {
      x: Math.sign(diffX),
      y: Math.sign(diffY),
    }

    this.velocity = {
      x: clamp(diffX / t / 1000, [-1 * WheelGesture._VELOCITY_LIMIT, WheelGesture._VELOCITY_LIMIT]),
      y: clamp(diffY / t / 1000, [-1 * WheelGesture._VELOCITY_LIMIT, WheelGesture._VELOCITY_LIMIT]),
    }

    this.previousMovement = {
      x: this.movement.x,
      y: this.movement.y,
    }

    this.handleCallback()
  }
}
