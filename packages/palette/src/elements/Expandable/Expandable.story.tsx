import { fn } from "@storybook/test"
import React from "react"
import { Clickable } from "../Clickable"
import { Flex } from "../Flex"
import { Text } from "../Text"
import { Expandable } from "./Expandable"
import { Button } from "../Button"
import { Box } from "../Box"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  title: "Components/Expandable",
  component: Expandable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An expandable component that shows and hides content with a clickable label. Supports custom labels, disabled states, and configurable styling.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
  },
}

export const Default = {
  args: {
    label: "Click to expand",
    children: <Text>This is the expanded content</Text>,
    onExpand: fn(),
  },
}

export const Expanded = {
  args: {
    label: "Click to collapse",
    expanded: true,
    children: <Text>This content is initially expanded</Text>,
    onExpand: fn(),
  },
}

export const Disabled = {
  args: {
    label: "Disabled expandable",
    disabled: true,
    children: <Text>This content cannot be expanded</Text>,
    onExpand: fn(),
  },
}

export const DisabledExpanded = {
  args: {
    label: "Disabled and expanded",
    disabled: true,
    expanded: true,
    children: <Text>This content is expanded but disabled</Text>,
    onExpand: fn(),
  },
}

export const CustomLabel = {
  args: {
    label: (
      <Flex flex={1} justifyContent="space-between">
        <Text variant="sm-display">Custom Heading</Text>
        <Clickable
          textDecoration="underline"
          onClick={(e) => {
            e.stopPropagation()
            fn()
          }}
        >
          Link in header
        </Clickable>
      </Flex>
    ),
    children: (
      <Box>
        <Text>Expanded content with custom label</Text>
        <Button onClick={fn()}>Action Button</Button>
      </Box>
    ),
    onExpand: fn(),
  },
}

export const ConfigurableColors = {
  render: () => (
    <Box color="mono0" bg="mono100">
      <Expandable label="Custom Colors" maxWidth={350} borderColor="mono30">
        <Text>Expanded content with custom border color</Text>
      </Expandable>
    </Box>
  ),
}
