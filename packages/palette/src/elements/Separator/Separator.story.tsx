import { Separator } from "./Separator"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: Separator,
  title: "Components/Separator",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A horizontal line separator component with customizable colors and styling.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
  },
}

export const Default = {
  args: {
    as: "hr",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic horizontal line separator.",
      },
    },
  },
}

export const WithColor = {
  args: {
    as: "hr",
    color: "mono30",
  },
  parameters: {
    docs: {
      description: {
        story: "Separator with custom color.",
      },
    },
  },
}

export const WithBorderColor = {
  args: {
    as: "hr",
    borderColor: "red100",
  },
  parameters: {
    docs: {
      description: {
        story: "Separator with custom border color.",
      },
    },
  },
}

export const WithSpacing = {
  args: {
    as: "hr",
    borderWidth: 5,
    my: 2,
  },
  parameters: {
    docs: {
      description: {
        story: "Separator with custom width and vertical spacing.",
      },
    },
  },
}
