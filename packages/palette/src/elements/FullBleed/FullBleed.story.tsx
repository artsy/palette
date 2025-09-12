import React from "react"
import { Box } from "../Box"
import { Text } from "../Text"
import { FullBleed } from "./FullBleed"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: FullBleed,
  title: "Components/FullBleed",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A component that breaks out of its container to span the full width of the viewport.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
  },
}

export const Default = {
  args: {
    bg: "blue10",
    px: 2,
    py: 1,
    children: (
      <Text my={2} variant="sm-display">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic mollitia
        temporibus delectus cum, laudantium deleniti! Fugiat explicabo velit
        accusamus, libero quod, ipsum nisi non nihil praesentium, optio
        cupiditate adipisci omnis.
      </Text>
    ),
  },
  render: (args) => (
    <Box bg="mono5" maxWidth={900} mx="auto" px={2} py={1}>
      <Text my={2} variant="sm-display">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic mollitia
        temporibus delectus cum, laudantium deleniti! Fugiat explicabo velit
        accusamus, libero quod, ipsum nisi non nihil praesentium, optio
        cupiditate adipisci omnis.
      </Text>

      <FullBleed {...args} />

      <Text my={2} variant="sm-display">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic mollitia
        temporibus delectus cum, laudantium deleniti! Fugiat explicabo velit
        accusamus, libero quod, ipsum nisi non nihil praesentium, optio
        cupiditate adipisci omnis.
      </Text>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "FullBleed component breaking out of its container.",
      },
    },
  },
}
