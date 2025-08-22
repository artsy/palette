import React from "react"
import { Box } from "../Box"
import { Spacer } from "./Spacer"

export default {
  component: Spacer,
  title: "Components/Spacer",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A spacing component that creates horizontal (x) or vertical (y) space between elements.",
      },
    },
    controls: {
      include: ["x", "y"],
    },
  },
}

export const VerticalSpacing = {
  args: {
    y: 2,
  },
  render: (args) => (
    <Box>
      <Box height={2} width={100} bg="mono60" />
      <Spacer {...args} />
      <Box height={2} width={100} bg="mono60" />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Vertical spacing using the y prop.",
      },
    },
  },
}

export const HorizontalSpacing = {
  args: {
    x: 2,
  },
  render: (args) => (
    <Box display="flex">
      <Box height={100} width={2} bg="mono60" />
      <Spacer {...args} />
      <Box height={100} width={2} bg="mono60" />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Horizontal spacing using the x prop.",
      },
    },
  },
}
