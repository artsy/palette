import { action } from "@storybook/addon-actions"
import React from "react"
import { States } from "storybook-states"
import { Button } from "../Button"
import { TextArea, TextAreaProps } from "./TextArea"

export default {
  title: "Components/TextArea",
}

export const Default = () => {
  return (
    <States<TextAreaProps>
      states={[
        {},
        { focus: true },
        { hover: true },
        { active: true },
        { error: "Something went wrong." },
        { disabled: true },
        { title: "Note" },
        { title: "Note", required: true },
        { characterLimit: 10 },
        { characterLimit: 10, defaultValue: "hello" },
        { characterLimit: 10, defaultValue: "hello world" },
        { name: "my-text-area" },
        {
          name: "my-text-area",
          title: "Note",
          description: "This is my description",
        },
        {
          defaultValue:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nam iste beatae reiciendis ea harum, aspernatur, eius, omnis eveniet corporis consequatur minima assumenda ipsum dolor dolorum perferendis animi distinctio eligendi?",
        },
      ]}
    >
      <TextArea placeholder="Start typing..." onChange={action("onChange")} />
    </States>
  )
}

export const Required = () => {
  return (
    <form>
      <TextArea
        mt={1}
        title="Example"
        required
        placeholder="Submission should be blocked unless this has a value"
      />

      <Button mt={1}>Submit</Button>
    </form>
  )
}
