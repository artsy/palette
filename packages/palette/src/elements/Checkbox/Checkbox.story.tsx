import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { Text } from "../Text"
import { Checkbox } from "./Checkbox"

export default {
  title: "Components/Checkbox",
}

export const States = () => {
  const states = [{}, { selected: true }, { disabled: true }, { error: true }]
  return (
    <>
      {states.map((props, i) => {
        return (
          <Checkbox key={i} {...props}>
            <Text>a label ({JSON.stringify(props)})</Text>
          </Checkbox>
        )
      })}
    </>
  )
}

export const Demo = () => {
  const [isSelected, setSelected] = useState(false)
  return (
    <Checkbox
      selected={isSelected}
      onSelect={(selected) => {
        setSelected(selected)
        action("onClick")(selected)
      }}
    >
      <Text>click me</Text>
    </Checkbox>
  )
}
