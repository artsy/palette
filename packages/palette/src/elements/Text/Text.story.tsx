import { Text } from "./Text"

export default {
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
        include: [
          "children",
          "variant",
          "as",
          "textColor",
          "caps",
          "italic",
          "underline",
          "overflowEllipsis",
          "lineClamp",
          "textTransform",
        ],
      },
    },
  },
}

export const Default = {
  args: {
    children: "This is default text",
  },
}

export const LargeTitle = {
  args: {
    variant: "lg-display",
    children: "Large Display Text",
  },
}

export const MediumTitle = {
  args: {
    variant: "md-display",
    children: "Medium Display Text",
  },
}

export const SmallTitle = {
  args: {
    variant: "sm-display",
    children: "Small Display Text",
  },
}

export const BodyText = {
  args: {
    variant: "sm",
    children:
      "This is body text that would typically be used for paragraphs and general content.",
  },
}

export const ColoredText = {
  args: {
    variant: "md",
    textColor: "blue100",
    children: "This text is colored blue",
  },
}

export const AsHeading = {
  args: {
    as: "h2",
    variant: "lg-display",
    children: "This renders as an H2 element",
  },
}

export const ExtraSmall = {
  args: {
    variant: "xs",
    children: "Extra small text",
  },
}

export const XLargeDisplay = {
  args: {
    variant: "xl",
    children: "Extra large display text",
  },
}

export const XXLargeDisplay = {
  args: {
    variant: "xxl",
    children: "Extra extra large display text",
  },
}

export const CappedText = {
  args: {
    caps: true,
    children: "This text is in caps",
  },
}

export const ItalicText = {
  args: {
    italic: true,
    children: "This text is italicized",
  },
}

export const UnderlineText = {
  args: {
    underline: true,
    children: "This text is underlined",
  },
}

export const TruncatedText = {
  args: {
    overflowEllipsis: true,
    children:
      "All their equipment and instruments are alive. All their equipment and instruments are alive. All their equipment and instruments are alive.",
  },
}

export const LineClampText = {
  args: {
    lineClamp: 2,
    children:
      "All their equipment and instruments are alive. All their equipment and instruments are alive. All their equipment and instruments are alive. All their equipment and instruments are alive. All their equipment and instruments are alive.",
  },
}

export const UppercaseText = {
  args: {
    textTransform: "uppercase",
    children: "This text is uppercase",
  },
}

export const CapitalizedText = {
  args: {
    textTransform: "capitalize",
    children: "this text is capitalized",
  },
}
