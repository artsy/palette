import React from "react"
import { States } from "storybook-states"
import { Badge, BadgeProps } from "../Badge/Badge"

export default {
  title: "Components/Cultural Badge",
}

export const Default = () => {
  return (
    <States<BadgeProps> states={[{ badgeCategory: "Black Owned" }]}>
      <Badge badgeCategory="Black Owned" />
    </States>
  )
}
