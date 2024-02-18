import { useWheel } from "."
import type { TransitionValueConfig } from "@raidipesh78/re-motion"
import { makeAnimatedComponent, useTransition } from "@raidipesh78/re-motion"
import type { Meta, StoryObj } from "@storybook/react"

type Length = number | string

interface UseAnimatedValueConfig extends TransitionValueConfig {}

type AssignValue = {
  toValue: Length
  config?: UseAnimatedValueConfig
}
type ValueType = Length | AssignValue | ((update: (next: AssignValue) => Promise<any>) => void)

function useAnimatedValue(initialValue: Length, config?: UseAnimatedValueConfig) {
  const [animation, setAnimation] = useTransition(initialValue, {
    mass: 1,
    friction: 34,
    tension: 290,
    ...config,
  })

  const targetObject: {
    value: ValueType
    currentValue: number | string
  } = {
    value: animation as any,
    currentValue: animation.get(),
  }

  return new Proxy(targetObject, {
    set: function (_, key, value: ValueType) {
      if (key === "value") {
        if (typeof value === "number" || typeof value === "string") {
          setAnimation({ toValue: value })
        } else if (typeof value === "object" || typeof value === "function") {
          setAnimation(value)
        }

        return true
      }

      throw new Error("You cannot set any other property to animation node.")
    },
    get: function (_, key) {
      if (key === "value") {
        return animation
      }

      if (key === "currentValue") {
        return animation.get()
      }

      throw new Error("You cannot access any other property from animation node.")
    },
  })
}

const AnimatedBlock = makeAnimatedComponent("div")

const WheelDemo = () => {
  const left = useAnimatedValue(0)

  const bind = useWheel(function ({ movementX, isActive }) {
    left.value = isActive ? movementX : 0
  })
  return (
    <AnimatedBlock
      {...bind()} // bind here
      style={{
        width: 100,
        height: 100,
        backgroundColor: "#3399ff",
        position: "absolute",
        left: left.value,
        top: 0,
      }}
    />
  )
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "useWheel",
  component: WheelDemo,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof WheelDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
