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
        <Text variant="md">First</Text>
        <Text variant="md">Second</Text>
        <Text variant="md">Third</Text>
        <Text variant="md">Fourth</Text>
        <Text variant="md">Fifth</Text>
        <Text variant="md">Sixth</Text>
      </ShowMore>
    </States>
  )
}
