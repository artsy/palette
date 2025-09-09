import React from "react"
import { Toggle } from "./Toggle"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  component: Toggle,
  title: "Components/Toggle",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A toggle switch component for binary on/off states with hover and disabled states.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
  },
}

export const Default = {
  render: (args) => {
    const [selected, setSelected] = React.useState(args.selected ?? false)
    return (
      <Toggle
        {...args}
        selected={selected}
        onSelect={() => setSelected(!selected)}
      />
    )
  },
  args: {
    selected: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Basic toggle in off state.",
      },
    },
  },
}

export const Selected = {
  render: (args) => {
    const [selected, setSelected] = React.useState(args.selected ?? true)
    return (
      <Toggle
        {...args}
        selected={selected}
        onSelect={() => setSelected(!selected)}
      />
    )
  },
  args: {
    selected: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Toggle in selected/on state.",
      },
    },
  },
}

export const Disabled = {
  render: (args) => <Toggle {...args} />,
  args: {
    disabled: true,
    selected: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled toggle that cannot be interacted with.",
      },
    },
  },
}

export const DisabledSelected = {
  render: (args) => <Toggle {...args} />,
  args: {
    disabled: true,
    selected: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled toggle in selected state.",
      },
    },
  },
}
