import { DialogClose, type DialogCloseProps } from "./primitives/Close"
import { DialogContent, type DialogContentProps } from "./primitives/Content"
import { DialogDescription, type DialogDescriptionProps } from "./primitives/Description"
import { DialogOverlay, type DialogOverlayProps } from "./primitives/Overlay"
import type { DialogPortalProps } from "./primitives/Portal"
import { DialogPortal } from "./primitives/Portal"
import { DialogTitle, type DialogTitleProps } from "./primitives/Title"

export type DialogContentComponentProps = Omit<DialogContentProps, "title"> & {
  title: string | React.ReactElement<DialogTitleProps>
  description?: string | React.ReactElement<DialogDescriptionProps>
  closeProps?: DialogCloseProps
  overlayProps?: DialogOverlayProps
  portalProps?: DialogPortalProps
}

export const Content = ({
  children,
  title,
  description,
  closeProps,
  overlayProps,
  portalProps,
  ...props
}: DialogContentComponentProps) => (
  <DialogPortal {...portalProps}>
    <DialogOverlay {...overlayProps} />
    <DialogContent {...props}>
      <DialogClose {...closeProps} />
      <DialogTitle visuallyHidden={typeof title === "string"}>{title}</DialogTitle>
      {description && (
        <DialogDescription visuallyHidden={typeof description === "string"}>
          {description}
        </DialogDescription>
      )}
      {children}
    </DialogContent>
  </DialogPortal>
)
