import { DatePicker as DefaultDatepicker, type DatePickerProps } from "."
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"

const DatePicker = (props: DatePickerProps) => {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <DefaultDatepicker
      {...props}
      selected={startDate}
      onChange={(date) => {
        if (date && date instanceof Date) setStartDate(date)
      }}
    />
  )
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Special/DatePicker",
  component: DatePicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    className: "",
  },
}
