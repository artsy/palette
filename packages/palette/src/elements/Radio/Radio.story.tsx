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
        {
          label: "A label that takes up multiple lines",
          width: "200px",
          children: "This is my description",
        },
        {
          label: "A small sized radio",
          size: "sm",
          children: "This is my description",
        },
        {
          label: "A medium sized radio",
          size: "md",
          children: "This is my description",
        },
        {
          label: "A large sized radio",
          size: "lg",
          children: "This is my description",
        },
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
        <Text variant="sm-display">Label</Text>

        <Text variant="xs" color="black60">
          Subtitle
        </Text>
      </Flex>
    </Radio>
  )
}
