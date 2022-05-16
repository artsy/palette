import { action } from "@storybook/addon-actions"
import React from "react"
import { States } from "storybook-states"
import { Clickable } from "../Clickable"
import { Flex } from "../Flex"
import { Text } from "../Text"
import { Expandable, ExpandableProps } from "./Expandable"
import { Button } from "../Button"

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
              <Text variant="sm-display">Heading</Text>
              <Clickable
                textDecoration="underline"
                onClick={(e) => {
                  e.stopPropagation()
                  action("Secondary action")
                }}
              >
                <Text variant="sm-display">Reset</Text>
              </Clickable>
            </Flex>
          ),
        },
        { mb: 6 },
        { expanded: true, mb: 6 },
        {
          expanded: true,
          children: ({ setExpanded }) => (
            <div>
              <Text>Expanded content</Text>
              <Button onClick={() => setExpanded(false)}>Close</Button>
            </div>
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
