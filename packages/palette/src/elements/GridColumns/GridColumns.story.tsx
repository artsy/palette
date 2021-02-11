import React from "react"
import { Box } from "../Box"
import { Text } from "../Text"
import { Column, GridColumns } from "./GridColumns"

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
    {[...new Array(12)].map((_, i) => (
      <Column key={i} span={[1]} bg="rgba(255, 0, 0, 0.05)" height="100%" />
    ))}
  </GridColumns>
)

export default {
  title: "Components/GridColumns",
}

export const RealWorldExample = () => {
  return (
    <GridColumns position="relative" m={2}>
      <GridColumnsDebug />

      <Column span={6} wrap>
        <Text as="h1" variant="largeTitle">
          Page Title Long Enough So As To Line Break
        </Text>
      </Column>

      <Column span={6}>
        <Text as="h2" variant="subtitle" mb={1}>
          Page subtitle
        </Text>

        <Text>{IPSUM}</Text>
      </Column>

      <Column span={5} start={8}>
        <Text variant="mediumText" mb={1}>
          Featured content
        </Text>

        <Box bg="black10" borderRadius={4} height={400} />
      </Column>
    </GridColumns>
  )
}

RealWorldExample.story = {
  name: "Real-world Example",
}

export const KitchenSink = () => {
  return (
    <GridColumns border="1px solid blue" position="relative">
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

      <Column bg="black100" span={[6]}>
        <Text color="white100">This remains 2-columns at all breakpoints</Text>
      </Column>

      <Column bg="black100" span={[6]}>
        <Text color="white100">This remains 2-columns at all breakpoints</Text>
      </Column>

      <Column bg="black100" span={6}>
        <Text color="white100">
          These are 2-columns at large breakpoints, and 1 at mobile
        </Text>
      </Column>

      <Column bg="black100" span={6}>
        <Text color="white100">
          These are 2-columns at large breakpoints, and 1 at mobile
        </Text>
      </Column>

      <Column
        start={[2, 3, 4]}
        span={[9, 6, 3]}
        height={300}
        bg="black10"
        borderRadius={4}
      />

      <Column height={200} bg="purple100" span={[12, 6]} start={[1, 4]} wrap />

      <Column bg="black100" start={4}>
        <Text color="white100">{IPSUM}</Text>
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
        <Text color="white100">A custom grid-column value</Text>
      </Column>
    </GridColumns>
  )
}

KitchenSink.story = {
  name: "Kitchen sink",
}

export const CustomGutters = () => {
  return (
    <GridColumns gridColumnGap={4} gridRowGap={1}>
      <Column span={2} bg="black10" height={100} />
      <Column span={2} bg="black10" height={100} />
      <Column span={2} bg="black10" height={100} />
      <Column span={2} bg="black10" height={100} />
      <Column span={2} bg="black10" height={100} />
      <Column span={2} bg="black10" height={100} />
      <Column span={2} bg="black10" height={100} />
      <Column span={2} bg="black10" height={100} />
      <Column span={2} bg="black10" height={100} />
      <Column span={2} bg="black10" height={100} />
      <Column span={2} bg="black10" height={100} />
      <Column span={2} bg="black10" height={100} />
    </GridColumns>
  )
}

CustomGutters.story = {
  name: "Custom gutters",
}
