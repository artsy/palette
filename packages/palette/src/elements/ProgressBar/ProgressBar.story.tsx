import React, { useEffect, useState } from "react"
import { ProgressBar } from "./ProgressBar"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  component: ProgressBar,
  title: "Components/ProgressBar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A progress bar component that displays completion percentage with customizable colors and background.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
  },
}

export const Default = {
  args: {
    percentComplete: 40,
  },
  parameters: {
    docs: {
      description: {
        story: "Basic progress bar showing completion percentage.",
      },
    },
  },
}

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <ProgressBar percentComplete={0} />
      <ProgressBar percentComplete={1} />
      <ProgressBar percentComplete={50} />
      <ProgressBar percentComplete={100} />
      <ProgressBar percentComplete={50} highlight="red100" />
      <ProgressBar percentComplete={50} showBackground={false} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different progress bar configurations and states.",
      },
    },
  },
}

export const AnimatedDemo = {
  render: () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
      const timer = setInterval(
        () => setProgress(Math.floor(Math.random() * Math.floor(100))),
        500
      )
      return () => clearInterval(timer)
    }, [])

    return <ProgressBar percentComplete={progress} />
  },
  parameters: {
    chromatic: { disable: true },
    docs: {
      description: {
        story: "Animated progress bar with randomly changing values.",
      },
    },
  },
}
