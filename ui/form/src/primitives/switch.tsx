"use client"

import * as SwitchPrimitives from "@radix-ui/react-switch"
import cn from "@social-hustle/utils-classnames"
import * as React from "react"

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  thumbClassName?: string
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, thumbClassName, ...props }, ref) => (
    <SwitchPrimitives.Root
      className={cn("input-switch", className)}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
          thumbClassName
        )}
      />
    </SwitchPrimitives.Root>
  )
)
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch, type SwitchProps }
