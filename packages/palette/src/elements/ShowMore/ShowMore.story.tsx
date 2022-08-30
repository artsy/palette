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

export const CommaSeparatedList = () => {
  const artists = ["Monica Kim Garza", "John Houck", "Zemba Luzamba"]

  return (
    <States<Partial<ShowMoreProps>> states={[{}, { expanded: true }]}>
      <ShowMore initial={1} variant="lg" textDecoration="underline" mt={1}>
        {artists.map((artist, index) => {
          let separator = ", "
          if (index === artists.length - 1) {
            separator = ". "
          }

          return (
            <Text variant="lg" as="span" key={index}>
              {artist}
              {separator}
            </Text>
          )
        })}
      </ShowMore>
    </States>
  )
}

CommaSeparatedList.story = {
  name: "Works with comma-separated list",
}
