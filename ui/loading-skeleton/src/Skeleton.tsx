import { arrayFromNumber } from "@social-hustle/utils-arrays"
import cn from "@social-hustle/utils-classnames"
import type { ComponentProps, PropsWithChildren, FunctionComponent, CSSProperties } from "react"
import { Fragment } from "react"

export interface SkeletonProps extends ComponentProps<"div"> {
  count?: number
  wrapper?: FunctionComponent<PropsWithChildren<unknown>>
  height?: string
  width?: string
}

export function Skeleton({
  className,
  height = "1rem",
  width = "100%",
  wrapper: Wrapper = Fragment,
  count = 1,
  style,
  ...props
}: SkeletonProps) {
  return (
    <Wrapper>
      {arrayFromNumber(count).map((i) => (
        <div
          {...props}
          key={i}
          style={
            {
              ...style,
              "--loading-skeleton-height": height,
              "--loading-skeleton-width": width,
            } as CSSProperties
          }
          className={cn("loading-skeleton", className)}
          aria-live="polite"
          aria-busy={true}
        />
      ))}
    </Wrapper>
  )
}
