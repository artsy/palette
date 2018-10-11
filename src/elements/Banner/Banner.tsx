import React from "react"

import { space } from "../../helpers"
import { Box } from "../Box"
import { Sans } from "../Typography"

export interface BannerProps {
  message: string
}

/**
 * A banner
 */
export class Banner extends React.Component<BannerProps> {
  render() {
    return (
      <Box bg="red100" color="white100" p={space(2)} textAlign="center">
        <Sans size="2">{this.props.message}</Sans>
      </Box>
    )
  }
}
