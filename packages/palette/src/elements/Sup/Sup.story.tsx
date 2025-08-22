import React from "react"
import { Text } from "../Text"
import { Sup } from "./Sup"

export default {
  component: Sup,
  title: "Components/Sup",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A superscript text component with different size variants for adding small text above the baseline.",
      },
    },
    controls: {
      include: ["variant", "color", "children"],
    },
  },
}

export const Default = {
  args: {
    children: "123",
    color: "blue100",
  },
  render: (args) => (
    <Text>
      Lorem Ipsum <Sup {...args} />
    </Text>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic superscript text with blue color.",
      },
    },
  },
}

export const AllVariants = {
  render: () => (
    <>
      <Text mb={2}>
        XXL variant: Lorem Ipsum <Sup variant="xxl">123</Sup>
      </Text>
      <Text mb={2}>
        XL variant: Lorem Ipsum <Sup variant="xl">123</Sup>
      </Text>
      <Text mb={2}>
        LG variant: Lorem Ipsum <Sup variant="lg">123</Sup>
      </Text>
      <Text mb={2}>
        MD variant: Lorem Ipsum <Sup variant="md">123</Sup>
      </Text>
      <Text mb={2}>
        SM variant: Lorem Ipsum <Sup variant="sm">123</Sup>
      </Text>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available size variants of the superscript component.",
      },
    },
  },
}
