import React, { useState } from "react"
import { InputProps } from "../Input"
import { LabeledInput } from "../LabeledInput"
import { Clickable } from "../Clickable"
import ShowIcon from "@artsy/icons/ShowIcon"
import HideIcon from "@artsy/icons/HideIcon"

export interface PasswordInputProps extends InputProps {
  defaultVisibility?: boolean
}

export const PasswordInput: React.FC<React.PropsWithChildren<PasswordInputProps>> = ({
  defaultVisibility = false,
  ...rest
}) => {
  const [visibility, setVisibility] = useState(defaultVisibility)

  const handleClick = () => {
    setVisibility((prevVisibility) => !prevVisibility)
  }

  return (
    <LabeledInput
      type={visibility ? "text" : "password"}
      label={
        <Clickable
          onClick={handleClick}
          height="100%"
          aria-label={visibility ? "Hide password" : "Show password"}
        >
          {visibility ? <HideIcon aria-hidden /> : <ShowIcon aria-hidden />}
        </Clickable>
      }
      {...rest}
    />
  )
}
