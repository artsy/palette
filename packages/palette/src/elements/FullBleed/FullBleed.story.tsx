import React from "react"
import { Box } from "../Box"
import { Text } from "../Text"
import { FullBleed } from "./FullBleed"

export default { title: "Components/FullBleed" }

export const Example = () => {
  return (
    <Box px={2}>
      <Text variant="md" mb={1}>
        Notice the padding on the container, yet the box below exceeds its
        bounds?
      </Text>
      <FullBleed>
        <Box py={1} width="100%" height={40} backgroundColor="black10" />
      </FullBleed>
    </Box>
  )
}
