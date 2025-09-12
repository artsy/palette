import React from "react"
import { Stack } from "../Stack"
import { Box } from "../Box"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  title: "Components/Stack",
  component: Stack,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Stack component provides a flex-based layout for arranging children with consistent spacing. Supports both vertical and horizontal arrangements with customizable gaps.",
      },
      controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
    },
  },
}

export const Default = {
  args: {
    gap: 2,
    children: (
      <>
        <Box bg="yellow100">1</Box>
        <Box bg="yellow100">2</Box>
        <Box bg="yellow100">3</Box>
        <Box bg="yellow100">4</Box>
        <Box bg="yellow100">5</Box>
        <Box bg="yellow100">6</Box>
      </>
    ),
  },
}

export const NoGap = {
  args: {
    gap: 0,
    children: (
      <>
        <Box bg="yellow100">1</Box>
        <Box bg="yellow100">2</Box>
        <Box bg="yellow100">3</Box>
      </>
    ),
  },
}

export const SmallGap = {
  args: {
    gap: 1,
    children: (
      <>
        <Box bg="yellow100">1</Box>
        <Box bg="yellow100">2</Box>
        <Box bg="yellow100">3</Box>
      </>
    ),
  },
}

export const HorizontalDirection = {
  args: {
    gap: 2,
    flexDirection: "row",
    children: (
      <>
        <Box bg="yellow100">1</Box>
        <Box bg="yellow100">2</Box>
        <Box bg="yellow100">3</Box>
      </>
    ),
  },
}

export const ResponsiveGap = {
  args: {
    gap: [2, 4],
    children: (
      <>
        <Box bg="yellow100">1</Box>
        <Box bg="yellow100">2</Box>
        <Box bg="yellow100">3</Box>
      </>
    ),
  },
}
