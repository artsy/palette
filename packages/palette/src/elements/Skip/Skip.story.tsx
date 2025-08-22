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

export const SkipButton = () => {
  return (
    <>
      <Text variant="sm">Press &lt;tab&gt; to focus</Text>
      <Skip>Skip to main content</Skip>
      <Text variant="sm">
        It should not interfere with the normal flow of content
      </Text>
    </>
  )
}

export const SkipButtonWithSpacing = () => {
  return (
    <>
      <Text variant="sm">Press &lt;tab&gt; to focus</Text>
      <Skip width="100%" my={1}>
        Skip to main content
      </Skip>
      <Text variant="sm">
        It should not interfere with the normal flow of content
      </Text>
    </>
  )
}

SkipButtonWithSpacing.story = {
  name: "Skip button with spacing",
}

export const SkipLink = () => {
  return (
    <>
      <Text variant="sm">Press &lt;tab&gt; to focus</Text>
      <Skip width="100%" my={1} as="a" href="#main">
        Skip to main content
      </Skip>
      <Text variant="sm">
        It should not interfere with the normal flow of content
      </Text>
    </>
  )
}

SkipLink.story = {
  name: "Skip link",
}
