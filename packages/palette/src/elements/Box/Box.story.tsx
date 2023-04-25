import React from "react"
import { States } from "storybook-states"
import { Box, BoxProps } from "../Box"

export default {
  title: "Components/Box",
}

export const Stack = () => {
  return (
    <States<BoxProps> states={[{}, { gap: 1 }, { gap: 2 }, { gap: [2, 4] }]}>
      <Box display="flex" flexDirection="column">
        <Box bg="yellow100">1</Box>
        <Box bg="yellow100">2</Box>
        <Box bg="yellow100">3</Box>
        <Box bg="yellow100">4</Box>
        <Box bg="yellow100">5</Box>
        <Box bg="yellow100">6</Box>
      </Box>
    </States>
  )
}
