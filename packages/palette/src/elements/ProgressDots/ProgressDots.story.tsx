import { fn } from "@storybook/test"
import React, { useState } from "react"
import { ProgressDots } from "./ProgressDots"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: ProgressDots,
  title: "Components/ProgressDots",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A navigation component displaying a series of dots or dashes to indicate progress or position.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
  },
}

export const Default = {
  args: {
    activeIndex: 0,
    amount: 5,
  },
  parameters: {
    docs: {
      description: {
        story: "Basic progress dots showing position in a sequence.",
      },
    },
  },
}

export const DotVariants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <ProgressDots activeIndex={0} amount={5} />
      <ProgressDots activeIndex={2} amount={5} />
      <ProgressDots activeIndex={4} amount={5} />
      <ProgressDots activeIndex={0} amount={25} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dot variant with different active indices and amounts.",
      },
    },
  },
}

export const DashVariants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <ProgressDots variant="dash" activeIndex={0} amount={5} />
      <ProgressDots variant="dash" activeIndex={2} amount={5} />
      <ProgressDots variant="dash" activeIndex={4} amount={5} />
      <ProgressDots variant="dash" activeIndex={0} amount={25} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dash variant with different active indices and amounts.",
      },
    },
  },
}

export const Interactive = {
  render: () => {
    const [index, setIndex] = useState(0)

    return (
      <>
        <ProgressDots
          activeIndex={index}
          amount={5}
          my={2}
          onClick={setIndex}
        />
        <ProgressDots
          variant="dash"
          activeIndex={index}
          amount={5}
          my={2}
          onClick={setIndex}
        />
      </>
    )
  },
  parameters: {
    chromatic: { disable: true },
    docs: {
      description: {
        story: "Interactive progress dots that respond to clicks.",
      },
    },
  },
}

export const Clickable = {
  args: {
    variant: "dash",
    activeIndex: 0,
    amount: 5,
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: "Progress dots with click handler functionality.",
      },
    },
  },
}
