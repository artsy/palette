import React from "react"
import { Box, Sans } from "@artsy/palette"

export const ColorComponent = props => {
  return (
    <Box mb={3}>
      <Sans size="3" weight="medium">
        {props.color}
      </Sans>
      <Sans size="3">{props.hex}</Sans>
      <Box width="100%" height={5} bg={props.color} />
    </Box>
  )
}
