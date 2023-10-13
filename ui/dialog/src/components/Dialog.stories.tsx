import { Dialog } from "./Dialog"
import { DialogTrigger } from "./primitives/Trigger"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import cn from "@social-hustle/utils-classnames"
import type { Meta, StoryObj } from "@storybook/react"
import { useCloseDialog, useOpenDialog } from "hooks"
import * as React from "react"

const Inputs = () => (
  <>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <label
          htmlFor="name"
          className="text-right"
        >
          Name
        </label>
        <input
          id="name"
          value="Pedro Duarte"
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <label
          htmlFor="username"
          className="text-right"
        >
          Username
        </label>
        <input
          id="username"
          value="@peduarte"
          className="col-span-3"
        />
      </div>
    </div>
  </>
)

const Form1 = () => {
  const closeDialog = useCloseDialog()
  return (
    <form
      onSubmit={(event) => {
        closeDialog()
        event.preventDefault()
      }}
    >
      <Inputs />
      <button
        className="border border-black px-5 py-3"
        type="submit"
      >
        Save
      </button>
    </form>
  )
}

const Form2 = () => {
  const openDialog = useOpenDialog()
  return (
    <form
      onSubmit={(event) => {
        openDialog()
        event.preventDefault()
      }}
    >
      <Inputs />
      <button
        className="border border-black px-5 py-3"
        type="submit"
      >
        Save
      </button>
    </form>
  )
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Dialog",
  component: Dialog,
  argTypes: {},
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <button className="border border-black px-5 py-3">Edit Profile</button>,
    title: "Edit Profile",
    contentProps: {
      className: "bg-white p-5 sm:max-w-[425px]",
    },
    content: <Inputs />,
  },
}

export const WithTitle: Story = {
  args: {
    children: <button className="border border-black px-5 py-3">Edit Profile</button>,
    title: <h4>Edit profile</h4>,
    contentProps: {
      className: "bg-white p-5 sm:max-w-[425px]",
    },
    content: <Inputs />,
  },
}

export const WithTitleAndDescription: Story = {
  args: {
    children: <button className="border border-black px-5 py-3">Edit Profile</button>,
    title: <h4>Edit profile</h4>,
    description: <p>{`Make changes to your profile here. Click save when you're done.`}</p>,
    contentProps: {
      className: "bg-white p-5 sm:max-w-[425px]",
    },
    content: <Inputs />,
  },
}

export const WithOverflow: Story = {
  args: {
    children: <button className="border border-black px-5 py-3">Edit Profile</button>,
    title: "Overflowing content",
    content: (
      <div className="max-h-[400px] overflow-y-auto bg-white p-5 sm:max-w-[425px]">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
          voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
          cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
          est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam
          libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
          maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
          Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
          ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
          tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
          perferendis doloribus asperiores repellat.
        </p>
      </div>
    ),
    contentProps: {
      //className: "bg-white p-5 sm:max-w-[425px] overflow-y-auto max-h-[400px]",
    },
  },
}

export const TriggerClose: Story = {
  args: {
    children: <button className="border border-black px-5 py-3">Edit Profile</button>,
    title: "Edit Profile",
    contentProps: {
      className: "bg-white p-5 sm:max-w-[425px]",
    },
    content: <Form1 />,
  },
}

export const TriggerOpen: Story = {
  args: {
    controlled: true,
    children: <Form2 />,
    title: "Edit Profile",
    contentProps: {
      className: "bg-white p-5 sm:max-w-[425px]",
    },
    content: <h1>It worked!</h1>,
  },
}
