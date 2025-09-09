import { fn } from "@storybook/test"
import React from "react"
import { Clickable } from "./Clickable"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  title: "Components/Clickable",
  component: Clickable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Clickable component provides an accessible clickable element that can be styled like a button but renders as a span by default. Includes proper focus and interaction states.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
  },
}

export const Default = {
  args: {
    children: "Clickable",
    onClick: fn(),
  },
}

export const WithUnderline = {
  args: {
    children: "Underlined Clickable",
    textDecoration: "underline",
    onClick: fn(),
  },
}

export const DefaultCursor = {
  args: {
    children: "Default Cursor",
    cursor: "default",
    onClick: fn(),
  },
}

export const MultiLine = {
  args: {
    children: (
      <>
        Inherits the page's
        <br />
        text alignment.
      </>
    ),
    onClick: fn(),
  },
}

export const ButtonType = {
  args: {
    children: "Button Type",
    type: "button",
    onClick: fn(),
  },
}

export const SubmitType = {
  args: {
    children: "Submit Type",
    type: "submit",
    onClick: fn(),
  },
}
