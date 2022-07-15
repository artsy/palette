import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled, { css } from "styled-components"
import { Box, BoxProps, splitBoxProps } from "../Box"
import { Flex } from "../Flex"
import { Text } from "../Text"
import { Variant } from "./types"
import { SELECT_STATES } from "./tokens"

export interface Option {
  value: string
  text: string
}

export interface SelectProps
  extends BoxProps,
    Omit<React.HTMLAttributes<HTMLSelectElement>, "onSelect"> {
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
export const Select: React.FC<SelectProps> = ({
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
}) => {
  const [boxProps, selectProps] = splitBoxProps(rest)

  return (
    <Box width="100%" {...boxProps}>
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
        {...(id ? { for: id } : {})}
      >
        <div>
          {title && (
            <Text
              variant="xs"
              lineHeight={
                variant === "inline" && description === undefined
                  ? 1
                  : undefined
              }
            >
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
        </div>

        <Container
          variant={variant}
          disabled={!!disabled}
          hover={!!hover}
          error={error!}
          focus={!!focus}
          mt={variant !== "inline" && (title || description) ? 0.5 : 0}
        >
          <select
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
        </Container>
      </Flex>

      {error && typeof error === "string" && (
        <Text variant="xs" mt={0.5} color="red100">
          {error}
        </Text>
      )}
    </Box>
  )
}

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
    border: 0;
    border-bottom: 1px solid;
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
      `
    }};
  }

  ${caretMixin}
`
