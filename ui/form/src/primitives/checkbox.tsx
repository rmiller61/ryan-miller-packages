import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cn } from "@social-hustle/utils-classnames"
import * as React from "react"
import { BsCheck } from "react-icons/bs"

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  icon?: typeof BsCheck
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, icon: Check = BsCheck, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn("input-checkbox", className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, type CheckboxProps }
