import { action } from "@storybook/addon-actions"
import React from "react"
import { Sans } from "../Typography"
import { Clickable } from "./Clickable"

export default {
  title: "Components/Clickable",
}

export const Default = () => {
  return (
    <Clickable onClick={action("onClick")} p={3}>
      <Sans size="4">Click</Sans>
      <Sans size="1">or click</Sans>
    </Clickable>
  )
}
