import React from "react"
import { Flex } from "../Flex"
import { Text } from "../Text"
import { Radio } from "./Radio"

export default {
  component: Radio,
  title: "Components/Radio",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A radio button input component with support for labels, descriptions, and various states.",
      },
    },
    controls: {
      include: ["selected", "label", "value", "disabled", "error", "children"],
    },
  },
}

export const Default = {
  args: {
    children: "A label",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic radio button with a simple label.",
      },
    },
  },
}

export const Selected = {
  args: {
    selected: true,
    children: "Selected radio",
  },
  parameters: {
    docs: {
      description: {
        story: "Radio button in selected state.",
      },
    },
  },
}

export const Disabled = {
  args: {
    disabled: true,
    children: "Disabled radio",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled radio button that cannot be interacted with.",
      },
    },
  },
}

export const WithError = {
  args: {
    error: true,
    children: "Radio with error",
  },
  parameters: {
    docs: {
      description: {
        story: "Radio button showing error state.",
      },
    },
  },
}

export const WithDescription = {
  args: {
    label: "A label that takes up multiple lines",
    width: "200px",
    children: "This is my description",
  },
  parameters: {
    docs: {
      description: {
        story: "Radio button with both label and description text.",
      },
    },
  },
}

export const SmallSize = {
  args: {
    label: "Small radio",
    size: "sm",
    children: "This is my description",
  },
  parameters: {
    docs: {
      description: {
        story: "Small sized radio button.",
      },
    },
  },
}

export const SplitLabel = {
  args: {
    children: (
      <Flex justifyContent="space-between" flex={1}>
        <Text variant="sm-display">Label</Text>
        <Text variant="xs" color="mono60">
          Subtitle
        </Text>
      </Flex>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Radio button with custom split label layout.",
      },
    },
  },
}
