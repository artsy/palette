import React, { useState } from "react"
import { InputProps } from "../Input"
import { LabeledInput } from "../LabeledInput"
import { Clickable } from "../Clickable"
import ShowIcon from "@artsy/icons/ShowIcon"
import HideIcon from "@artsy/icons/HideIcon"

export interface PasswordInputProps extends InputProps {
  defaultVisibility?: boolean
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
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
        <Clickable onClick={handleClick} height="100%">
          {visibility ? <HideIcon /> : <ShowIcon />}
        </Clickable>
      }
      {...rest}
    />
  )
}
