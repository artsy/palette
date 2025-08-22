import React from "react"
import { Marquee, MarqueeProps } from "./Marquee"
import { States } from "storybook-states"

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
      include: ["marqueeText", "variant", "speed", "divider"],
    },
  },
}

export const Default = () => {
  return (
    <States<MarqueeProps>
      states={[
        { variant: "defaultLight", marqueeText: "Black Owned" },
        { variant: "defaultDark", marqueeText: "Women Owned" },
        { variant: "brand", marqueeText: "Black Owned" },
        { speed: "5s", marqueeText: "Black Owned" },
        { speed: "20s", marqueeText: "Women Owned" },
        { divider: false, marqueeText: "Black Owned" },
      ]}
    >
      <Marquee marqueeText="Black Owned" />
    </States>
  )
}
