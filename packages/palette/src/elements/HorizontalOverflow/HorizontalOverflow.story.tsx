import React from "react"
import { HorizontalOverflow } from "./HorizontalOverflow"
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

export const Default = {
  args: {
    bg: "mono10",
    p: 2,
    children: (
      <Join separator={<Spacer x={2} />}>
        {Array.from(Array(50)).map((_, i) => (
          <Text key={i} variant="sm-display" color="mono100" mr={2}>
            Example #{i}
          </Text>
        ))}
      </Join>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Horizontal overflow container with many items that scroll.",
      },
    },
  },
}

export const ShortContent = {
  args: {
    bg: "mono10",
    p: 2,
    children: <Text variant="sm-display">Not overflowing</Text>,
  },
  parameters: {
    docs: {
      description: {
        story: "Container with content that doesn't overflow.",
      },
    },
  },
}

export const FillHeightCenteredContent = {
  render: () => (
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
  ),
  parameters: {
    docs: {
      description: {
        story: "Full height container with centered content.",
      },
    },
  },
}
