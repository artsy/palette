import { action } from "@storybook/addon-actions"
import React, { useState } from "react"
import { States } from "storybook-states"
import { ProgressDots, ProgressDotsProps } from "./ProgressDots"

export default {
  title: "Components/ProgressDots",
}

export const Default = () => {
  return (
    <States<ProgressDotsProps>
      states={[
        { activeIndex: 0, amount: 5 },
        { activeIndex: 2, amount: 5 },
        { activeIndex: 4, amount: 5 },
        { activeIndex: 0, amount: 25 },
        { variant: "dash", activeIndex: 0, amount: 5 },
        { variant: "dash", activeIndex: 2, amount: 5 },
        { variant: "dash", activeIndex: 4, amount: 5 },
        { variant: "dash", activeIndex: 0, amount: 25 },
        {
          variant: "dash",
          activeIndex: 0,
          amount: 5,
          onClick: action("onClick"),
        },
      ]}
    >
      <ProgressDots activeIndex={0} amount={5} />
    </States>
  )
}

export const Demo = () => {
  const [index, setIndex] = useState(0)

  return (
    <>
      <ProgressDots activeIndex={index} amount={5} my={2} onClick={setIndex} />

      <ProgressDots
        variant="dash"
        activeIndex={index}
        amount={5}
        my={2}
        onClick={setIndex}
      />
    </>
  )
}

Demo.story = {
  parameters: { chromatic: { disable: true } },
}
