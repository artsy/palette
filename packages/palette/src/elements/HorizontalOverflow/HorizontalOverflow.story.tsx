import React from "react"
import { States } from "storybook-states"
import { Text } from ".."
import {
  HorizontalOverflow,
  HorizontalOverflowProps,
} from "./HorizontalOverflow"

export default {
  title: "Components/HorizontalOverflow",
}

export const Default = () => {
  return (
    <States<Partial<HorizontalOverflowProps>>
      states={[{}, { children: <Text variant="md">Not overflowing</Text> }]}
    >
      <HorizontalOverflow bg="black10" p={2}>
        {Array.from(Array(50)).map((_, i) => (
          <Text key={i} variant="md" color="black100" mr={2}>
            Example #{i}
          </Text>
        ))}
      </HorizontalOverflow>
    </States>
  )
}
