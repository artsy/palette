import { Box, Sans } from "@artsy/palette"
import React from "react"

interface Props {
  status: string
}

export const StatusBadge: React.SFC<Props> = ({ status }) => {
  return (
    <Box pt="1px" px={0.3} display="inline-block" bg="yellow10">
      <Sans size="1" color="yellow100">
        {status.toUpperCase()}
      </Sans>
    </Box>
  )
}
