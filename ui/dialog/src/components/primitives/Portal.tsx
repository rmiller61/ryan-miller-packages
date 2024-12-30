import * as DialogPrimitive from "@radix-ui/react-dialog"
import type { DialogPortalProps } from "@radix-ui/react-dialog"
import { cn } from "@social-hustle/utils-classnames"

export type { DialogPortalProps } from "@radix-ui/react-dialog"

/**
 *
 * Inserted into the DOM when the dialog is triggered.
 */
export const DialogPortal = ({ className, children, ...props }: DialogPortalProps) => (
  <DialogPrimitive.Portal {...props}>
    <div className={cn("dialog", className)}>{children}</div>
  </DialogPrimitive.Portal>
)
DialogPortal.displayName = DialogPrimitive.Portal.displayName
