import { action } from "@storybook/addon-actions"
import React from "react"
import { States } from "storybook-states"
import { Clickable } from "../Clickable"
import { Flex } from "../Flex"
import { Text } from "../Text"
import { Expandable, ExpandableProps } from "./Expandable"

export default {
  title: "Components/Expandable",
}

export const Default = () => {
  return (
    <States<Partial<ExpandableProps>>
      states={[
        {},
        { expanded: true },
        { expanded: false, disabled: true },
        { expanded: true, disabled: true },
        {
          label: (
            <Flex flex={1} justifyContent="space-between">
              <Text variant="md">Heading</Text>

              <Clickable
                textDecoration="underline"
                onClick={(e) => {
                  e.stopPropagation()
                  action("Secondary action")
                }}
              >
                <Text variant="md">Reset</Text>
              </Clickable>
            </Flex>
          ),
        },
      ]}
    >
      <Expandable label="Example" maxWidth={350}>
        <Text>Expanded content</Text>
      </Expandable>
    </States>
  )
}
