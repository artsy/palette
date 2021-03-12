import React, { useEffect } from "react"
import { States } from "storybook-states"
import { useCursor } from "use-cursor"
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
      ]}
    >
      <ProgressDots activeIndex={0} amount={5} />
    </States>
  )
}

export const Demo = () => {
  const { index, handleNext } = useCursor({ max: 5 })

  useEffect(() => {
    const interval = setInterval(handleNext, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [handleNext])

  return (
    <>
      <ProgressDots activeIndex={index} amount={5} my={2} />
      <ProgressDots variant="dash" activeIndex={index} amount={5} my={2} />
    </>
  )
}

Demo.story = {
  parameters: { chromatic: { disable: true } },
}
