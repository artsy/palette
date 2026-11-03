import React from "react"
import { Box } from "../Box"
import { Theme } from "../../Theme"
import { Spacer } from "./Spacer"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

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
      exclude: STORYBOOK_PROPS_BLOCKLIST,
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

export const ResponsiveArray = {
  args: {
    y: [1, 2, 4],
  },
  render: (args) => {
    return (
      <Box>
        <Box height={20} width={100} bg="mono60" />
        <Spacer {...args} />
        <Box height={20} width={100} bg="mono60" />
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Responsive array syntax: 10px by default, 20px from the sm breakpoint, 40px from md.",
      },
    },
  },
}

export const ObjectSyntax = {
  args: {
    x: { _: 1, sm: 2, md: 4 },
    y: { _: 1, sm: 2, md: 4 },
  },
  render: ({ x, y }) => {
    return (
      <Box>
        <Box display="flex">
          <Box height={20} width={20} bg="mono60" />
          <Spacer x={x} />
          <Box height={20} width={20} bg="mono60" />
        </Box>
        <Spacer y={y} />
        <Box height={20} width={100} bg="mono60" />
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Responsive object syntax, keyed by breakpoint name, on the x prop (top row) and the y prop (gap above the bottom box).",
      },
    },
  },
}

export const ArbitraryValues = {
  render: () => {
    return (
      <Box>
        <Box height={20} width={100} bg="mono60" />
        <Spacer y="31px" />
        <Box height={20} width={100} bg="mono30" />
        <Spacer y={-1} />
        <Box height={20} width={100} bg="mono60" />
        <Spacer y={0} />
        <Box height={20} width={100} bg="mono30" />
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Values outside the usual scale: a pixel string (31px), a negative scale value (-1, which overlaps the boxes) and zero.",
      },
    },
  },
}

export const DarkTheme = {
  args: {
    y: 2,
  },
  render: (args) => {
    return (
      <Theme theme="dark">
        <Box bg="mono0" p={2}>
          <Box height={20} width={100} bg="mono60" />
          <Spacer {...args} />
          <Box height={20} width={100} bg="mono60" />
        </Box>
      </Theme>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Spacer inside the dark theme.",
      },
    },
  },
}
