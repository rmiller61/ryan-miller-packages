import cn from "@social-hustle/utils-classnames"
import * as React from "react"
import ReactDatePicker from "react-datepicker"

type DatePickerProps = React.ComponentProps<typeof ReactDatePicker>

const DatePicker = React.forwardRef<ReactDatePicker, DatePickerProps>((props, ref) => {
  return (
    <ReactDatePicker
      {...props}
      ref={ref}
      //className={cn("input-datepicker", props.className)}
      wrapperClassName="react-datepicker-wrapper"
    />
  )
})

export { type DatePickerProps, DatePicker }
