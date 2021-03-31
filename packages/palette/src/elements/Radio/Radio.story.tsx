import React from "react"
import { States } from "storybook-states"
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
        { hover: true },
        { hover: true, selected: true },
        { disabled: true },
        { disabled: true, selected: true },
        { error: true },
        { error: true, selected: true },
        { label: "A label", children: "This is my description" },
        {
          label: (
            <Text variant="small" color="blue100">
              Small Custom Label
            </Text>
          ),
        },
        { label: <Text variant="subtitle">Large Custom Label</Text> },
      ]}
    >
      <Radio>A label</Radio>
    </States>
  )
}
