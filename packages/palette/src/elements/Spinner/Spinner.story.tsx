import React from "react"
import { States } from "storybook-states"
import { Spinner, SpinnerProps } from "./Spinner"

export default {
  title: "Components/Spinner",
  parameters: { chromatic: { disable: true } },
}

export const Default = () => (
  <States<SpinnerProps>
    states={[
      {},
      { color: "brand", size: "small", m: 2 },
      { size: ["small", "medium", "large"] },
    ]}
  >
    <Spinner position="static" />
  </States>
)

export const DefaultSpinner = () => {
  return <Spinner />
}

export const SpinnerWithDelayedShow = () => {
  return <Spinner delay={1000} />
}

SpinnerWithDelayedShow.story = {
  name: "Spinner with delayed show",
}
