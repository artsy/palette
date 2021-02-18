import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Text } from "../Text"
import { Checkbox } from "./Checkbox"

export default {
  title: "Components/Checkbox",
}

export const States = () => {
  const states = [
    {},
    { selected: true },
    { disabled: true },
    { error: true },
    { selected: true, disabled: true },
    { error: true, disabled: true },
    { selected: true, error: true, disabled: true },
  ]

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
    <Box height="200vh">
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
    </Box>
  )
}

export const Extended = () => {
  return (
    <Box width={300} border="1px solid" borderColor="black10" p={2}>
      <Checkbox width="100%">
        <Flex width="35%" justifyContent="space-between" alignItems="center">
          <Text lineHeight="solid">Purple</Text>
          <Box bg="purple100" width={20} height={20} borderRadius="50%" />
        </Flex>
      </Checkbox>
    </Box>
  )
}
