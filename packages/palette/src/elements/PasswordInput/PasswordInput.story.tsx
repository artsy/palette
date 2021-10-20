import React from "react"
import { States } from "storybook-states"
import { PasswordInput, PasswordInputProps } from "./PasswordInput"

export default {
  title: "Components/PasswordInput",
}

export const Default = () => {
  return (
    <States<Partial<PasswordInputProps>>
      states={[
        {},
        { defaultValue: "secret" },
        { defaultValue: "secret", defaultVisibility: true },
      ]}
    >
      <PasswordInput name="Password" placeholder="Password" />
    </States>
  )
}
