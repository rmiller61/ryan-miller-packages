export const getCurrentBreakpoint = (arr: number[], windowWidth: number) => {
  let breakpoint = 0

  for (let i = 0; i < arr.length; i++) {
    // Set `current` to the window width we are currently evaluating
    let current = arr[i]
    // If 1. `current` is defined` and 2. `current` is less than the window width
    if (current && windowWidth >= current) {
      breakpoint = current
    }
  }

  return breakpoint
}

export const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}
