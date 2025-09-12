import React from "react"
import { ShowMore } from "./ShowMore"
import { Text } from "../Text"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: ShowMore,
  title: "Components/ShowMore",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A component that shows a limited number of children initially with a toggle to show/hide more.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
  },
}

export const Default = {
  args: {
    initial: 3,
    children: [
      <Text key={1} variant="sm-display">
        First
      </Text>,
      <Text key={2} variant="sm-display">
        Second
      </Text>,
      <Text key={3} variant="sm-display">
        Third
      </Text>,
      <Text key={4} variant="sm-display">
        Fourth
      </Text>,
      <Text key={5} variant="sm-display">
        Fifth
      </Text>,
      <Text key={6} variant="sm-display">
        Sixth
      </Text>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Shows first 3 items with a toggle to show/hide more.",
      },
    },
  },
}

export const Expanded = {
  args: {
    initial: 3,
    expanded: true,
    children: [
      <Text key={1} variant="sm-display">
        First
      </Text>,
      <Text key={2} variant="sm-display">
        Second
      </Text>,
      <Text key={3} variant="sm-display">
        Third
      </Text>,
      <Text key={4} variant="sm-display">
        Fourth
      </Text>,
      <Text key={5} variant="sm-display">
        Fifth
      </Text>,
      <Text key={6} variant="sm-display">
        Sixth
      </Text>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "ShowMore component in expanded state showing all items.",
      },
    },
  },
}

export const CommaSeparatedList = {
  render: () => {
    const artists = ["Monica Kim Garza", "John Houck", "Zemba Luzamba"]

    return (
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
    )
  },
  parameters: {
    docs: {
      description: {
        story: "ShowMore with comma-separated text content.",
      },
    },
  },
}
