import React, { useState } from "react"
import { LabeledInput } from "./LabeledInput"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: LabeledInput,
  title: "Components/LabeledInput",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An input field with an optional label that can be positioned as prefix or suffix.",
      },
    },
    controls: {
      exclude: STORYBOOK_PROPS_BLOCKLIST,
    },
  },
}

export const Default = {
  args: {
    label: "$",
    placeholder: "Enter amount",
  },
  render: (args) => <LabeledInput {...args} />,
  parameters: {
    docs: {
      description: {
        story: "Basic LabeledInput with a dollar sign label.",
      },
    },
  },
}

export const CharacterCountExample = {
  render: () => {
    const defaultValue = "Hello world"
    const [length, setLength] = useState(defaultValue.length)
    return (
      <LabeledInput
        label={length}
        onChange={(e) => setLength(e.currentTarget.value.length)}
        defaultValue={defaultValue}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: "LabeledInput with character count display.",
      },
    },
  },
}

export const CustomHeight = {
  args: {
    label: "🔎",
    height: 40,
    placeholder: "Input is 40px in height",
  },
  parameters: {
    docs: {
      description: {
        story: "LabeledInput with custom height.",
      },
    },
  },
}
