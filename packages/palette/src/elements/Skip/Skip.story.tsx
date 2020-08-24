import { storiesOf } from "@storybook/react"
import React from "react"
import { Text } from "../Text"
import { Skip } from "./Skip"

storiesOf("Components/Skip", module)
  .add("Skip button", () => {
    return (
      <>
        <Text variant="text">Press &lt;tab&gt; to focus</Text>
        <Skip>Skip to main content</Skip>
        <Text variant="text">
          It should not interfere with the normal flow of content
        </Text>
      </>
    )
  })
  .add("Skip button with spacing", () => {
    return (
      <>
        <Text variant="text">Press &lt;tab&gt; to focus</Text>
        <Skip width="100%" my={1}>
          Skip to main content
        </Skip>
        <Text variant="text">
          It should not interfere with the normal flow of content
        </Text>
      </>
    )
  })
  .add("Skip link", () => {
    return (
      <>
        <Text variant="text">Press &lt;tab&gt; to focus</Text>
        <Skip width="100%" my={1} as="a" href="#main">
          Skip to main content
        </Skip>
        <Text variant="text">
          It should not interfere with the normal flow of content
        </Text>
      </>
    )
  })
