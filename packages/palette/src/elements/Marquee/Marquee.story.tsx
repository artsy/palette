import React from "react"
import { Marquee, MarqueeProps } from "./Marquee"
import { States } from "storybook-states"

export default {
  title: "Components/Marquee",
}

export const Default = () => {
  return (
    <States<MarqueeProps>
      states={[
        { variant: "defaultLight", marqueeText: "Black Owned" },
        { variant: "defaultDark", marqueeText: "Black Owned" },
        { variant: "brand", marqueeText: "Black Owned" },
        { speed: "5s", marqueeText: "Black Owned" },
        { speed: "20s", marqueeText: "Black Owned" },
        { divider: false, marqueeText: "Black Owned" },
      ]}
    >
      <Marquee marqueeText="Black Owned" />
    </States>
  )
}
