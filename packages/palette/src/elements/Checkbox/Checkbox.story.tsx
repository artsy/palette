import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { States } from "storybook-states"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Text } from "../Text"
import { Checkbox } from "./Checkbox"

export default {
  title: "Components/Checkbox",
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
        { error: true },
        { error: true, selected: true },
      ]}
    >
      <Checkbox>A label</Checkbox>
    </States>
  )
}

export const Demo = () => {
  const [isSelected, setSelected] = useState(false)
  return (
    <States>
      <Checkbox
        selected={isSelected}
        onSelect={(selected) => {
          setSelected(selected)
          action("onClick")(selected)
        }}
      >
        Example
      </Checkbox>
    </States>
  )
}

export const Extended = () => {
  return (
    <States>
      <Box width={300}>
        <Checkbox width="100%">
          <Flex width="35%" justifyContent="space-between" alignItems="center">
            <Text lineHeight={1}>Green</Text>
            <Box bg="green" width={20} height={20} borderRadius="50%" />
          </Flex>
        </Checkbox>
      </Box>
    </States>
  )
}
