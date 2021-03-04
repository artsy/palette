import React from "react"
import { States } from "storybook-states"
import { Separator, SeparatorProps } from "./Separator"

export default {
  title: "Components/Separator",
}

export const Default = () => {
  return (
    <States<SeparatorProps>
      states={[
        {},
        { color: "black30" },
        { borderColor: "red100" },
        { borderWidth: 5, my: 2 },
      ]}
    >
      <Separator />
    </States>
  )
}
