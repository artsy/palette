import { action } from "@storybook/addon-actions"
import React from "react"
import { States } from "storybook-states"
import { Toast, ToastProps } from "./Toast"

export default {
  title: "Components/Toast",
}

export const Default = () => {
  return (
    <States<Partial<ToastProps>>
      states={[
        { variant: "message" },
        { variant: "alert" },
        { variant: "success" },
        { variant: "error" },
        { action: { label: "Undo", onClick: action("onClick") } },
      ]}
    >
      <Toast message="Message Title" description="This is placeholder text." />
    </States>
  )
}
