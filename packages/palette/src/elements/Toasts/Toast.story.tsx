import { fn } from "@storybook/test"
import { Toast } from "./Toast"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  component: Toast,
  title: "Components/Toast",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A toast notification component with different variants for messages, alerts, success, and errors.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
  },
}

export const Message = {
  args: {
    id: "example",
    variant: "message",
    message: "Message Title",
    description: "This is placeholder text.",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic message toast notification.",
      },
    },
  },
}

export const Alert = {
  args: {
    id: "example",
    variant: "alert",
    message: "Alert Message",
    description: "This is an alert notification.",
  },
  parameters: {
    docs: {
      description: {
        story: "Alert toast notification for warnings.",
      },
    },
  },
}

export const Success = {
  args: {
    id: "example",
    variant: "success",
    message: "Success Message",
    description: "This is a success notification.",
  },
  parameters: {
    docs: {
      description: {
        story: "Success toast notification.",
      },
    },
  },
}

export const Error = {
  args: {
    id: "example",
    variant: "error",
    message: "Error Message",
    description: "This is an error notification.",
  },
  parameters: {
    docs: {
      description: {
        story: "Error toast notification.",
      },
    },
  },
}

export const WithAction = {
  args: {
    id: "example",
    variant: "message",
    message: "Message with Action",
    description: "This toast has an action button.",
    action: { label: "Undo", onClick: fn() },
  },
  parameters: {
    docs: {
      description: {
        story: "Toast with an action button.",
      },
    },
  },
}
