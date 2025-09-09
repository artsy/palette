import React from "react"
import { Box } from "../Box"
import { Text } from "../Text"
import { Column, GridColumns } from "./GridColumns"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

const IPSUM =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto deleniti recusandae ullam laudantium ut reiciendis, doloribus qui sequi id ea, ad suscipit eos placeat magnam consequatur sunt, quaerat eius saepe."

const GridColumnsDebug = () => (
  <GridColumns
    position="absolute"
    top={0}
    left={0}
    width="100%"
    height="100%"
    style={{ pointerEvents: "none" }}
  >
    {Array.from(Array(12)).map((_, i) => (
      <Column key={i} span={[1]} bg="rgba(255, 0, 0, 0.05)" height="100%" />
    ))}
  </GridColumns>
)

export default {
  component: GridColumns,
  title: "Components/GridColumns",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A CSS Grid-based layout system that provides responsive columns with configurable spans and gutters.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
  },
}

export const RealWorldExample = {
  args: {
    position: "relative",
    m: 2,
    children: (
      <>
        <GridColumnsDebug />
        <Column span={6} wrap>
          <Text as="h1" variant="xl">
            Page Title Long Enough So As To Line Break
          </Text>
        </Column>
        <Column span={6}>
          <Text as="h2" variant="lg-display" mb={1}>
            Page subtitle
          </Text>
          <Text>{IPSUM}</Text>
        </Column>
        <Column span={5} start={8}>
          <Text variant="sm-display" mb={1}>
            Featured content
          </Text>
          <Box bg="mono10" borderRadius={4} height={400} />
        </Column>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A real-world example showing typical page layout with grid columns.",
      },
    },
  },
}

export const KitchenSink = {
  args: {
    border: "1px solid blue",
    position: "relative",
    children: (
      <>
        <GridColumnsDebug />
        <Column border="1px solid red" span={4}>
          <Text>{IPSUM}</Text>
        </Column>
        <Column border="1px solid red" span={4}>
          <Text>{IPSUM}</Text>
        </Column>
        <Column border="1px solid green" span={4}>
          <Text>{IPSUM}</Text>
        </Column>
        <Column border="1px solid red" span={4} wrap>
          <Text>
            {IPSUM} {IPSUM}
          </Text>
        </Column>
        <Column bg="mono100" span={[6]}>
          <Text color="mono0">This remains 2-columns at all breakpoints</Text>
        </Column>
        <Column bg="mono100" span={[6]}>
          <Text color="mono0">This remains 2-columns at all breakpoints</Text>
        </Column>
        <Column bg="mono100" span={6}>
          <Text color="mono0">
            These are 2-columns at large breakpoints, and 1 at mobile
          </Text>
        </Column>
        <Column bg="mono100" span={6}>
          <Text color="mono0">
            These are 2-columns at large breakpoints, and 1 at mobile
          </Text>
        </Column>
        <Column
          start={[2, 3, 4]}
          span={[9, 6, 3]}
          height={300}
          bg="mono10"
          borderRadius={4}
        />
        <Column
          height={200}
          bg="purple100"
          span={[12, 6]}
          start={[1, 4]}
          wrap
        />
        <Column bg="mono100" start={4}>
          <Text color="mono0">{IPSUM}</Text>
        </Column>
        <Column border="1px solid red" span={4} start={1}>
          <Text>{IPSUM}</Text>
        </Column>
        <Column border="1px solid red" span={4} start={6}>
          <Text>{IPSUM}</Text>
        </Column>
        <Column border="1px solid red" span={2} start={11}>
          <Text>{IPSUM}</Text>
        </Column>
        <Column bg="red" span={1} start={1} height={100} wrap />
        <Column bg="red" span={1} start={2} height={100} wrap />
        <Column bg="red" span={1} start={3} height={100} wrap />
        <Column bg="red" span={1} start={4} height={100} wrap />
        <Column bg="red" span={1} start={5} height={100} wrap />
        <Column bg="red" span={1} start={6} height={100} wrap />
        <Column bg="red" span={1} start={7} height={100} wrap />
        <Column gridColumn="3 / 9" bg="purple100">
          <Text color="mono0">A custom grid-column value</Text>
        </Column>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Comprehensive example showing various column configurations and layouts.",
      },
    },
  },
}

export const CustomGutters = {
  args: {
    gridColumnGap: 4,
    gridRowGap: 1,
    children: (
      <>
        {Array.from(Array(12)).map((_, i) => (
          <Column key={i} span={2} bg="mono10" height={100} />
        ))}
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Grid columns with custom row and column gap spacing.",
      },
    },
  },
}
