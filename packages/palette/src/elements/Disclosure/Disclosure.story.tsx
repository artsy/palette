import { action } from "@storybook/addon-actions"
import React from "react"
import { States } from "storybook-states"
import { Clickable } from "../Clickable"
import { Flex } from "../Flex"
import { Text } from "../Text"
import { Disclosure, DisclosureProps } from "./Disclosure"
import { Button } from "../Button"

export default {
  title: "Components/Disclosure",
}

export const Default = () => {
  return (
    <States<Partial<DisclosureProps>>
      states={[
        {},
        { expanded: true },
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
        { label: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
      ]}
    >
      <Disclosure label="Example" maxWidth={350} onToggle={action("onToggle")}>
        <Text>Expanded content</Text>
      </Disclosure>
    </States>
  )
}
