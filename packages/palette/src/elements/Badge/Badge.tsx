import { Text } from "@artsy/palette"
import * as React from "react"

export interface BadgeProps {
  badgeCategory: string
}

export const Badge: React.FC<BadgeProps> = ({ children }) => {
  return (
    <Text backgroundColor="black100" color="white100" width={100}>
      {children}
    </Text>
  )
}
