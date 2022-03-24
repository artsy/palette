import React from "react"
import { States } from "storybook-states"
import { Badge, BadgeProps } from "../Badge/Badge"
import { Box } from "../Box"

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

export const OverflowEllipsis = () => {
  return (
    <States<Partial<BadgeProps>>
      states={[
        {},
        { children: "LGBT+ Owned", variant: "brand" },
        { children: "Women Owned", variant: "defaultLight" },
      ]}
    >
      {({ children, ...rest }) => {
        return (
          <Box width={75} overflow="hidden">
            <Badge {...rest}>{children ?? "Black Owned"}</Badge>
          </Box>
        )
      }}
    </States>
  )
}
