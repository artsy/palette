import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { States } from "storybook-states"
import { Toggle } from "./Toggle"

export default {
  title: "Components/Toggle",
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
      <Toggle />
    </States>
  )
}

export const Demo = () => {
  const [isSelected, setSelected] = useState(false)
  return (
    <States>
      <Toggle
        selected={isSelected}
        onSelect={(selected) => {
          setSelected(selected)
          action("onClick")(selected)
        }}
      >
        Example
      </Toggle>
    </States>
  )
}
