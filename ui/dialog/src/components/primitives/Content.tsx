import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@social-hustle/utils-classnames"
import { forwardRef } from "react"

export type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>

export type DialogContentElement = React.ElementRef<typeof DialogPrimitive.Content>

/**
 * The content to be rendered in the open dialog.
 */
export const DialogContent = forwardRef<DialogContentElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <DialogPrimitive.Content
        {...props}
        ref={ref}
        className={cn(
          "data-[state=open]:dialogContent-animateIn data-[state=closed]:dialogContent-animateOut dialogContent",
          className
        )}
      >
        {children}
      </DialogPrimitive.Content>
    )
  }
)
DialogContent.displayName = DialogPrimitive.Content.displayName
