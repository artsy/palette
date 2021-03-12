import React from "react"
import { States } from "storybook-states"
import { CarouselBar, CarouselBarProps } from "./CarouselBar"

export default {
  title: "Components/CarouselBar",
}

export const Default = () => {
  return (
    <States<CarouselBarProps>
      states={[
        { percentComplete: 0 },
        { percentComplete: 1 },
        { percentComplete: 50 },
        { percentComplete: 100 },
      ]}
    >
      <CarouselBar percentComplete={40} />
    </States>
  )
}
