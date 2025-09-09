import React from "react"
import { Image } from "../Image"
import { CSSGrid } from "./CSSGrid"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  title: "Components/CSSGrid",
  component: CSSGrid,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "CSSGrid component provides a CSS Grid layout container with responsive props support. Allows for flexible grid layouts with configurable gaps, columns, and responsive breakpoints.",
      },
      controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
    },
  },
}

export const ResponsiveGrid = {
  args: {
    width: [220, 420, 680],
    gridGap: [2, 3, 4],
    gridTemplateColumns: ["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"],
    children: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <Image
        src="https://picsum.photos/id/1025/140/100/"
        width={[100, 120, 140]}
        key={i}
      />
    )),
  },
}

export const SimpleGrid = {
  args: {
    gridGap: 2,
    gridTemplateColumns: "repeat(3, 1fr)",
    children: [1, 2, 3, 4, 5, 6].map((i) => (
      <div
        key={i}
        style={{ background: "#f0f0f0", padding: "16px", textAlign: "center" }}
      >
        Item {i}
      </div>
    )),
  },
}

export const FixedGrid = {
  args: {
    width: 400,
    gridGap: 1,
    gridTemplateColumns: "repeat(4, 1fr)",
    children: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <div
        key={i}
        style={{ background: "#e0e0e0", padding: "8px", textAlign: "center" }}
      >
        {i}
      </div>
    )),
  },
}
