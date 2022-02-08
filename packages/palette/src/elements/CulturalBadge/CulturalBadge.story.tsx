import React from "react"
import { States } from "storybook-states"
import {
  CulturalBadge,
  CulturalBadgeProps,
} from "../CulturalBadge/CulturalBadge"

export default {
  title: "Components/Cultural Badge",
}

export const Default = () => {
  return (
    <States<CulturalBadgeProps> states={[{ badgeCategory: "Black Owned" }]}>
      <CulturalBadge badgeCategory="Black Owned" />
    </States>
  )
}
