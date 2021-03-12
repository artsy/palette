import React from "react"
import { States } from "storybook-states"
import { Select, SelectProps } from "./Select"

export default {
  title: "Components/Select",
}

const OPTIONS = [
  { text: "First", value: "firstValue" },
  { text: "Middle", value: "middleValue" },
  { text: "Last", value: "lastValue" },
]

export const Default = () => {
  return (
    <States<Partial<SelectProps>>
      states={[
        // variant="default"
        {},
        { focus: true },
        { hover: true },
        { error: "Something went wrong." },
        { disabled: true },

        // variant="inline"
        { variant: "inline" },
        { variant: "inline", focus: true },
        { variant: "inline", hover: true },
        { variant: "inline", error: "Something went wrong." },
        { variant: "inline", disabled: true },
        { variant: "inline", title: "Sort:" },
        {
          variant: "inline",
          title: "Sort:",
          description: "A description of sorting",
        },

        // variant="default"
        { selected: "lastValue" },
        { title: "Pick something" },
        { title: "Pick something", required: true, id: "pick" },
        { title: "Pick something", description: "This matters a lot." },
      ]}
    >
      <Select options={OPTIONS} />
    </States>
  )
}
