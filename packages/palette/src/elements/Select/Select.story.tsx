import { Select } from "./Select"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: Select,
  title: "Components/Select",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A styled select dropdown component with options, states, and form validation.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
  },
}

const OPTIONS = [
  { text: "Please select", value: "" },
  { text: "Default", value: "-decayed_merch" },
  { text: "Price (desc.)", value: "-has_price,-prices" },
  { text: "Price (asc.)", value: "-has_price,prices" },
  { text: "Recently updated", value: "-partner_updated_at" },
  { text: "Recently added", value: "-published_at" },
  { text: "Artwork year (desc.)", value: "-year" },
  { text: "Artwork year (asc.)", value: "year" },
]

export const Default = {
  args: {
    options: OPTIONS,
  },
  parameters: {
    docs: {
      description: {
        story: "Default Select component.",
      },
    },
  },
}

export const Focus = {
  args: {
    options: OPTIONS,
    focus: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Select with focus state.",
      },
    },
  },
}

export const Hover = {
  args: {
    options: OPTIONS,
    hover: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Select with hover state.",
      },
    },
  },
}

export const WithError = {
  args: {
    options: OPTIONS,
    error: "Something went wrong.",
  },
  parameters: {
    docs: {
      description: {
        story: "Select with error state.",
      },
    },
  },
}

export const Disabled = {
  args: {
    options: OPTIONS,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Select disabled state.",
      },
    },
  },
}

export const WithTitle = {
  args: {
    options: OPTIONS,
    title: "Sort",
  },
  parameters: {
    docs: {
      description: {
        story: "Select with title.",
      },
    },
  },
}

export const WithTitleAndDescription = {
  args: {
    options: OPTIONS,
    title: "Sort",
    description: "A description of sorting",
  },
  parameters: {
    docs: {
      description: {
        story: "Select with title and description.",
      },
    },
  },
}

export const WithTitleAndFocus = {
  args: {
    options: OPTIONS,
    title: "Sort",
    focus: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Select with title and focus state.",
      },
    },
  },
}

export const WithTitleAndHover = {
  args: {
    options: OPTIONS,
    title: "Sort",
    hover: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Select with title and hover state.",
      },
    },
  },
}

export const WithTitleAndError = {
  args: {
    options: OPTIONS,
    title: "Sort",
    error: "Something went wrong.",
  },
  parameters: {
    docs: {
      description: {
        story: "Select with title and error state.",
      },
    },
  },
}

export const WithTitleDisabled = {
  args: {
    options: OPTIONS,
    title: "Sort",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Select with title and disabled state.",
      },
    },
  },
}

export const Required = {
  args: {
    options: OPTIONS,
    title: "Sort",
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Select with required state.",
      },
    },
  },
}

export const WithSelectedValue = {
  args: {
    options: OPTIONS,
    selected: "year",
  },
  parameters: {
    docs: {
      description: {
        story: "Select with pre-selected value.",
      },
    },
  },
}

export const WithCustomId = {
  args: {
    options: OPTIONS,
    title: "Pick something",
    required: true,
    id: "pick",
  },
  parameters: {
    docs: {
      description: {
        story: "Select with custom id.",
      },
    },
  },
}

export const WithDescriptionOnly = {
  args: {
    options: OPTIONS,
    title: "Pick something",
    description: "This matters a lot.",
  },
  parameters: {
    docs: {
      description: {
        story: "Select with descriptive text.",
      },
    },
  },
}
