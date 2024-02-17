import type { Vector2, UseWheelCallback, WheelEventType } from "./types"
import { clamp } from "@social-hustle/utils-numbers"

const LINE_HEIGHT = 40
const PAGE_HEIGHT = 800

type DomTargetTypes = Array<Window | Document | HTMLElement>

/**
 * Attach single document / window event / HTMLElement
 */
function attachEvent(domTargets: DomTargetTypes, callback: (e: any) => void, capture: any = false) {
  domTargets.forEach((target) => {
    target.addEventListener("wheel", callback, capture)
  })

  return function () {
    domTargets.forEach((target) => {
      target.removeEventListener("wheel", callback, capture)
    })
  }
}

export class WheelGesture {
  currentIndex?: number
  lastTimeStamp: number = Date.now()
  isActive: boolean = false
  targetElement?: HTMLElement // represents the bounded element
  targetElements: Array<HTMLElement> = [] // represents the bounded elements
  callback?: (event: WheelEventType) => void
  _subscribe?: (eventKeys?: Array<string>) => void
  static _VELOCITY_LIMIT: number = 20

  isActiveID?: any
  movement: Vector2 = { x: 0, y: 0 }
  previousMovement: Vector2 = { x: 0, y: 0 }
  direction: Vector2 = { x: 0, y: 0 }
  velocity: Vector2 = { x: 0, y: 0 }
  delta: Vector2 = { x: 0, y: 0 }

  // Holds offsets
  offset: Vector2 = { x: 0, y: 0 }
  translation: Vector2 = { x: 0, y: 0 }

  // @override
  // initialize the events
  _initEvents() {
    if (this.targetElement) {
      this._subscribe = attachEvent([this.targetElement], this.onWheel.bind(this))
    }
  }

  _handleCallback() {
    if (this.callback) {
      this.callback({
        target: this.targetElement,
        isWheeling: this.isActive,
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

  // cancel events
  // we only canceled down and move events because mouse up
  // will not be triggered
  _cancelEvents() {
    if (this._subscribe) {
      this._subscribe()
    }
  }

  // re-apply new callback
  applyCallback(callback: UseWheelCallback) {
    this.callback = callback
  }

  // apply gesture
  applyGesture({
    targetElement,
    targetElements,
    callback,
  }: {
    targetElement?: any
    targetElements?: any
    callback: <T>(event: T) => void
  }) {
    this.targetElement = targetElement
    this.targetElements = targetElements.map((element: { current: any }) => element.current)
    this.callback = callback

    // initialize events
    this._initEvents()

    // unbind
    return () => this._subscribe && this._subscribe()
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
      this._handleCallback()

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

    this._handleCallback()
  }
}
