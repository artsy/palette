import React from "react"
import { Message } from "../elements/Message"
import { Column, GridColumns } from "../elements/GridColumns"
import { Separator } from "../elements/Separator"
import { Text } from "../elements/Text/Text"
import * as AllIcons from "./index"
import { Spacer } from "../elements/Spacer"

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
    <>
      <Message variant="warning">
        Please see{" "}
        <a
          href="https://github.com/artsy/icons"
          target="_blank"
          rel="noreferrer"
        >
          @artsy/icons
        </a>{" "}
        and{" "}
        <a href="https://icons.artsy.net/" target="_blank" rel="noreferrer">
          icons.artsy.net
        </a>{" "}
        for the latest icons. This page is deprecated and will be removed soon.
      </Message>

      <Spacer y={2} />

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
                {/* @ts-ignore */}
                <IconComponent width={40} height={40} />

                <Separator my={1} />

                <Text variant="xs">{name}</Text>
              </Column>
            )
          })}
      </GridColumns>
    </>
  )
}

_AllIcons.story = {
  name: "all icons",
}
