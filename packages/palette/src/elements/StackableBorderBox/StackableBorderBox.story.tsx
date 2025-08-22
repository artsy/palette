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

export const Default = () => {
  return (
    <>
      <StackableBorderBox>
        <Flex>
          <Flex>
            <Avatar
              size="xs"
              src="https://picsum.photos/seed/example/110/110"
            />
          </Flex>
          <Flex>
            <Avatar
              size="xs"
              src="https://picsum.photos/seed/example/110/110"
            />
          </Flex>
          <Button>Click me</Button>
        </Flex>
      </StackableBorderBox>
      <StackableBorderBox>2</StackableBorderBox>
      <StackableBorderBox>3</StackableBorderBox>
      <StackableBorderBox>4</StackableBorderBox>
    </>
  )
}
