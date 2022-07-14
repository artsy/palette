import React from "react"
import { States } from "storybook-states"
import { Flex } from "../Flex"
import { Text } from "../Text"
import { Radio, RadioProps } from "./Radio"

export default {
  title: "Components/Radio",
}

export const Default = () => {
  return (
    <States<RadioProps>
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
        { label: "A label", children: "This is my description" },
        {
          label: (
            <Text variant="xs" color="blue100">
              Small Custom Label
            </Text>
          ),
        },
        { label: <Text variant="lg-display">Large Custom Label</Text> },
      ]}
    >
      <Radio>A label</Radio>
    </States>
  )
}

export const SplitLabel = () => {
  return (
    <Radio>
      <Flex justifyContent="space-between" flex={1}>
        <Text variant="lg-display">Label</Text>

        <Text variant="xs" color="black60">
          Subtitle
        </Text>
      </Flex>
    </Radio>
  )
}
