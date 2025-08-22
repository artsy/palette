import React from "react"
import { States } from "storybook-states"
import {
  HorizontalOverflow,
  HorizontalOverflowProps,
} from "./HorizontalOverflow"
import { Text } from "../Text"
import { Spacer } from "../Spacer"
import { Join } from "../Join"
import { Box } from "../Box"

export default {
  component: HorizontalOverflow,
  title: "Components/HorizontalOverflow",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A container that allows content to overflow horizontally with scrolling when needed.",
      },
    },
    controls: {
      include: ["children", "bg", "p", "height"],
    },
  },
}

export const Default = () => {
  return (
    <States<Partial<HorizontalOverflowProps>>
      states={[
        {},
        { children: <Text variant="sm-display">Not overflowing</Text> },
      ]}
    >
      <HorizontalOverflow bg="mono10" p={2}>
        <Join separator={<Spacer x={2} />}>
          {Array.from(Array(50)).map((_, i) => (
            <Text key={i} variant="sm-display" color="mono100" mr={2}>
              Example #{i}
            </Text>
          ))}
        </Join>
      </HorizontalOverflow>
    </States>
  )
}

export const FillHeightCenteredContent = () => {
  return (
    <Box height={100} bg="red10">
      <HorizontalOverflow border="1px solid" p={2} height="100%">
        <Join separator={<Spacer x={2} />}>
          {Array.from(Array(50)).map((_, i) => (
            <Text
              key={i}
              variant="sm-display"
              color="mono100"
              display="flex"
              alignItems="center"
            >
              Example #{i}
            </Text>
          ))}
        </Join>
      </HorizontalOverflow>
    </Box>
  )
}
