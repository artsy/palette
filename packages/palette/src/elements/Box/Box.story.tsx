import React from "react"
import { Box } from "../Box"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  title: "Components/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Box is a fundamental layout primitive component that provides a flexible container with styled-system props for spacing, layout, color, and typography.",
      },
      controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
    },
  },
}

export const Default = {
  args: {
    children: "This is a Box component",
    p: 2,
    bg: "yellow100",
  },
}

export const WithGap = {
  args: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    children: (
      <>
        <Box bg="yellow100" p={1}>
          1
        </Box>
        <Box bg="yellow100" p={1}>
          2
        </Box>
        <Box bg="yellow100" p={1}>
          3
        </Box>
      </>
    ),
  },
}

export const ResponsiveGap = {
  args: {
    display: "flex",
    flexDirection: "column",
    gap: [1, 3],
    children: (
      <>
        <Box bg="yellow100" p={1}>
          Responsive
        </Box>
        <Box bg="yellow100" p={1}>
          Gap
        </Box>
        <Box bg="yellow100" p={1}>
          Values
        </Box>
      </>
    ),
  },
}
