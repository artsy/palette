import { Text } from "@artsy/palette"
import * as React from "react"

export interface CulturalBadgeProps {
  badgeCategory: string
}

export const CulturalBadge: React.FC<CulturalBadgeProps> = ({ children }) => {
  return (
    <Text backgroundColor="black100" color="white100" width={100}>
      {children}
    </Text>
  )
}
