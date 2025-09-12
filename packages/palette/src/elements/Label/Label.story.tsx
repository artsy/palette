import React from "react"
import { Label, LabelVariant, LABEL_VARIANTS } from "./Label"
import { Box } from "../Box"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: Label,
  title: "Components/Label",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A label component with different visual variants for various use cases.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
  },
}

export const Default = {
  args: {
    children: "Example",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic label component with default styling.",
      },
    },
  },
}

export const AllVariants = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={1}>
      {Object.keys(LABEL_VARIANTS).map((variant) => (
        <Label key={variant} variant={variant as LabelVariant}>
          {variant} Label
        </Label>
      ))}
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available label variants.",
      },
    },
  },
}

export const OverflowEllipsis = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={1}>
      {Object.keys(LABEL_VARIANTS).map((variant) => (
        <Box key={variant} width={75} overflow="hidden">
          <Label variant={variant as LabelVariant}>Longer Example</Label>
        </Box>
      ))}
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Labels with text overflow demonstrating ellipsis behavior.",
      },
    },
  },
}
