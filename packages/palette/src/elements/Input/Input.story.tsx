import { Input } from "./Input"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Input component provides a text input field with built-in validation, error states, and accessibility features. Supports titles, placeholders, required fields, and character limits.",
      },
      controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
    },
  },
}

export const Basic = {
  args: {
    placeholder: "Enter text here",
  },
}

export const WithTitle = {
  args: {
    title: "Your Name",
    placeholder: "Enter your name",
  },
}

export const RequiredField = {
  args: {
    title: "Email Address",
    required: true,
    placeholder: "Enter your email",
  },
}

export const WithError = {
  args: {
    title: "Your Offer",
    error: "This field is required",
    value: "Invalid input",
  },
}

export const Disabled = {
  args: {
    title: "Disabled Input",
    disabled: true,
    value: "Cannot edit this",
  },
}

export const WithMaxLength = {
  args: {
    title: "Short Message",
    maxLength: 50,
    placeholder: "Maximum 50 characters",
  },
}

export const WithDescription = {
  args: {
    title: "Your Offer",
    description: "This is my description",
    placeholder: "Start typing...",
  },
}

export const WithCounter = {
  args: {
    title: "Your Offer",
    required: true,
    maxLength: 50,
    showCounter: true,
    placeholder: "Start typing...",
  },
}

export const LongTitle = {
  args: {
    title: "Your offer with a really really long title",
    placeholder: "Start typing...",
  },
}

export const CustomWidth = {
  args: {
    width: "50%",
    placeholder: "Start typing...",
  },
}

export const EmailInput = {
  args: {
    title: "Email",
    type: "email",
    required: true,
    placeholder: "Enter your email address",
  },
}

export const CustomHeight = {
  args: {
    height: 40,
    placeholder: "Input is 40px in height",
  },
}

export const FocusState = {
  args: {
    focus: true,
    placeholder: "This input is focused",
  },
}

export const HoverState = {
  args: {
    hover: true,
    placeholder: "This input is hovered",
  },
}

export const ActiveState = {
  args: {
    active: true,
    placeholder: "This input is active",
  },
}
