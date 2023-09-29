import React from "react"
import { States } from "storybook-states"
import { Stack, StackProps } from "../Stack"
import { Box } from "../Box"

export default {
  title: "Components/Stack",
}

export const Default = () => {
  return (
    <States<StackProps>
      states={[
        { gap: 0 },
        { gap: 1 },
        { gap: 2, flexDirection: "row" },
        { gap: 2 },
        { gap: [2, 4] },
      ]}
    >
      <Stack gap={0}>
        <Box bg="yellow100">1</Box>
        <Box bg="yellow100">2</Box>
        <Box bg="yellow100">3</Box>
        <Box bg="yellow100">4</Box>
        <Box bg="yellow100">5</Box>
        <Box bg="yellow100">6</Box>
      </Stack>
    </States>
  )
}
