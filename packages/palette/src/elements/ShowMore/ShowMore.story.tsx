import React from "react"
import { States } from "storybook-states"
import { ShowMore, ShowMoreProps } from "./ShowMore"
import { Text } from "../Text"

export default {
  title: "Components/ShowMore",
}

export const Default = () => {
  return (
    <States<Partial<ShowMoreProps>> states={[{}, { expanded: true }]}>
      <ShowMore initial={3}>
        <Text variant="sm-display">First</Text>
        <Text variant="sm-display">Second</Text>
        <Text variant="sm-display">Third</Text>
        <Text variant="sm-display">Fourth</Text>
        <Text variant="sm-display">Fifth</Text>
        <Text variant="sm-display">Sixth</Text>
      </ShowMore>
    </States>
  )
}
