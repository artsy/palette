import React from "react"
import { Flex, Box, Text, themeProps, useTheme } from "@artsy/palette"

export const ColorComponent = (props) => {
  const { theme } = useTheme()

  return (
    <Flex mb={3}>
      <Box width={50} height={50} bg={props.color} mr={1} borderRadius="50%" />
      <Box>
        <Text variant="sm">{props.color}</Text>
        <Text variant="md">
          {theme.colors.hasOwnProperty(`${props.color}`)
            ? theme.colors[`${props.color}`]
            : ""}
        </Text>
      </Box>
    </Flex>
  )
}
