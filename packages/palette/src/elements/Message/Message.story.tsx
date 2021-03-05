import React from "react"
import { States } from "storybook-states"
import { Text } from "../Text"
import { Message, MessageProps } from "./Message"

export default {
  title: "Components/Message",
}

export const Default = () => {
  return (
    <States<MessageProps>
      states={[
        { title: "Message Title" },
        { variant: "info", title: "Message Title" },
        { variant: "warning", title: "Message Title" },
        { variant: "error", title: "Message Title" },
        {},
        { variant: "info" },
        { variant: "warning" },
        { variant: "error" },
        {
          children: (
            <Text variant="lg" color="red100">
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
