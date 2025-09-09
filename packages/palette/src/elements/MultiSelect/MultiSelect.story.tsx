import { fn } from "@storybook/test"
import React, { useReducer } from "react"
import { MultiSelect } from "./MultiSelect"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  title: "Components/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  parameters: {
    docs: {
      controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
    },
  },
}

const OPTIONS = [
  { text: "Painting", value: "painting" },
  { text: "Print", value: "print" },
  { text: "Sculpture", value: "sculpture" },
  { text: "Photography", value: "photography" },
  { text: "Mixed Media", value: "mixed-media" },
]

export const Default = {
  args: {
    name: "Medium",
    options: OPTIONS,
    onSelect: fn(),
  },
}

export const Focus = {
  args: {
    name: "Medium",
    options: OPTIONS,
    onSelect: fn(),
    focus: true,
  },
}

export const Hover = {
  args: {
    name: "Medium",
    options: OPTIONS,
    onSelect: fn(),
    hover: true,
  },
}

export const Complete = {
  args: {
    name: "Medium",
    options: OPTIONS,
    onSelect: fn(),
    complete: true,
  },
}

export const WithError = {
  args: {
    name: "Medium",
    options: OPTIONS,
    onSelect: fn(),
    error: "Something went wrong.",
  },
}

export const Disabled = {
  args: {
    name: "Medium",
    options: OPTIONS,
    onSelect: fn(),
    disabled: true,
  },
}

export const WithTitle = {
  args: {
    name: "Select",
    title: "Medium",
    options: OPTIONS,
    onSelect: fn(),
  },
}

export const Required = {
  args: {
    name: "Select",
    title: "Medium",
    options: OPTIONS,
    onSelect: fn(),
    required: true,
  },
}

export const WithDescription = {
  args: {
    name: "Select",
    title: "Medium",
    description: "Materials or support",
    options: OPTIONS,
    onSelect: fn(),
  },
}

export const WithStateTracking = {
  args: {
    name: "Size",
    options: OPTIONS,
  },
  render: (args) => {
    const [filters, setFilter] = useReducer(
      (state, newFilter) => ({ ...state, ...newFilter }),
      {}
    )

    return (
      <>
        <pre>{JSON.stringify(filters)}</pre>

        <MultiSelect
          {...args}
          onSelect={(sizes) => {
            setFilter({ sizes: sizes.map((size) => size.value) })
          }}
        />
      </>
    )
  },
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
