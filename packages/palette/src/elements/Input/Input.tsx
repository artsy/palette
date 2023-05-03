import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled, { css } from "styled-components"
import { height as systemHeight } from "styled-system"
import { RequiredField } from "../../shared/RequiredField"
import { Box, BoxProps, splitBoxProps } from "../Box"
import { Text } from "../Text"
import { Tooltip } from "../Tooltip"
import { INPUT_STATES } from "./tokens"

export interface InputProps
  extends BoxProps,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "width" | "height" | "capture"
    > {
  active?: boolean
  description?: string
  disabled?: boolean
  error?: string | boolean
  focus?: boolean
  hover?: boolean
  required?: boolean
  title?: string
  prefixOffset?: number
  suffixOffset?: number
  showCounter?: boolean
}

/** Input component */
export const Input: React.ForwardRefExoticComponent<
  InputProps & { ref?: React.Ref<HTMLInputElement> }
> = React.forwardRef(
  (
    {
      children,
      className,
      description,
      disabled,
      error,
      required,
      focus,
      hover,
      title,
      height,
      prefixOffset,
      suffixOffset,
      showCounter,
      ...rest
    },
    ref
  ) => {
    const [boxProps, inputProps] = splitBoxProps(rest)
    const [charCount, setCharCount] = React.useState(0)

    const inputName = inputProps.name || "palette-input"

    const countChars = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCharCount(e.target.value.length)
    }

    return (
      <Box width="100%" className={className} {...boxProps}>
        {!!description && (
          <Tooltip pointer content={description} placement="top-end">
            <Text variant="xs" color="black60" textAlign="right">
              <u>What is this?</u>
            </Text>
          </Tooltip>
        )}

        <Box position="relative">
          <StyledInput
            ref={ref as any}
            disabled={disabled}
            focus={focus}
            hover={hover}
            error={!!error}
            required={required}
            height={(height ?? 50) as any}
            name={inputName}
            title={title}
            suffixOffset={suffixOffset}
            prefixOffset={prefixOffset}
            onChange={(e) => {
              inputProps.onChange?.(e)
              if (inputProps.maxLength) countChars(e)
            }}
            {...inputProps}
          />

          {!!title && (
            <StyledLabel prefixOffset={prefixOffset} htmlFor={inputName}>
              {title}
            </StyledLabel>
          )}

          {children}
        </Box>

        {(required || (inputProps?.maxLength && showCounter)) &&
          !(error && typeof error === "string") && (
            <Box display="flex" mt={0.5} mx={1}>
              {required && <RequiredField flex={1} />}

              {!!inputProps?.maxLength && showCounter && (
                <Text flex={1} variant="xs" color="black60" textAlign="right">
                  {charCount}/{inputProps.maxLength}
                </Text>
              )}
            </Box>
          )}

        {error && typeof error === "string" && (
          <Text variant="xs" mt={0.5} ml={1} color="red100">
            {error}
          </Text>
        )}
      </Box>
    )
  }
)

Input.displayName = "Input"

type StyledInputProps = Pick<
  InputProps,
  | "disabled"
  | "error"
  | "hover"
  | "focus"
  | "active"
  | "title"
  | "suffixOffset"
  | "prefixOffset"
>

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: 0 ${themeGet("space.1")};
  appearance: none;
  line-height: 1;
  border: 1px solid;
  border-radius: 3px;
  transition: border-color 0.25s, color 0.25s;
  font-family: ${themeGet("fonts.sans")};
  ${systemHeight};

  ::placeholder {
    transition: color 0.25s, opacity 0.25s;
  }

  ${(props) => {
    return css`
      ${INPUT_STATES.default}
      ${props.hover && INPUT_STATES.hover}
      ${props.focus && INPUT_STATES.focus}
      ${props.active && INPUT_STATES.active}
      ${props.disabled && INPUT_STATES.disabled}
      ${props.error && INPUT_STATES.error}
      ${!!props.prefixOffset &&
      css`
        padding-left: ${props.prefixOffset}px;
      `}
      ${!!props.suffixOffset &&
      css`
        padding-right: ${props.suffixOffset}px;
      `}

      &:hover {
        ${INPUT_STATES.hover}
      }

      &:not(:placeholder-shown) {
        ${!!props.placeholder && INPUT_STATES.completed}
        ${props.error && INPUT_STATES.error}
      }

      &:focus {
        outline: none;
        ${INPUT_STATES.focus}

        :not(:placeholder-shown) {
          ${INPUT_STATES.active}
          ${props.error && INPUT_STATES.error}
        }
      }

      &:disabled {
        cursor: default;
        ${INPUT_STATES.disabled}
      }

      ${props.title &&
      css`
        ::placeholder {
          opacity: 0;
        }
      `}
    `
  }};
`

const StyledLabel = styled.label<StyledInputProps>`
  position: absolute;
  top: 50%;
  left: 5px;
  padding: 0 5px;
  background-color: ${themeGet("colors.white100")};
  transform: translateY(-50%);
  transition: 0.25s cubic-bezier(0.64, 0.05, 0.36, 1);
  transition-property: color, transform, padding, font-size;
  font-family: ${themeGet("fonts.sans")};
  pointer-events: none;

  ${({ prefixOffset }) =>
    !!prefixOffset &&
    css`
      padding-left: ${prefixOffset - 5}px;
    `}
`
