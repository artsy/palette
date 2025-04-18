import { themeGet } from "@styled-system/theme-get"
import React, { forwardRef, useState } from "react"
import styled, { css, ExecutionContext } from "styled-components"
import { FORM_ELEMENT_TRANSITION } from "../../helpers"
import { RequiredField } from "../../shared/RequiredField"
import { Box, BoxProps, splitBoxProps } from "../Box"
import { Text } from "../Text"
import { Tooltip } from "../Tooltip"
import { SELECT_STATES } from "./tokens"

export interface Option {
  value: string
  text: string
}

export interface SelectProps
  extends BoxProps,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onSelect" | "size"> {
  description?: string
  disabled?: boolean
  error?: string | boolean
  focus?: boolean
  hover?: boolean
  name?: string
  options: Option[]
  required?: boolean
  selected?: string
  title?: string
  onSelect?: (value: string) => void
}

/** A drop-down select menu */
export const Select = forwardRef<HTMLElement, SelectProps>(
  (
    {
      description,
      disabled,
      error,
      focus,
      hover,
      id,
      name,
      options,
      required,
      selected,
      title,
      onSelect,
      onChange,
      value,
      ...rest
    },
    ref
  ) => {
    const [boxProps, selectProps] = splitBoxProps(rest)
    // due to :has not available in Firefox yet, we need to add the styles to the label using JS
    const [selectedOption, setSelectedOption] = useState(selected || value)
    const [isFocused, setIsFocused] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    return (
      <Box width="100%" {...boxProps}>
        {!!description && (
          <Tooltip pointer content={description} placement="top-end">
            <Text variant="xs" color="mono60" textAlign="right">
              <u>What is this?</u>
            </Text>
          </Tooltip>
        )}

        <Container
          mt={!!title && !description ? 1 : 0}
          disabled={!!disabled}
          hover={!!hover || isHovered}
          error={error!}
          focus={!!focus || isFocused}
          title={title}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          optionSelected={!!selectedOption}
        >
          <select
            ref={ref as any}
            id={id}
            disabled={disabled}
            name={name}
            value={selected || value}
            onChange={(event) => {
              onSelect && onSelect(event.target.value)
              onChange && onChange(event)
              setSelectedOption(event.target.value)
            }}
            {...selectProps}
          >
            {options.map(({ value, text }) => {
              return (
                <option value={value} key={value}>
                  {text}
                </option>
              )
            })}
          </select>

          {!!title && (
            <StyledLabel htmlFor={id}>
              {title}

              <span />
            </StyledLabel>
          )}
        </Container>

        {required && !(error && typeof error === "string") && (
          <RequiredField mt={0.5} ml={1} disabled={disabled} />
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

Select.displayName = "Select"

const resetMixin = css`
  appearance: none;
  background: none;
  border: none;
  outline: 0;
  text-indent: 0.01px;
  text-overflow: "";
  border-radius: 0;

  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 black;
  }

  option:not(:checked) {
    color: black; /* prevent <option>s from becoming transparent as well */
  }
`

interface CaretProps extends ExecutionContext {
  disabled?: boolean
}

/** Creates a small caret */
export const caretMixin = css`
  &::after {
    content: "";
    cursor: inherit;
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${themeGet("space.1")};
    pointer-events: none;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid
      ${({ disabled }: CaretProps) => {
        return disabled ? themeGet("colors.mono10") : themeGet("colors.mono100")
      }};
  }
`

type ContainerProps = Required<
  Pick<SelectProps, "disabled" | "error" | "hover" | "focus">
  // adding optionSelected here to use it locally without adding it to the Select's props
> & { optionSelected: boolean }

const Container = styled(Box)<ContainerProps>`
  position: relative;
  width: 100%;

  > select {
    ${resetMixin};
    width: 100%;
    /* 24px = space.1 + 4px-wide caret + space.1 */
    padding: 0 24px 0 ${themeGet("space.1")};
    font-family: ${themeGet("fonts.sans")};
    border: 1px solid;
    border-radius: 3px;
    border-color: ${themeGet("colors.mono30")};
    cursor: pointer;
    line-height: 1;
    transition: color 0.25s, background-color 0.25s, border-color 0.25s;

    ${(props) => {
      return css`
        ${SELECT_STATES.default}

        ${props.hover && SELECT_STATES.hover}
        ${props.focus && SELECT_STATES.focus}
        ${props.disabled && SELECT_STATES.disabled}
        ${props.error && SELECT_STATES.error}

        &:hover {
          ${SELECT_STATES.hover}
        }

        &:focus {
          ${SELECT_STATES.focus}
        }

        &:disabled {
          cursor: default;
          ${SELECT_STATES.disabled}
        }

        &:not(:focus):not(:has(option[value=""]:checked)) {
          ${!(props.disabled || props.focus) && SELECT_STATES.completed}
          ${props.error && SELECT_STATES.error}
        }

        &:not(:focus) {
          // Firefox polyfill for :has
          ${!!props.optionSelected &&
          css`
            ${!(props.disabled || props.focus) && SELECT_STATES.completed}
            ${props.error && SELECT_STATES.error}
          `}
        }

        &:not(:focus):has(option[value=""]:checked) {
          ${props.title &&
          css`
            color: transparent;
          `}
        }

        &:not(:focus) {
          // Firefox polyfill for :has
          ${props.title &&
          !props.optionSelected &&
          css`
            color: transparent;
          `}
        }
      `
    }};
  }

  ${caretMixin}
`

const StyledLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 5px;
  padding: 0 5px;
  pointer-events: none;
  transform: translateY(-50%);
  transition: ${FORM_ELEMENT_TRANSITION};
  transition-property: color, font-size, transform;
  background-color: transparent;
  font-family: ${themeGet("fonts.sans")};

  & > span {
    background-color: ${themeGet("colors.mono0")};
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
`
