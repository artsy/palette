import React, { useState } from "react"
import { InputProps } from "../Input"
import { LabeledInput } from "../LabeledInput"
import { Clickable } from "../Clickable"
import { EyeClosedIcon } from "../../svgs/EyeClosedIcon"
import { EyeOpenedIcon } from "../../svgs/EyeOpenedIcon"

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
          {visibility ? (
            <EyeClosedIcon display="block" />
          ) : (
            <EyeOpenedIcon display="block" />
          )}
        </Clickable>
      }
      {...rest}
    />
  )
}
