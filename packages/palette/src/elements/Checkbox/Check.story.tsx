import React from "react"
import { States } from "storybook-states"
import { Check } from "./Check"

export default {
  title: "Components/Check",
}

export const Default = () => {
  return (
    <States
      states={[
        {},
        { selected: true },
        { focus: true },
        { focus: true, selected: true },
        { hover: true },
        { hover: true, selected: true },
        { disabled: true },
        { disabled: true, selected: true },
        { error: true },
        { error: true, selected: true },
      ]}
    >
      <Check />
    </States>
  )
}
