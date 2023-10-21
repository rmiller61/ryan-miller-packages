import cn from "@social-hustle/utils-classnames"
import * as React from "react"
import ReactDatePicker from "react-datepicker"

type DatePickerProps = React.ComponentProps<typeof ReactDatePicker>

const DatePicker = React.forwardRef<ReactDatePicker, DatePickerProps>((props, ref) => {
  return (
    <ReactDatePicker
      {...props}
      ref={ref}
    />
  )
})

export { type DatePickerProps, DatePicker }
