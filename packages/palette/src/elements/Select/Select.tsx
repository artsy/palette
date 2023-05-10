import { themeGet } from "@styled-system/theme-get"
import React, { forwardRef, ForwardRefExoticComponent, Ref } from "react"
import styled, { css } from "styled-components"
import { Box, BoxProps, splitBoxProps } from "../Box"
import { Flex } from "../Flex"
import { Text } from "../Text"
import { Variant } from "./types"
import { SELECT_STATES } from "./tokens"
import { Tooltip } from "../Tooltip"
import { RequiredField } from "../../shared/RequiredField"

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
  variant?: Variant
  onSelect?: (value: string) => void
}

/** A drop-down select menu */
export const Select: ForwardRefExoticComponent<
  SelectProps & { ref?: Ref<HTMLElement> }
> = forwardRef(
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
      variant = "default",
      onSelect,
      ...rest
    },
    ref
  ) => {
    const [boxProps, selectProps] = splitBoxProps(rest)

    return (
      <Box width="100%" {...boxProps}>
        {!!description && (
          <Tooltip pointer content={description} placement="top-end">
            <Text variant="xs" color="black60" textAlign="right">
              <u>What is this?</u>
            </Text>
          </Tooltip>
        )}

        <Flex
          as="label"
          {...(variant === "inline"
            ? {
                flexDirection: "row",
                alignItems: "center",
              }
            : {
                flexDirection: "column",
                alignItems: "flex-start",
              })}
          {...(id ? { htmlFor: id } : {})}
        >
          <Container
            variant={variant}
            disabled={!!disabled}
            hover={!!hover}
            error={error!}
            focus={!!focus}
            title={title}
            mt={variant !== "inline" && (title || description) ? 0.5 : 0}
          >
            <select
              ref={ref as any}
              id={id}
              disabled={disabled}
              name={name}
              value={selected}
              onChange={(event) => {
                onSelect && onSelect(event.target.value)
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

            {!!title && <StyledLabel>{title}</StyledLabel>}
          </Container>
        </Flex>

        {required && !(error && typeof error === "string") && (
          <RequiredField mt={0.5} ml={1} />
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
      ${({ disabled }) => {
        return disabled
          ? themeGet("colors.black10")
          : themeGet("colors.black100")
      }};
  }
`

type ContainerProps = Required<
  Pick<SelectProps, "variant" | "disabled" | "error" | "hover" | "focus">
>

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
    border-color: ${themeGet("colors.black30")};
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

        &:not(:has(option[value=""]:checked)):not(:focus) {
          ${!(props.disabled || props.focus) && SELECT_STATES.completed}
          ${props.error && SELECT_STATES.error}
        }

        &:has(option[value=""]:checked) {
          ${props.title &&
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
  transition: 0.25s cubic-bezier(0.64, 0.05, 0.36, 1);
  transision-property: color, font-size, transform;
  background-color: ${themeGet("colors.white100")};
  font-family: ${themeGet("fonts.sans")};
`
