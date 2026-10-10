import type { Meta, StoryObj } from "@storybook/react"
import { Text } from "./Text"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Text component provides typography with predefined variants for consistent text styling across the application. Supports various sizes, weights, colors, and semantic HTML elements.",
      },
      controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Text>

export const Default: Story = {
  args: {
    children: "This is default text",
  },
}

export const LargeTitle: Story = {
  args: {
    variant: "lg-display",
    children: "Large Display Text",
  },
}

export const MediumTitle: Story = {
  args: {
    variant: "md",
    children: "Medium Display Text",
  },
}

export const SmallTitle: Story = {
  args: {
    variant: "sm-display",
    children: "Small Display Text",
  },
}

export const BodyText: Story = {
  args: {
    variant: "sm",
    children:
      "This is body text that would typically be used for paragraphs and general content.",
  },
}

export const ColoredText: Story = {
  args: {
    variant: "md",
    textColor: "blue100",
    children: "This text is colored blue",
  },
}

export const AsHeading: Story = {
  args: {
    as: "h2",
    variant: "lg-display",
    children: "This renders as an H2 element",
  },
}

export const ExtraSmall: Story = {
  args: {
    variant: "xs",
    children: "Extra small text",
  },
}

export const XLargeDisplay: Story = {
  args: {
    variant: "xl",
    children: "Extra large display text",
  },
}

export const XXLargeDisplay: Story = {
  args: {
    variant: "xxl",
    children: "Extra extra large display text",
  },
}

export const TruncatedText: Story = {
  args: {
    overflowEllipsis: true,
    children:
      "All their equipment and instruments are alive. All their equipment and instruments are alive. All their equipment and instruments are alive.",
  },
}

export const LineClampText: Story = {
  args: {
    lineClamp: 2,
    children:
      "All their equipment and instruments are alive. All their equipment and instruments are alive. All their equipment and instruments are alive. All their equipment and instruments are alive. All their equipment and instruments are alive.",
  },
}

export const UppercaseText: Story = {
  args: {
    textTransform: "uppercase",
    children: "This text is uppercase",
  },
}

export const CapitalizedText: Story = {
  args: {
    textTransform: "capitalize",
    children: "this text is capitalized",
  },
}
