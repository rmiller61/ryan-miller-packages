/* eslint-disable react-hooks/rules-of-hooks */

import { DatePicker, type DatePickerProps } from "."
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Special/DatePicker",
  component: DatePicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: "",
  },
  render: (props) => {
    const [startDate, setStartDate] = useState(new Date())
    return (
      <DatePicker
        {...props}
        selected={startDate}
        onChange={(date) => {
          if (date && date instanceof Date) setStartDate(date)
        }}
      />
    )
  },
}

export const Range: Story = {
  args: {
    className: "",
  },
  render: (props) => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(null)
    const onChange = (dates) => {
      const [start, end] = dates
      setStartDate(start)
      setEndDate(end)
    }
    return (
      <DatePicker
        {...props}
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    )
  },
}
