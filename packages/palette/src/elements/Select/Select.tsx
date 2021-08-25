import { TextVariant } from "@artsy/palette-tokens/dist/typography/types"
import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled, { css } from "styled-components"
import { getThemeConfig, useThemeConfig } from "../../Theme"
import { Box, BoxProps, splitBoxProps } from "../Box"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Text } from "../Text"
import { Variant } from "./tokens/types"
import { SELECT_VARIANTS as V2_SELECT_VARIANTS } from "./tokens/v2"
import { SELECT_VARIANTS as V3_SELECT_VARIANTS } from "./tokens/v3"

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

  const tokens = useThemeConfig({
    v2: {
      titleVariant: (variant === "default" ? "text" : "small") as TextVariant,
      titleTextTransform: null,
      secondaryTextVariant: "small" as TextVariant,
    },
    v3: {
      titleVariant: "xs" as TextVariant,
      titleTextTransform: "uppercase",
      secondaryTextVariant: "xs" as TextVariant,
    },
  })

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
              variant={tokens.titleVariant}
              lineHeight={
                variant === "inline" && description === undefined
                  ? 1
                  : undefined
              }
              style={{ textTransform: tokens.titleTextTransform as any }}
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
            <Text variant={tokens.secondaryTextVariant} color="black60">
              {description}
            </Text>
          )}
        </div>

        {(title || description) && <Spacer m={0.5} />}

        <Container
          variant={variant}
          disabled={disabled!}
          hover={hover!}
          error={error!}
          focus={focus!}
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
        <Text variant={tokens.secondaryTextVariant} mt={0.5} color="red100">
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

const Container = styled.div<ContainerProps>`
  position: relative;
  width: 100%;

  > select {
    ${resetMixin};
    width: 100%;
    /* 24px = space.1 + 4px-wide caret + space.1 */
    padding: 0 24px 0 ${themeGet("space.1")};
    font-family: ${themeGet("fonts.sans")};
    border: 1px solid;
    cursor: pointer;
    line-height: 1;
    transition: color 0.25s, background-color 0.25s, border-color 0.25s;

    ${(props) => {
      const variants = getThemeConfig(props, {
        v2: V2_SELECT_VARIANTS,
        v3: V3_SELECT_VARIANTS,
      })

      const states = variants[props.variant]

      return css`
        ${states.default}

        ${props.hover && states.hover}
        ${props.focus && states.focus}
        ${props.disabled && states.disabled}
        ${props.error && states.error}

        &:hover {
          ${states.hover}
        }

        &:focus {
          ${states.focus}
        }

        &:disabled {
          cursor: default;
          ${states.disabled}
        }
      `
    }};
  }

  ${caretMixin}
`

/**
 * Default variant of Select. In v2 contexts this is the larger select.
 * @deprecated Use` <Select />`
 */
export const LargeSelect: React.FC<Omit<SelectProps, "variant">> = (props) => {
  return <Select variant="default" {...props} />
}

/**
 * Inline variant of Select. In v2 contexts this is the smaller select.
 * @deprecated Use `<Select variant="inline">`
 */
export const SelectSmall: React.FC<Omit<SelectProps, "variant">> = (props) => {
  return <Select variant="inline" {...props} />
}
