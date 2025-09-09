import React from "react"
import { Text } from "../Text"
import { Message, MESSAGE_VARIANTS, MessageVariant } from "./Message"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

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
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
  },
}

export const Default = {
  args: {
    children:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quae natus assumenda distinctio, voluptatum magni. Natus, aliquam neque odio debitis totam labore maiores, corrupti mollitia repudiandae optio illo, autem sunt.",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic message with default styling.",
      },
    },
  },
}

export const AllVariants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {Object.keys(MESSAGE_VARIANTS).map((variant) => (
        <Message
          key={variant}
          variant={variant as MessageVariant}
          title="Message Title"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Message>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available message variants with titles.",
      },
    },
  },
}

export const WithoutTitle = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Message variant="info">Information message without title.</Message>
      <Message variant="warning">Warning message without title.</Message>
      <Message variant="error">Error message without title.</Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Messages without titles showing different variants.",
      },
    },
  },
}

export const WithCustomChildren = {
  args: {
    children: (
      <Text variant="lg-display" color="red100">
        custom children
      </Text>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Message with custom React children instead of plain text.",
      },
    },
  },
}
