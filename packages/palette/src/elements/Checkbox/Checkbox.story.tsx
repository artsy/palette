import React from "react"
import { Checkbox } from "./Checkbox"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Checkbox component provides a selectable input with label support. Includes states for selected, disabled, error, focus, and hover interactions.",
      },
      controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
    },
  },
}

export const Unchecked = {
  args: {
    children: "Checkbox label",
  },
}

export const Checked = {
  args: {
    children: "Checked checkbox",
    selected: true,
  },
}

export const WithError = {
  args: {
    children: "Checkbox with error",
    error: true,
  },
}

export const Disabled = {
  args: {
    children: "Disabled checkbox",
    disabled: true,
  },
}

export const DisabledAndChecked = {
  args: {
    children: "Disabled and checked",
    disabled: true,
    selected: true,
  },
}

export const Focus = {
  args: {
    children: "Focused checkbox",
    focus: true,
  },
}

export const Hover = {
  args: {
    children: "Hovered checkbox",
    hover: true,
  },
}

export const FocusAndSelected = {
  args: {
    children: "Focused and selected",
    focus: true,
    selected: true,
  },
}

export const HoverAndSelected = {
  args: {
    children: "Hovered and selected",
    hover: true,
    selected: true,
  },
}

export const WithCustomChildren = {
  args: {
    children: (
      <>
        A label <>({2 + 2})</>
      </>
    ),
  },
}

export const FullWidth = {
  args: {
    width: "100%",
    children: "Full width checkbox",
  },
}
