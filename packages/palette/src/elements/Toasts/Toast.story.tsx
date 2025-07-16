import { fn } from "@storybook/test"
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
        { action: { label: "Undo", onClick: fn() } },
      ]}
    >
      <Toast
        id="example"
        message="Message Title"
        description="This is placeholder text."
      />
    </States>
  )
}
