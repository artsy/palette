import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled, { css } from "styled-components"
import { height as systemHeight } from "styled-system"
import { Box, BoxProps, splitBoxProps } from "../Box"
import { Text } from "../Text"
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
      ...rest
    },
    ref
  ) => {
    const [boxProps, inputProps] = splitBoxProps(rest)

    return (
      <Box width="100%" className={className} {...boxProps}>
        {(title || description) && (
          <>
            {title && (
              <Text variant="xs">
                {title}
                {required && (
                  <Box as="span" color="brand">
                    *
                  </Box>
                )}
              </Text>
            )}

            {description && (
              <Text variant="xs" color="black60">
                {description}
              </Text>
            )}
          </>
        )}

        <Box position="relative" mt={title || description ? 0.5 : 0}>
          <StyledInput
            ref={ref as any}
            disabled={disabled}
            focus={focus}
            hover={hover}
            error={!!error}
            required={required}
            height={(height ?? 50) as any}
            {...inputProps}
          />

          {children}
        </Box>

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
  "disabled" | "error" | "hover" | "focus" | "active"
>

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: 0 ${themeGet("space.1")};
  appearance: none;
  line-height: 1;
  border: 0;
  border: 1px solid ${themeGet("colors.black15")};
  border-radius: 3px;
  transition: border-color 0.25s, color 0.25s;
  font-family: ${themeGet("fonts.sans")};
  ${systemHeight};

  ::placeholder {
    transition: color 0.25s;
  }

  ${(props) => {
    return css`
      ${INPUT_STATES.default}
      ${props.hover && INPUT_STATES.hover}
      ${props.focus && INPUT_STATES.focus}
      ${props.active && INPUT_STATES.active}
      ${props.disabled && INPUT_STATES.disabled}
      ${props.error && INPUT_STATES.error}

      &:hover {
        ${INPUT_STATES.hover}
      }

      &:not(:placeholder-shown) {
        ${INPUT_STATES.completed}
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
    `
  }};
`
