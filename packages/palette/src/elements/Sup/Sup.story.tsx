import React from "react"
import { States } from "storybook-states"
import { Text } from "../Text"
import { Sup, SupProps } from "./Sup"

export default {
  title: "Components/Sup",
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
