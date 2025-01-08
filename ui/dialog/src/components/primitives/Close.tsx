import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@social-hustle/utils-classnames"
import { forwardRef } from "react"
import { IoMdClose } from "react-icons/io"

type IconProps = React.ComponentProps<"svg">

export type DialogCloseProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close> & {
  icon?: (props: IconProps) => JSX.Element
  iconProps?: IconProps
  label?: string
}

export type DialogCloseElement = React.ElementRef<typeof DialogPrimitive.Close>

/**
 * The button that closes the dialog.
 */
export const DialogClose = forwardRef<DialogCloseElement, DialogCloseProps>(
  (
    {
      className,
      label = "Close",
      children,
      icon: Icon = IoMdClose,
      iconProps,
      title = "Close",
      ...props
    },
    ref
  ) => {
    return (
      <DialogPrimitive.Close
        ref={ref}
        className={cn("dialogClose", className)}
        aria-label={label}
        {...props}
      >
        <Icon {...iconProps} />
        <span className="sr-only">{title}</span>
      </DialogPrimitive.Close>
    )
  }
)
DialogClose.displayName = DialogPrimitive.Close.displayName
