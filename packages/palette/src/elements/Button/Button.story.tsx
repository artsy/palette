import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import { Button } from "./index"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Button component provides a clickable interface element with multiple variants, sizes, and states. Supports loading states, icons, and can be rendered as different HTML elements.",
      },
      controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
    },
  },
}

export const Default = {
  args: {
    children: "Button",
  },
}

export const Primary = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
}

export const Secondary = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
}

export const Large = {
  args: {
    size: "large",
    children: "Large Button",
  },
}

export const Small = {
  args: {
    size: "small",
    children: "Small Button",
  },
}

export const WithIconBasic = {
  args: {
    children: "Create an Alert",
    variant: "secondaryBlack",
    size: "small",
    Icon: BellStrokeIcon,
  },
}

export const LoadingState = {
  args: {
    children: "Loading Button",
    loading: true,
  },
}

export const Disabled = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
}

export const Success = {
  args: {
    children: "Success Button",
    success: true,
  },
}

export const Focus = {
  args: {
    children: "Focused Button",
    focus: true,
  },
}

export const Hover = {
  args: {
    children: "Hovered Button",
    hover: true,
  },
}

export const Active = {
  args: {
    children: "Active Button",
    active: true,
  },
}

export const PrimaryWhite = {
  args: {
    variant: "primaryWhite",
    children: "Primary White Button",
  },
}

export const SecondaryWhite = {
  args: {
    variant: "secondaryWhite",
    children: "Secondary White Button",
  },
}

export const SecondaryBlack = {
  args: {
    variant: "secondaryBlack",
    children: "Secondary Black Button",
  },
}

export const AutoFocus = {
  args: {
    autoFocus: true,
    children: "Auto Focused Button",
  },
}

export const NotKeyboardFocusable = {
  args: {
    tabIndex: -1,
    children: "Not Keyboard Focusable",
  },
}

export const FullWidth = {
  args: {
    display: "block",
    width: "100%",
    children: "Full Width Button",
  },
}

export const AsAnchor = {
  args: {
    as: "a",
    href: "#example",
    children: "This is an anchor tag",
  },
}

export const ResponsiveSize = {
  args: {
    size: ["small", "large"],
    children: "Resize Viewport",
  },
}
