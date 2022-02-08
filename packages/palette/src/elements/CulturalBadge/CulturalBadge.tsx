import { Box, Text } from "@artsy/palette"
import * as React from "react"

export interface CulturalBadgeProps {
  badgeCategory: string
}

export const CulturalBadge: React.FC<CulturalBadgeProps> = ({
  badgeCategory,
}) => {
  return (
    <>
      <Box backgroundColor={"black100"} width={100} mb={1}>
        <Text variant="xs" color="white" textAlign={"center"}>
          {badgeCategory}
        </Text>
      </Box>
    </>
  )
}
