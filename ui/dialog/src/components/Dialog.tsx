import { DialogContext } from "../constants"
import type {
  DialogTitleProps,
  DialogDescriptionProps,
  DialogRootProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogContentProps,
  DialogCloseProps,
} from "../types"
import { Content } from "./Content"
import { DialogRoot } from "./primitives/Root"
import { DialogTrigger } from "./primitives/Trigger"
import { useState, useMemo } from "react"

export type DialogPropsExtra = {
  content: React.ReactNode
  title: string | React.ReactElement<DialogTitleProps>
  description?: string | React.ReactElement<DialogDescriptionProps>
  contentProps?: DialogContentProps
  overlayProps?: DialogOverlayProps
  portalProps?: DialogPortalProps
  closeProps?: DialogCloseProps
} & (
  | {
      controlled?: false
      children: JSX.Element
    }
  | {
      controlled: true
      children: React.ReactNode
    }
)

export type DialogProps = Omit<DialogRootProps, keyof DialogPropsExtra> & DialogPropsExtra

export const Dialog = ({
  content,
  controlled,
  contentProps,
  title,
  description,
  overlayProps,
  portalProps,
  closeProps,
  children,
}: DialogProps) => {
  const [open, setOpen] = useState(false)

  const value = useMemo(
    () => ({
      open,
      setOpen,
    }),
    [open, setOpen]
  )

  return (
    <DialogContext.Provider value={value}>
      <DialogRoot
        open={open}
        onOpenChange={setOpen}
      >
        {controlled ? <>{children}</> : <DialogTrigger asChild>{children}</DialogTrigger>}
        <Content
          {...contentProps}
          title={title}
          description={description}
          overlayProps={overlayProps}
          portalProps={portalProps}
          closeProps={closeProps}
        >
          {content}
        </Content>
      </DialogRoot>
    </DialogContext.Provider>
  )
}
