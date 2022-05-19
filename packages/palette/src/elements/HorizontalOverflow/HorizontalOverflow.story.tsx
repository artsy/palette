import React from "react"
import { States } from "storybook-states"
import { Text, Box, Join, Spacer } from ".."
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
      states={[
        {},
        { children: <Text variant="sm-display">Not overflowing</Text> },
      ]}
    >
      <HorizontalOverflow bg="black10" p={2}>
        <Join separator={<Spacer mr={2} />}>
          {Array.from(Array(50)).map((_, i) => (
            <Text key={i} variant="sm-display" color="black100" mr={2}>
              Example #{i}
            </Text>
          ))}
        </Join>
      </HorizontalOverflow>
    </States>
  )
}

export const FillHeightCenteredContent = () => {
  return (
    <Box height={100} bg="red10">
      <HorizontalOverflow border="1px solid" p={2} height="100%">
        <Join separator={<Spacer mr={2} />}>
          {Array.from(Array(50)).map((_, i) => (
            <Text
              key={i}
              variant="sm-display"
              color="black100"
              display="flex"
              alignItems="center"
            >
              Example #{i}
            </Text>
          ))}
        </Join>
      </HorizontalOverflow>
    </Box>
  )
}
