import { useWheel } from "."
import { render, screen, fireEvent } from "@testing-library/react"
import { renderHook, act } from "@testing-library/react-hooks"
import { it, describe, expect, vi } from "vitest"
import "@testing-library/jest-dom/extend-expect"
import * as React from "react"

const WheelDemo = () => {
  const [left, setLeft] = React.useState(0)
  const ref = useWheel(function (params) {
    //console.log(params)
    setLeft(params.movementX)
  })
  return (
    <div
      ref={ref}
      data-testid={"block"}
      style={{
        width: 100,
        height: 100,
        backgroundColor: "#3399ff",
        position: "absolute",
        left,
        top: 0,
      }}
    />
  )
}

describe("useWheel", () => {
  it("should move the block when wheeling", () => {
    const { getByTestId } = render(<WheelDemo />)
    const block = getByTestId("block")
    fireEvent.wheel(block, { deltaX: 500 })
    //console.log(block.style)
    expect(block).toHaveStyle({ left: "500px" })
  })
})
