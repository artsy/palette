import React from "react"
import { Breadcrumbs } from "./Breadcrumbs"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Breadcrumbs component provides navigation links showing the user's location in the site hierarchy. Automatically adds separators between navigation items.",
      },
      controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
    },
  },
}

export const Default = {
  args: {
    children: (
      <>
        <a href="#1">Level 01</a>
        <a href="#2">Level 02</a>
        <a href="#3">Level 03</a>
        <a href="#4">Level 04</a>
      </>
    ),
  },
}

export const TwoLevels = {
  args: {
    children: (
      <>
        <a href="#1">Level 01</a>
        <a href="#2">Level 02</a>
      </>
    ),
  },
}

export const SingleLevel = {
  args: {
    children: <a href="#1">Level 01</a>,
  },
}
