import React from "react"
import { States } from "storybook-states"
import { Text } from "../Text"
import { Sup, SupProps } from "./Sup"

export default {
  component: Sup,
  title: "Components/Sup",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A superscript text component with different size variants for adding small text above the baseline.",
      },
    },
    controls: {
      include: ["variant", "color", "children"],
    },
  },
}

export const Default = () => {
  return (
    <States<SupProps>
      states={[
        { variant: "xxl" },
        { variant: "xl" },
        { variant: "lg" },
        { variant: "md" },
        { variant: "sm" },
      ]}
    >
      <Text>
        Lorem Ipsum <Sup color="blue100">123</Sup>
      </Text>
    </States>
  )
}
