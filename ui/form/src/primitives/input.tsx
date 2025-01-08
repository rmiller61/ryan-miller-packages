import { cn } from "@social-hustle/utils-classnames"
import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const classNameByType =
      type === "number" ? "input-number" : type === "password" ? "input-password" : "input-text"
    return (
      <input
        type={type}
        className={cn(classNameByType, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
