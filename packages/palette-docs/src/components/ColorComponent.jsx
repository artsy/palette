import React from "react"
import { Box, Sans, themeProps } from "@artsy/palette"

export const ColorComponent = props => {
  return (
    <Box mb={3}>
      <Sans size="3" weight="medium">
        {props.color}
      </Sans>
      <Sans size="3">
        {themeProps.colors.hasOwnProperty(`${props.color}`)
          ? themeProps.colors[`${props.color}`]
          : ""}
      </Sans>
      <Box width="100%" height={5} bg={props.color} />
    </Box>
  )
}
