import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { forwardRef, Fragment } from "react"

export type DialogDescriptionProps = Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>,
  "asChild"
> & {
  visuallyHidden?: boolean
}

export type DialogDescriptionElement = React.ElementRef<typeof DialogPrimitive.Description>

/**
 * An optional accessible description to be announced when the dialog is opened.
 */
export const DialogDescription = forwardRef<DialogDescriptionElement, DialogDescriptionProps>(
  ({ visuallyHidden = true, ...props }, ref) => {
    const Wrapper = visuallyHidden ? VisuallyHidden.Root : Fragment
    const asChild = !visuallyHidden
    return (
      <Wrapper>
        <DialogPrimitive.Description
          {...props}
          ref={ref}
          asChild={asChild}
        />
      </Wrapper>
    )
  }
)
DialogDescription.displayName = DialogPrimitive.Description.displayName
