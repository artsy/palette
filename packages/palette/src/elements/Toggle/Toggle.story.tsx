import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { States } from "storybook-states"
import { Toggle } from "./Toggle"
import { Text } from "../Text"
import { Flex } from "../Flex"

export default {
  title: "Components/Toggle",
}

export const Default = () => {
  return (
    <States
      states={[
        {},
        { selected: true },
        { hover: true },
        { hover: true, selected: true },
        { disabled: true },
        { disabled: true, selected: true },
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
      <Flex>
        <Text px={1}>{isSelected ? "On" : "Off"} </Text>
        <Toggle
          selected={isSelected}
          onSelect={(selected) => {
            setSelected(selected)
            action("onClick")(selected)
          }}
        >
          Example
        </Toggle>
      </Flex>
    </States>
  )
}
