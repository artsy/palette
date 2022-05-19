import React from "react"
import { Box } from "../Box"
import { Text } from "../Text"
import { FullBleed } from "./FullBleed"

export default {
  title: "Components/FullBleed",
}

export const Default = () => {
  return (
    <Box bg="black5" maxWidth={900} mx="auto" px={2} py={1}>
      <Text my={2} variant="sm-display">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic mollitia
        temporibus delectus cum, laudantium deleniti! Fugiat explicabo velit
        accusamus, libero quod, ipsum nisi non nihil praesentium, optio
        cupiditate adipisci omnis.
      </Text>

      <FullBleed bg="blue10" px={2} py={1}>
        <Text my={2} variant="sm-display">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic mollitia
          temporibus delectus cum, laudantium deleniti! Fugiat explicabo velit
          accusamus, libero quod, ipsum nisi non nihil praesentium, optio
          cupiditate adipisci omnis.
        </Text>
      </FullBleed>

      <Text my={2} variant="sm-display">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic mollitia
        temporibus delectus cum, laudantium deleniti! Fugiat explicabo velit
        accusamus, libero quod, ipsum nisi non nihil praesentium, optio
        cupiditate adipisci omnis.
      </Text>
    </Box>
  )
}
