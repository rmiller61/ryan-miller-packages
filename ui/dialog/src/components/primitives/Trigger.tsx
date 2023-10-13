import * as DialogPrimitive from "@radix-ui/react-dialog"
import { forwardRef } from "react"

export type DialogTriggerProps = Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>,
  "children"
> & {
  children: JSX.Element
}

export type DialogTriggerElement = React.ElementRef<typeof DialogPrimitive.Trigger>

/**
 * The button that opens the dialog.
 */
export const DialogTrigger = forwardRef<DialogTriggerElement, DialogTriggerProps>(
  ({ children, ...props }, ref) => (
    <DialogPrimitive.Trigger
      {...props}
      ref={ref}
    >
      {children}
    </DialogPrimitive.Trigger>
  )
)
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName
