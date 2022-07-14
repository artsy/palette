import React from "react"
import styled, { css } from "styled-components"
import { isText } from "../../helpers/isText"
import { Box, BoxProps } from "../Box"
import { Flex } from "../Flex"
import { Text } from "../Text"
import { Check } from "./Check"
import { CHECK_STATES, CHECKBOX_STATES } from "./tokens"

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
  /** Forces focus state */
  focus?: boolean
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
  focus,
  onSelect,
  onClick,
  ...rest
}) => {
  const isSelectable = !disabled && onSelect !== undefined

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isSelectable && onSelect) {
      onSelect(!selected)
    }

    if (onClick !== undefined) {
      onClick(event)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " " && isSelectable && onSelect) {
      event.preventDefault()
      onSelect(!selected)
    }
  }

  return (
    <Container
      display="flex"
      alignItems="center"
      onClick={handleClick}
      tabIndex={disabled ? -1 : 0}
      onKeyPress={handleKeyPress}
      role="checkbox"
      aria-checked={selected}
      selected={selected}
      hover={hover}
      focus={focus}
      disabled={disabled}
      error={error}
      {...rest}
    >
      <Check
        selected={selected}
        error={error}
        disabled={disabled}
        focus={focus}
        hover={hover}
      />

      <Flex alignItems="center" flex={1}>
        {isText(children) ? (
          <Text variant="sm-display" lineHeight={1}>
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
  focus?: boolean
  disabled?: boolean
  error?: boolean
}>`
  user-select: none;

  ${(props) => {
    return css`
      ${props.selected ? CHECKBOX_STATES.selected : CHECKBOX_STATES.default}
      ${props.focus && CHECKBOX_STATES.focus}
      ${props.hover && CHECKBOX_STATES.hover}
      ${props.disabled && CHECKBOX_STATES.disabled}
      ${props.error && CHECKBOX_STATES.error}

      &:hover {
        ${!props.error &&
        css`
          ${CHECKBOX_STATES.hover}

          // Check
          > div:first-of-type {
            ${props.selected
              ? CHECK_STATES.hover.selected
              : CHECK_STATES.hover.resting}
          }
        `}
      }

      &:focus {
        ${CHECKBOX_STATES.focus}

        // Check
         > div:first-of-type {
          ${props.selected
            ? CHECK_STATES.focus.selected
            : CHECK_STATES.focus.resting}
        }
      }

      &:disabled {
        ${CHECKBOX_STATES.disabled}
      }
    `
  }}
`
