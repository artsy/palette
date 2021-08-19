import React, { Component } from "react"
import { Box } from "../Box"
import { Separator } from "../Separator"
import { Text } from "../Text"
import { Join } from "./Join"

const BlankFunction = () => {
  return null
}

const NonBlankFunction = () => {
  return <Text variant="md">Non-blank Function</Text>
}

const BlankFC: React.FC = () => null

const NonBlankFC: React.FC = () => (
  <Text variant="md">Non-blank Functional component</Text>
)

class BlankComponent extends Component {
  render() {
    return null
  }
}

class NonBlankComponent extends Component {
  render() {
    return <Text variant="md">Non-Blank Class Component</Text>
  }
}

export default { title: "Components/Join" }

export const WithMultipleComponents = () => {
  return (
    <Join separator={<Separator my={1} />}>
      <Text variant="md">First in the list</Text>
      <Text variant="md">Second in the list</Text>
    </Join>
  )
}

WithMultipleComponents.story = {
  name: "with multiple components",
}

export const WithOneComponent = () => {
  return (
    <Join separator={<Separator my={1} />}>
      <Text variant="md">Only one component here</Text>
    </Join>
  )
}

WithOneComponent.story = {
  name: "with one component",
}

export const WithSomeOfTheChildrenEmpty = () => {
  return (
    <Join separator={<Separator my={1} />}>
      <Text variant="md">First in the list</Text>
      <BlankFunction />
      <NonBlankFunction />
      <BlankFC />
      <NonBlankFC />
      <BlankComponent />
      <NonBlankComponent />
      <Box m="2" />
      <div>
        <Text variant="md">Some div with the content</Text>
      </div>
      <div />
      <Text variant="md">Another box with content</Text>
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
      <Text variant="md">First in the list</Text>
      <>
        <Text variant="md">Second in the list</Text>
        <Text variant="md">Third in the list</Text>
        <>
          <Text variant="md">Fourth in the list</Text>
          <Text variant="md">Fifth in the list</Text>
        </>

        <Box>
          <Text variant="md">These two lines</Text>
          <Text variant="md">Are grouped</Text>
        </Box>

        <Text variant="sm">End of list</Text>
      </>
    </Join>
  )
}
