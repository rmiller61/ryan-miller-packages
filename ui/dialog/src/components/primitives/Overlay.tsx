import * as DialogPrimitive from "@radix-ui/react-dialog"
import cn from "@social-hustle/utils-classnames"
import { forwardRef } from "react"

export type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>

export type DialogOverlayElement = React.ElementRef<typeof DialogPrimitive.Overlay>

/**
 * A layer that covers the inert portion of the view when the dialog is open.
 */
export const DialogOverlay = forwardRef<DialogOverlayElement, DialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "dialogOverlay data-[state=closed]:dialogOverlay-animateOut data-[state=open]:dialogOverlay-animateIn",
        className
      )}
      {...props}
    />
  )
)
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName
