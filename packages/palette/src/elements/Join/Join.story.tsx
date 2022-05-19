import React, { Component } from "react"
import { Box } from "../Box"
import { Separator } from "../Separator"
import { Text } from "../Text"
import { Join } from "./Join"

const BlankFunction = () => {
  return null
}

const NonBlankFunction = () => {
  return <Text variant="sm-display">Non-blank Function</Text>
}

const BlankFC: React.FC = () => null

const NonBlankFC: React.FC = () => (
  <Text variant="sm-display">Non-blank Functional component</Text>
)

class BlankComponent extends Component {
  render() {
    return null
  }
}

class NonBlankComponent extends Component {
  render() {
    return <Text variant="sm-display">Non-Blank Class Component</Text>
  }
}

export default { title: "Components/Join" }

export const WithMultipleComponents = () => {
  return (
    <Join separator={<Separator my={1} />}>
      <Text variant="sm-display">First in the list</Text>
      <Text variant="sm-display">Second in the list</Text>
    </Join>
  )
}

WithMultipleComponents.story = {
  name: "with multiple components",
}

export const WithOneComponent = () => {
  return (
    <Join separator={<Separator my={1} />}>
      <Text variant="sm-display">Only one component here</Text>
    </Join>
  )
}

WithOneComponent.story = {
  name: "with one component",
}

export const WithSomeOfTheChildrenEmpty = () => {
  return (
    <Join separator={<Separator my={1} />}>
      <Text variant="sm-display">First in the list</Text>
      <BlankFunction />
      <NonBlankFunction />
      <BlankFC />
      <NonBlankFC />
      <BlankComponent />
      <NonBlankComponent />
      <Box m="2" />
      <div>
        <Text variant="sm-display">Some div with the content</Text>
      </div>
      <div />
      <Text variant="sm-display">Another box with content</Text>
      <div />
    </Join>
  )
}

WithSomeOfTheChildrenEmpty.story = {
  name: "with some of the children empty",
}

export const WithNestedChildren = () => {
  return (
    <Join separator={<Separator my={1} />}>
      <Text variant="sm-display">First in the list</Text>
      <>
        <Text variant="sm-display">Second in the list</Text>
        <Text variant="sm-display">Third in the list</Text>
        <>
          <Text variant="sm-display">Fourth in the list</Text>
          <Text variant="sm-display">Fifth in the list</Text>
        </>

        <Box>
          <Text variant="sm-display">These two lines</Text>
          <Text variant="sm-display">Are grouped</Text>
        </Box>

        <Text>End of list</Text>
      </>
    </Join>
  )
}
