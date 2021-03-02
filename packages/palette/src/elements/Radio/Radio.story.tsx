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
        { hover: true },
        { selected: true },
        { disabled: true },
        { disabled: true, selected: true },
        { hover: true, selected: true },
        { disabled: true, hover: true, selected: true },
        { label: "String Label" },
        {
          label: (
            <Text variant="small" color="red100">
              Small Custom Label
            </Text>
          ),
        },
        { label: <Text variant="subtitle">Large Custom Label</Text> },
      ]}
    >
      <Radio />
    </States>
  )
}
