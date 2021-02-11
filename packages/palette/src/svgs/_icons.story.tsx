import React from "react"
import { Box } from "../elements/Box/Box"
import { Flex } from "../elements/Flex/Flex"
import { Separator } from "../elements/Separator/Separator"
import { Sans } from "../elements/Typography"
import * as AllIcons from "./index"

export default {
  title: "Icons",
}

export const _AllIcons = () => {
  return (
    <Flex flexWrap="wrap" m={2}>
      {Object.entries(AllIcons).map(([iconName, IconComponent], index) => {
        const blacklist = ["ChevronIcon", "CreditCardIcon", "Icon"]
        if (
          !(typeof IconComponent === "function") ||
          blacklist.some((icon) => icon === iconName)
        ) {
          return null
        }
        const size = "40px"
        return (
          <Box pr={4} pb={2} mb={4} key={index} width="20%">
            <IconComponent width={size} height={size} />
            <Separator my={1} />
            <Sans size="3" weight="medium">
              {iconName}
            </Sans>
          </Box>
        )
      })}
    </Flex>
  )
}

_AllIcons.story = {
  name: "all icons",
}
