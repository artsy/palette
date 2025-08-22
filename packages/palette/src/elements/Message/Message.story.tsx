import React from "react"
import { States } from "storybook-states"
import { Text } from "../Text"
import {
  Message,
  MessageProps,
  MESSAGE_VARIANTS,
  MessageVariant,
} from "./Message"

export default {
  component: Message,
  title: "Components/Message",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A message component with different variants for displaying information, warnings, or errors.",
      },
    },
    controls: {
      include: ["variant", "title", "children"],
    },
  },
}

export const Default = () => {
  return (
    <States<MessageProps>
      states={[
        ...Object.keys(MESSAGE_VARIANTS).map((variant) => ({
          variant: variant as MessageVariant,
          title: "Message Title",
        })),
        {},
        { variant: "info" },
        { variant: "warning" },
        { variant: "error" },
        {
          children: (
            <Text variant="lg-display" color="red100">
              custom children
            </Text>
          ),
        },
      ]}
    >
      <Message>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quae
        natus assumenda distinctio, voluptatum magni. Natus, aliquam neque odio
        debitis totam labore maiores, corrupti mollitia repudiandae optio illo,
        autem sunt.
      </Message>
    </States>
  )
}
