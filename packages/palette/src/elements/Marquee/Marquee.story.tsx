import React from "react"
import { Marquee } from "./Marquee"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: Marquee,
  title: "Components/Marquee",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A scrolling marquee text component with different visual variants and speed options.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
  },
}

export const Default = {
  args: {
    marqueeText: "Black Owned",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic marquee with default settings.",
      },
    },
  },
}

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Marquee variant="defaultLight" marqueeText="Black Owned" />
      <Marquee variant="defaultDark" marqueeText="Women Owned" />
      <Marquee variant="brand" marqueeText="Black Owned" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different visual variants of the marquee component.",
      },
    },
  },
}

export const Speeds = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Marquee speed="5s" marqueeText="Fast Speed (5s)" />
      <Marquee speed="20s" marqueeText="Slow Speed (20s)" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Marquee with different animation speeds.",
      },
    },
  },
}

export const WithoutDivider = {
  args: {
    divider: false,
    marqueeText: "No Divider",
  },
  parameters: {
    docs: {
      description: {
        story: "Marquee without the divider separator.",
      },
    },
  },
}
