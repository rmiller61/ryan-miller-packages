import cn from "@social-hustle/utils-classnames"
import type { ComponentProps } from "react"

export function LoadingSkeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("loading-skeleton", className)}
      {...props}
    />
  )
}
