import React from "react"
import styled from "styled-components"
import { themeGet } from "styled-system"
import { color, space } from "../../helpers"
import { Box } from "../Box"
import { Sans, Serif } from "../Typography"

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  description?: string
  disabled?: boolean
  error?: string
  required?: boolean
  title?: string
}

/**
 * Input component
 */
export const Input: React.SFC<InputProps> = ({
  description,
  disabled,
  error,
  required,
  title,
  ...rest
}) => {
  return (
    <Box width="100%">
      {title && (
        <Serif mb="0.5" size="3">
          {title}
          {required && <Required>*</Required>}
        </Serif>
      )}
      {description && (
        <Serif color="black60" mb="1" size="2">
          {description}
        </Serif>
      )}
      <StyledInput disabled={disabled} error={!!error} {...rest as any} />
      {error && (
        <Sans color="red100" mt="1" size="2">
          {error}
        </Sans>
      )}
    </Box>
  )
}

interface StyledInputProps extends React.HTMLProps<HTMLInputElement> {
  disabled: boolean
  error: boolean
}

/**
 * func to compute border color
 */
export const computeBorderColor = ({ disabled, error, pseudo = null }) => {
  if (disabled) return "black10"
  if (error) return "red100"
  if (pseudo === "hover") return "black60"
  if (pseudo === "focus") return "purple100"
  return "black10"
}

const StyledInput = styled.input<StyledInputProps>`
  font-family: ${themeGet("fontFamily.serif.regular")};
  font-size: ${themeGet("typeSizes.serif.3.fontSize")}px;
  line-height: ${themeGet("typeSizes.serif.3t.lineHeight")}px;
  height: 40px;
  background-color: ${props =>
    props.disabled ? color("black5") : color("white100")};
  border: 1px solid ${props => color(computeBorderColor(props))};
  border-radius: 0;
  transition: border-color 0.25s;
  padding: ${space(1)}px;

  width: 100%;

  &:hover {
    border-color: ${({ disabled, error }) =>
      color(computeBorderColor({ disabled, error, pseudo: "hover" }))};
  }

  &:focus {
    border-color: ${({ disabled, error }) =>
      color(computeBorderColor({ disabled, error, pseudo: "focus" }))};
  }
`
StyledInput.displayName = "StyledInput"

const Required = styled.span`
  color: ${color("purple100")};
`
Required.displayName = "Required"
