import React from "react"
import { Box, BoxProps } from "../Box"
import { Text } from "../Text"

/**
 * `CardTag` is used for the Cards, and is controlled by their `tag` prop.
 * @deprecated
 */
export const CardTag: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box borderRadius={2} backgroundColor="white100" {...rest}>
      <Text variant="caption" px={1} py={0.3} color="black100">
        {children}
      </Text>
    </Box>
  )
}
