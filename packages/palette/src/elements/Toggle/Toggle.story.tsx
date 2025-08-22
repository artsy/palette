import { Toggle } from "./Toggle"

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
      include: ["selected", "disabled", "onSelect"],
    },
  },
}

export const Default = {
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
