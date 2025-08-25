import { fn } from "@storybook/test"
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
        { complete: true },
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
      <MultiSelect name="Medium" options={OPTIONS} onSelect={fn()} />
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

export const CustomSelectionLogic = () => {
  const [selectedValue, setSelectedValue] = React.useState<string[]>([])

  const handleSelect = (selection) => {
    // If a new option is selected, only keep the most recently selected one
    if (selection.length > selectedValue.length) {
      const newlySelected = selection[selection.length - 1]
      setSelectedValue([newlySelected.value])
    } else {
      // If an option was deselected, clear the selection
      setSelectedValue([])
    }
  }

  return (
    <>
      <p>
        This MultiSelect behaves like a single select - selecting a new option
        deselects all others.
      </p>
      <pre>Selected: {JSON.stringify(selectedValue)}</pre>

      <MultiSelect
        options={OPTIONS}
        name="Select one medium"
        selected={selectedValue}
        onSelect={handleSelect}
      />
    </>
  )
}
