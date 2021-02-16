import React from "react"
import { ProgressBar } from "./ProgressBar"

export default {
  title: "Components/ProgressBar",
}

export const Default = () => {
  return <ProgressBar highlight="purple100" percentComplete={40} />
}

export const WithoutBackground = () => {
  return (
    <ProgressBar
      highlight="purple100"
      percentComplete={40}
      showBackground={false}
    />
  )
}

WithoutBackground.story = {
  name: "Without background",
}
