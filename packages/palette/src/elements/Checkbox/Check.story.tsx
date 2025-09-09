import { Check } from "./Check"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: Check,
  title: "Components/Check",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A simple checkbox component that can be selected, disabled, or show error states.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
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
        story: "Basic checkbox in unselected state.",
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
        story: "Checkbox in selected state.",
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
        story: "Disabled checkbox that cannot be interacted with.",
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
        story: "Disabled checkbox in selected state.",
      },
    },
  },
}

export const WithError = {
  args: {
    error: true,
    selected: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox showing error state.",
      },
    },
  },
}
