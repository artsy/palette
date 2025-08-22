import React from "react"
import { Text } from "../Text"
import { Skip } from "./Skip"

export default {
  component: Skip,
  title: "Components/Skip",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A skip link component for accessibility, allowing keyboard users to skip to main content.",
      },
    },
    controls: {
      include: ["children", "width", "my"],
    },
  },
}

export const Default = {
  args: {
    children: "Skip to main content",
  },
  render: (args) => (
    <>
      <Text variant="sm">Press &lt;tab&gt; to focus</Text>
      <Skip {...args} />
      <Text variant="sm">
        It should not interfere with the normal flow of content
      </Text>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic skip button for accessibility navigation.",
      },
    },
  },
}

export const WithSpacing = {
  args: {
    children: "Skip to main content",
    width: "100%",
    my: 1,
  },
  render: (args) => (
    <>
      <Text variant="sm">Press &lt;tab&gt; to focus</Text>
      <Skip {...args} />
      <Text variant="sm">
        It should not interfere with the normal flow of content
      </Text>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: "Skip button with custom spacing and width.",
      },
    },
  },
}

export const SkipLink = {
  args: {
    children: "Skip to main content",
    width: "100%",
    my: 1,
    as: "a",
    href: "#main",
  },
  render: (args) => (
    <>
      <Text variant="sm">Press &lt;tab&gt; to focus</Text>
      <Skip {...args} />
      <Text variant="sm">
        It should not interfere with the normal flow of content
      </Text>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: "Skip link rendered as an anchor element with href.",
      },
    },
  },
}
