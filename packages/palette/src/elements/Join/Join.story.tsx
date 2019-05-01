import { storiesOf } from "@storybook/react"
import React from "react"
import { Box } from "../Box/Box"
import { Separator } from "../Separator/Separator"
import { Join } from "./Join"

const BlankComponent = () => {
  return null
}

storiesOf("Components/Join", module)
  .add("with multiple components", () => {
    return (
      <Join separator={<Separator m={1} />}>
        <Box>Fist in the list</Box>
        <Box>Second in the list</Box>
      </Join>
    )
  })
  .add("with one component", () => {
    return (
      <Join separator={<Separator m={1} />}>
        <Box>Only one component here</Box>
      </Join>
    )
  })
  .add("with some of the children empty", () => {
    return (
      <Join separator={<Separator m={1} />}>
        <Box>Fist in the list</Box>
        <BlankComponent />
        <Box m="2" />
        <div>Some div with the content</div>
        <div />
        <Box>Another box with content</Box>
        <div />
      </Join>
    )
  })
