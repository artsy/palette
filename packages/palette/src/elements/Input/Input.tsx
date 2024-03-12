import { themeGet } from "@styled-system/theme-get"
import React, { useCallback } from "react"
import styled, { css } from "styled-components"
import { height as systemHeight } from "styled-system"
import { RequiredField } from "../../shared/RequiredField"
import { Box, BoxProps, splitBoxProps } from "../Box"
import { Text } from "../Text"
import { Tooltip } from "../Tooltip"
import { INPUT_STATES } from "./tokens"
import { FORM_ELEMENT_TRANSITION } from "../../helpers"

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
  labelOffset?: number
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
      labelOffset,
      showCounter,
      defaultValue = "",
      onChange,
      ...rest
    },
    ref
  ) => {
    const [boxProps, inputProps] = splitBoxProps(rest)
    const [value, setValue] = React.useState(inputProps.value || defaultValue)

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.currentTarget.value
        setValue(nextValue)
        onChange?.(event)
      },
      [onChange]
    )

    return (
      <Box width="100%" className={className} {...boxProps}>
        {!!description && (
          <Tooltip pointer content={description} placement="top-end">
            <Text variant="xs" color="black60" textAlign="right">
              <u>What is this?</u>
            </Text>
          </Tooltip>
        )}

        <Box position="relative" mt={!!title && !description ? 1 : 0}>
          <StyledInput
            ref={ref as any}
            disabled={disabled}
            focus={focus}
            hover={hover}
            error={!!error}
            required={required}
            height={(height ?? 50) as any}
            name={inputProps.name}
            title={title}
            labelOffset={labelOffset}
            defaultValue={defaultValue}
            onChange={handleChange}
            placeholder={inputProps.placeholder || " "}
            {...inputProps}
          />

          {!!title && (
            <StyledLabel labelOffset={labelOffset} htmlFor={inputProps.name}>
              {title}
              <span />
            </StyledLabel>
          )}

          {children}
        </Box>

        {(required || (inputProps?.maxLength && showCounter)) &&
          !(error && typeof error === "string") && (
            <Box display="flex" mt={0.5} mx={1}>
              {required && <RequiredField disabled={disabled} flex={1} />}

              {!!inputProps?.maxLength && showCounter && (
                <Text flex={1} variant="xs" color="black60" textAlign="right">
                  {String(value).length}/{inputProps.maxLength}
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
  "disabled" | "error" | "hover" | "focus" | "active" | "title" | "labelOffset"
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
  background-color: transparent;
  transform: translateY(-50%);
  transition: ${FORM_ELEMENT_TRANSITION};
  transition-property: color, transform, padding, font-size;
  font-family: ${themeGet("fonts.sans")};
  pointer-events: none;

  & > span {
    background-color: ${themeGet("colors.white100")};
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: ${FORM_ELEMENT_TRANSITION};
    transition-property: height, top;
    transition-delay: 0.1s;
  }

  ${({ labelOffset }) =>
    !!labelOffset &&
    css`
      padding-left: ${labelOffset - 5}px;
    `}
`
