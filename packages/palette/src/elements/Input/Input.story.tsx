import React from "react"
import { States } from "storybook-states"
import { Input, InputProps } from "./Input"

export default {
  title: "Components/Input",
}

export const Default = () => {
  return (
    <States<InputProps>
      states={[
        {},
        { focus: true },
        { hover: true },
        { error: "Something went wrong." },
        { disabled: true },
        { title: "Your offer" },
        { title: "Your offer", required: true },
        { title: "Your offer", description: "This is my description" },
        { width: "50%" },
      ]}
    >
      <Input placeholder="Start typing…" />
    </States>
  )
}
