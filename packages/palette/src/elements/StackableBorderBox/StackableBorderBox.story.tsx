import React from "react"
import { StackableBorderBox } from "./StackableBorderBox"
import { Avatar } from "../Avatar/Avatar"
import { Flex } from "../Flex"
import { Button } from "../Button"

export default {
  component: StackableBorderBox,
  title: "Components/StackableBorderBox",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A bordered container component designed to be stacked with other border boxes.",
      },
    },
    controls: {
      include: ["children"],
    },
  },
}

export const Default = {
  render: () => (
    <>
      <StackableBorderBox>
        <Flex>
          <Avatar size="xs" src="https://picsum.photos/seed/example/110/110" />
          <Button>Click me</Button>
        </Flex>
      </StackableBorderBox>
      <StackableBorderBox>Second Box</StackableBorderBox>
      <StackableBorderBox>Third Box</StackableBorderBox>
      <StackableBorderBox>Fourth Box</StackableBorderBox>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple stackable border boxes demonstrating visual connection.",
      },
    },
  },
}
