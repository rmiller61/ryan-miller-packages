import * as SliderPrimitive from "@radix-ui/react-slider"
import cn from "@social-hustle/utils-classnames"
import * as React from "react"

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  trackClassName?: string
  thumbClassName?: string
  rangeClassName?: string
  thumbCount?: number
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    { className, trackClassName, thumbClassName, rangeClassName, thumbCount = 1, ...props },
    ref
  ) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("input-slider", className)}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn("relative h-2 w-full grow overflow-hidden rounded-full", trackClassName)}
      >
        <SliderPrimitive.Range className={cn("absolute h-full", rangeClassName)} />
      </SliderPrimitive.Track>
      {Array.from(Array(thumbCount).keys()).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={cn(
            "block h-5 w-5 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            thumbClassName
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider, type SliderProps }
