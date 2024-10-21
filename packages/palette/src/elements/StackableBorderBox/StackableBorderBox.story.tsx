import React from "react"
import { StackableBorderBox } from "./StackableBorderBox"
import { Avatar } from "../Avatar/Avatar"
import { Flex } from "../Flex"
import { Button } from "../Button"

export default {
  title: "Components/StackableBorderBox",
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
