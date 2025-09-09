import React, { Component } from "react"
import { Box } from "../Box"
import { Separator } from "../Separator"
import { Text } from "../Text"
import { Join } from "./Join"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

const BlankFunction = () => {
  return null
}

const NonBlankFunction = () => {
  return <Text variant="sm-display">Non-blank Function</Text>
}

const BlankFC: React.FC<React.PropsWithChildren<unknown>> = () => null

const NonBlankFC: React.FC<React.PropsWithChildren<unknown>> = () => (
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

export default {
  component: Join,
  title: "Components/Join",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A utility component that joins child elements with a separator, filtering out null/undefined children.",
      },
    },
    controls: {
      exclude: STORYBOOK_PROPS_BLOCKLIST,
    },
  },
}

export const WithMultipleComponents = {
  args: {
    separator: <Separator my={1} />,
    children: [
      <Text key="1" variant="sm-display">
        First in the list
      </Text>,
      <Text key="2" variant="sm-display">
        Second in the list
      </Text>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Join component with multiple children separated by a separator.",
      },
    },
  },
}

export const WithOneComponent = {
  args: {
    separator: <Separator my={1} />,
    children: <Text variant="sm-display">Only one component here</Text>,
  },
  parameters: {
    docs: {
      description: {
        story: "Join component with a single child (no separator shown).",
      },
    },
  },
}

export const WithSomeOfTheChildrenEmpty = {
  args: {
    separator: <Separator my={1} />,
    children: [
      <Text key="1" variant="sm-display">
        First in the list
      </Text>,
      <BlankFunction key="2" />,
      <NonBlankFunction key="3" />,
      <BlankFC key="4" />,
      <NonBlankFC key="5" />,
      <BlankComponent key="6" />,
      <NonBlankComponent key="7" />,
      <Box key="8" m="2" />,
      <div key="9">
        <Text variant="sm-display">Some div with the content</Text>
      </div>,
      <div key="10" />,
      <Text key="11" variant="sm-display">
        Another box with content
      </Text>,
      <div key="12" />,
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Join component that filters out null/empty children and only shows separators between visible content.",
      },
    },
  },
}

export const WithNestedChildren = {
  args: {
    separator: <Separator my={1} />,
    children: [
      <Text key="1" variant="sm-display">
        First in the list
      </Text>,
      <>
        <Text key="2" variant="sm-display">
          Second in the list
        </Text>
        ,
        <Text key="3" variant="sm-display">
          Third in the list
        </Text>
        ,
        <>
          <Text key="4" variant="sm-display">
            Fourth in the list
          </Text>
          ,
          <Text key="5" variant="sm-display">
            Fifth in the list
          </Text>
          ,
        </>
        ,
        <Box key="6">
          <Text variant="sm-display">These two lines</Text>
          <Text variant="sm-display">Are grouped</Text>
        </Box>
        ,<Text key="7">End of list</Text>,
      </>,
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Join component with nested children and groups, showing separators only between visible content.",
      },
    },
  },
}
