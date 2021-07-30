import { action } from "@storybook/addon-actions"
import React from "react"
import { States } from "storybook-states"
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
        { error: "Something went wrong." },
        { disabled: true },
        { title: "Note" },
        { title: "Note", required: true },
        { characterLimit: 10 },
        { name: "my-text-area" },
        {
          name: "my-text-area",
          title: "Note",
          description: "This is my description",
        },
        { defaultValue: "A default value" },
      ]}
    >
      <TextArea placeholder="Start typing..." onChange={action("onChange")} />
    </States>
  )
}
