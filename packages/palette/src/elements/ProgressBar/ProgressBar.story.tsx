import React, { useEffect, useState } from "react"
import { States } from "storybook-states"
import { ProgressBar, ProgressBarProps } from "./ProgressBar"

export default {
  title: "Components/ProgressBar",
}

export const Default = () => {
  return (
    <States<ProgressBarProps>
      states={[
        { percentComplete: 0 },
        { percentComplete: 1 },
        { percentComplete: 50 },
        { percentComplete: 100 },
        { percentComplete: 50, highlight: "red100" },
        { percentComplete: 50, showBackground: false },
      ]}
    >
      <ProgressBar percentComplete={40} />
    </States>
  )
}

export const Demo = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => setProgress(Math.floor(Math.random() * Math.floor(100))),
      500
    )
    return () => clearInterval(timer)
  }, [])

  return (
    <States<Partial<ProgressBarProps>>>
      <ProgressBar percentComplete={progress} />
    </States>
  )
}

Demo.story = {
  parameters: { chromatic: { disable: true } },
}
