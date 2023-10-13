import { Dialog } from "./Dialog"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "Something Else",
  argTypes: {},
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <>
      <Dialog
        title="Dialog 1"
        content={<>Dialog 1 content</>}
        contentProps={{
          className: "bg-white p-5 sm:max-w-[425px]",
        }}
      >
        <button>Open Dialog 1</button>
      </Dialog>
      <Dialog
        title="Dialog 2"
        content={<>Dialog 2 content</>}
        contentProps={{
          className: "bg-white p-5 sm:max-w-[425px]",
        }}
      >
        <button>Open Dialog 2</button>
      </Dialog>
    </>
  ),
}
