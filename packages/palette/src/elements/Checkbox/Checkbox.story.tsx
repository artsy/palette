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
        { disabled: true },
        { error: true },
        { selected: true, disabled: true },
        { error: true, disabled: true },
        { selected: true, error: true, disabled: true },
      ]}
    >
      <Checkbox>
        <Text>A label</Text>
      </Checkbox>
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
        <Text lineHeight="solid">
          use a `solid` line-height to ensure vertical centering
        </Text>
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
            <Text lineHeight="solid">Purple</Text>
            <Box bg="purple100" width={20} height={20} borderRadius="50%" />
          </Flex>
        </Checkbox>
      </Box>
    </States>
  )
}
