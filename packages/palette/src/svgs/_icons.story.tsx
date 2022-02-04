import React from "react"
import { Column, GridColumns } from "../elements/GridColumns"
import { Separator } from "../elements/Separator"
import { Text } from "../elements/Text/Text"
import * as AllIcons from "./index"

const BLOCKLIST = [
  "ChevronIcon",
  "Circle",
  "CreditCardIcon",
  "G",
  "Icon",
  "Path",
  "Rect",
  "Title",
]

export default {
  title: "Icons",
}

export const _AllIcons = () => {
  return (
    <GridColumns>
      {Object.entries(AllIcons)
        .sort()
        .map(([name, IconComponent]) => {
          if (
            !(typeof IconComponent === "function") ||
            BLOCKLIST.includes(name)
          ) {
            return null
          }

          return (
            <Column key={name} span={2}>
              <IconComponent width={40} height={40} />

              <Separator my={1} />

              <Text variant="xs">{name}</Text>
            </Column>
          )
        })}
    </GridColumns>
  )
}

_AllIcons.story = {
  name: "all icons",
}
