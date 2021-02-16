import React from "react"
import { Dialog } from "./Dialog"

export default {
  title: "Components/Dialog",
}

export const Minimal = () => {
  return (
    <Dialog
      title="Here is a dialog which is modal"
      primaryCta={{
        action: () => ({}),
        text: "Continue",
      }}
    />
  )
}

Minimal.story = {
  parameters: { chromatic: { delay: 500 } },
}

export const WithDetail = () => {
  return (
    <Dialog
      title="Information"
      detail="This extra informaton is important."
      primaryCta={{
        action: () => ({}),
        text: "Continue",
      }}
    />
  )
}

WithDetail.story = {
  name: "With detail",
  parameters: { chromatic: { delay: 500 } },
}

export const WithSecondaryCta = () => {
  return (
    <Dialog
      title="Information"
      detail="This extra informaton is important."
      primaryCta={{
        action: () => ({}),
        text: "Continue",
      }}
      secondaryCta={{
        action: () => ({}),
        text: "Cancel",
      }}
    />
  )
}

WithSecondaryCta.story = {
  name: "With secondary Cta",
  parameters: { chromatic: { delay: 500 } },
}
