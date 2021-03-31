import React from "react"
import styled, { css } from "styled-components"
import { getThemeConfig, useThemeConfig } from "../../Theme"
import { Box, BoxProps } from "../Box"
import { Flex } from "../Flex"
import { Text, TextVariant } from "../Text"
import { Check } from "./Check"
import {
  CHECK_STATES as V2_CHECK_STATES,
  CHECKBOX_STATES as V2_CHECKBOX_STATES,
} from "./tokens/v2"
import {
  CHECK_STATES as V3_CHECK_STATES,
  CHECKBOX_STATES as V3_CHECKBOX_STATES,
} from "./tokens/v3"

export interface CheckboxProps
  extends BoxProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Disable checkbox interactions */
  disabled?: boolean
  /** Select the checkbox on render */
  selected?: boolean
  /** Show an error indicator */
  error?: boolean
  /** Used to force the checkbox into the visual hover state */
  hover?: boolean
  /** Callback when selected */
  onSelect?: (selected: boolean) => void
}

/** A checkbox */
export const Checkbox: React.FC<CheckboxProps> = ({
  selected = false,
  children,
  error,
  disabled,
  hover,
  onSelect,
  onClick,
  ...rest
}) => {
  const tokens = useThemeConfig({
    v2: {
      verticalMargin: 0.5,
      variant: "text" as TextVariant,
    },
    v3: {
      verticalMargin: 0,
      variant: "md" as TextVariant,
    },
  })

  const isSelectable = !disabled && onSelect !== undefined

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isSelectable) {
      onSelect(!selected)
    }

    if (onClick !== undefined) {
      onClick(event)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " " && isSelectable) {
      event.preventDefault()
      onSelect(!selected)
    }
  }

  return (
    <Container
      my={tokens.verticalMargin}
      display="flex"
      alignItems="center"
      onClick={handleClick}
      tabIndex={disabled ? -1 : 0}
      onKeyPress={handleKeyPress}
      role="checkbox"
      aria-checked={selected}
      selected={selected}
      hover={hover}
      disabled={disabled}
      error={error}
      {...rest}
    >
      <Check
        selected={selected}
        error={error}
        disabled={disabled}
        hover={hover}
      />

      <Flex alignItems="center" flex={1}>
        {typeof children === "string" || typeof children === "number" ? (
          <Text variant={tokens.variant} lineHeight={1}>
            {children}
          </Text>
        ) : (
          children
        )}
      </Flex>
    </Container>
  )
}

const Container = styled(Box)<{
  selected: boolean
  hover?: boolean
  disabled?: boolean
  error?: boolean
}>`
  user-select: none;

  ${(props) => {
    const states = getThemeConfig(props, {
      v2: { checkbox: V2_CHECKBOX_STATES, check: V2_CHECK_STATES },
      v3: { checkbox: V3_CHECKBOX_STATES, check: V3_CHECK_STATES },
    })

    return css`
      ${states.checkbox.default}
      ${props.hover && states.checkbox.hover}
      ${props.disabled && states.checkbox.disabled}
      ${props.error && states.checkbox.error}

      &:hover {
        ${!props.error &&
        css`
          ${states.checkbox.hover}

          // Check
          > div:first-of-type {
            ${props.selected
              ? states.check.hover.selected
              : states.check.hover.resting}
          }
        `}
      }

      &:disabled {
        ${states.checkbox.disabled}
      }
    `
  }}
`
