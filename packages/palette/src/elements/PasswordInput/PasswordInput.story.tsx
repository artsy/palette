import { PasswordInput } from "./PasswordInput"

export default {
  component: PasswordInput,
  title: "Components/PasswordInput",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A password input field with a toggle to show/hide the password text.",
      },
    },
    controls: {
      include: ["name", "placeholder", "defaultValue", "defaultVisibility"],
    },
  },
}

export const Default = {
  args: {
    name: "Password",
    placeholder: "Password",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic password input with placeholder text.",
      },
    },
  },
}

export const WithValue = {
  args: {
    name: "Password",
    placeholder: "Password",
    defaultValue: "secret",
  },
  parameters: {
    docs: {
      description: {
        story: "Password input with a default value.",
      },
    },
  },
}

export const VisibleByDefault = {
  args: {
    name: "Password",
    placeholder: "Password",
    defaultValue: "secret",
    defaultVisibility: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Password input with text visible by default.",
      },
    },
  },
}
