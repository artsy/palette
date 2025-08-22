import React from "react"
import { States } from "storybook-states"
import { SelectInputList, SelectInputListProps } from "./SelectInputList"

export default {
  title: "Components/SelectInputList",
}

const EXAMPLE_COUNTRIES = [
  {
    text: "🇦🇫 +93",
    name: "Afghanistan",
    value: "af",
    countryCode: "+93",
    flag: "🇦🇫",
  },
  // ...rest of country objects...
]

export const Default = {
  args: {
    options: EXAMPLE_COUNTRIES,
  },
  render: (args) => (
    <States<Partial<SelectInputListProps>> states={[{}]}>
      <SelectInputList
        {...args}
        onSelect={(option) => console.log(option)}
        onClose={() => console.log("close")}
      />
    </States>
  ),
  parameters: {
    controls: { include: ["options"] },
    docs: {
      description: {
        story: "Default SelectInputList with example countries.",
      },
    },
  },
}
