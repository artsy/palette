import { action } from "@storybook/addon-actions"
import React, { useReducer } from "react"
import { States } from "storybook-states"
import { MultiSelect, MultiSelectProps } from "./MultiSelect"

export default {
  title: "Components/MultiSelect",
}

const OPTIONS = [
  { text: "Painting", value: "painting" },
  { text: "Print", value: "print" },
  { text: "Sculpture", value: "sculpture" },
  { text: "Photography", value: "photography" },
  { text: "Mixed Media", value: "mixed-media" },
]

export const Default = () => {
  return (
    <States<Partial<MultiSelectProps>>
      states={[
        {},
        { focus: true },
        { hover: true },
        { error: "Something went wrong." },
        { disabled: true },
        { title: "Medium", name: "Select" },
        { title: "Medium", name: "Select", required: true },
        {
          title: "Medium",
          name: "Select",
          description: "Materials or support",
        },
      ]}
    >
      <MultiSelect
        name="Medium"
        options={OPTIONS}
        onSelect={action("onSelect")}
      />
    </States>
  )
}

export const Example = () => {
  const [filters, setFilter] = useReducer(
    (state, newFilter) => ({ ...state, ...newFilter }),
    {}
  )

  return (
    <>
      <pre>{JSON.stringify(filters)}</pre>

      <MultiSelect
        options={OPTIONS}
        name="Size"
        onSelect={(sizes) => {
          setFilter({ sizes: sizes.map((size) => size.value) })
        }}
      />
    </>
  )
}
