import { fn } from "@storybook/test"
import React, { useState } from "react"
import { States } from "storybook-states"
import { Clickable } from "../Clickable"
import { LabeledInput, LabeledInputProps } from "./LabeledInput"

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
      include: [
        "label",
        "variant",
        "title",
        "description",
        "placeholder",
        "type",
        "name",
      ],
    },
  },
}

export const Default = {
  args: {
    label: "$",
  },
  render: (args) => (
    <States<Partial<LabeledInputProps>>
      states={[
        { label: "$USD", placeholder: "Min", type: "number" },
        {
          placeholder: "Clickable label",
          label: (
            <Clickable
              onClick={fn()}
              bg="mono60"
              width={18}
              height={18}
              borderRadius="50%"
            />
          ),
        },
        { title: "Amount" },
        { title: "Amount", description: "Currency: USD" },
        {
          label: "USD",
          variant: "prefix",
          title: "Your offer",
          placeholder: "Start typing...",
          name: "offer",
        },
        {
          label: "USD",
          variant: "suffix",
          title: "Your offer",
          placeholder: "Start typing...",
          name: "offer",
        },
        {
          label: "USD",
          variant: "suffix",
          title: "Your offer",
          placeholder: "Start typing...",
          name: "offer",
          showCounter: true,
          maxLength: 40,
        },
      ]}
    >
      <LabeledInput {...args} />
    </States>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default LabeledInput with various states.",
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
