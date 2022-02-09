import React from "react"
import { States } from "storybook-states"
import { Badge, BadgeProps } from "../Badge/Badge"

export default {
  title: "Components/Badge",
}

export const Default = () => {
  return (
    <States<Partial<BadgeProps>>
      states={[
        {},
        { children: "LGBT+ Owned", variant: "brand" },
        { children: "Women Owned", variant: "defaultLight" },
      ]}
    >
      <Badge>Black Owned</Badge>
    </States>
  )
}
