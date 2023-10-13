import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { forwardRef, Fragment } from "react"

export type DialogTitleProps = Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>,
  "asChild"
> & {
  visuallyHidden?: boolean
}

export type DialogTitleElement = React.ElementRef<typeof DialogPrimitive.Title>

/**
 * An accessible title to be announced when the dialog is opened.
 */
export const DialogTitle = forwardRef<DialogTitleElement, DialogTitleProps>(
  ({ visuallyHidden = true, ...props }, ref) => {
    const Wrapper = visuallyHidden ? VisuallyHidden.Root : Fragment
    const asChild = !visuallyHidden
    return (
      <Wrapper>
        <DialogPrimitive.Title
          {...props}
          ref={ref}
          asChild={asChild}
        />
      </Wrapper>
    )
  }
)

DialogTitle.displayName = DialogPrimitive.Title.displayName
