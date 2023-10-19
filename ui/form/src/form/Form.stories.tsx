import { Input } from "../primitives/input"
import { getZodKeys } from "../utils"
import {
  Form as FormComponent,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./index"
import type { Meta, StoryObj } from "@storybook/react"
import { z } from "zod"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const Form = ({ onSubmit }: { onSubmit: (values: z.infer<typeof FormSchema>) => void }) => {
  //console.log(FormSchema.shape["username"])

  console.log(getZodKeys(FormSchema))

  return (
    <FormComponent
      onSubmit={onSubmit}
      className="w-2/3 space-y-6"
      schema={FormSchema}
    >
      <FormField
        //control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                placeholder="shadcn"
                {...field}
              />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <button type="submit">Submit</button>
    </FormComponent>
  )
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Form",
  component: Form,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onSubmit: (values) => {
      console.log(values)
    },
  },
}
