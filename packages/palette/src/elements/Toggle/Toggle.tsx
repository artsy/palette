import React from "react"
import styled, { css } from "styled-components"
import { Box, BoxProps } from "../Box"
import { SWITCH_STATES, TOGGLE_STATES } from "./tokens"
import { themeGet } from "@styled-system/theme-get"

export interface ToggleProps
  extends BoxProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** Disable toggle interactions */
  disabled?: boolean
  /** Select the toggle on render */
  selected?: boolean
  /** Show an error indicator */
  error?: boolean
  /** Used to force the toggle into the visual hover state */
  hover?: boolean
  /** Forces focus state */
  focus?: boolean
  /** Callback when selected */
  onSelect?: (selected: boolean) => void
}

/** A toggle */
export const Toggle: React.FC<ToggleProps> = ({
  selected = false,
  disabled,
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
      role="toggle"
      aria-checked={selected}
      selected={selected}
      focus={focus}
      disabled={disabled}
      {...rest}
    >
      <Switch selected={selected} />
    </Container>
  )
}

const Switch = styled(Box)<{ selected: boolean }>`
  width: 26px;
  height: 26px;
  margin: 3px;
  border-radius: 50%;
  transition: transform 0.3s;
  box-shadow: ${themeGet("effects.dropShadow")};

  ${(props) => {
    return css`
      ${props.selected ? SWITCH_STATES.selected : SWITCH_STATES.default}
    `
  }}
`

const Container = styled(Box)<{
  selected: boolean
  hover?: boolean
  focus?: boolean
  disabled?: boolean
  error?: boolean
}>`
  user-select: none;
  border-radius: 100px;
  width: 51px;
  height: 31px;

  ${(props) => {
    return css`
      ${props.selected ? TOGGLE_STATES.selected : TOGGLE_STATES.default}
      ${props.focus && TOGGLE_STATES.focus}
      ${props.hover && TOGGLE_STATES.hover}
      ${props.disabled && TOGGLE_STATES.disabled}
      ${props.error && TOGGLE_STATES.error}

      &:hover {
        ${!props.error &&
        css`
          ${TOGGLE_STATES.hover}
        `}
      }

      &:focus {
        ${TOGGLE_STATES.focus}
      }

      &:disabled {
        ${TOGGLE_STATES.disabled}
      }
    `
  }}
`
