import React from "react"
import styled, { css } from "styled-components"
import { color } from "../../helpers"
import { Box, BoxProps } from "../Box"
import { Flex } from "../Flex"
import { Check } from "./Check"

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
  const labelColor = () => {
    if (disabled) return "black10"
    if (error) return "red100"
  }

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
      my={0.5}
      display="flex"
      alignItems="center"
      selected={selected}
      hover={hover}
      disabled={disabled}
      error={error}
      onClick={handleClick}
      tabIndex={0}
      onKeyPress={handleKeyPress}
      role="checkbox"
      aria-checked={selected}
      {...rest}
    >
      <Check selected={selected} error={error} disabled={disabled} />

      <Flex color={labelColor()} alignItems="center" flex={1}>
        {children}
      </Flex>
    </Container>
  )
}

const Container = styled(Box)<
  Pick<CheckboxProps, "selected" | "error" | "hover" | "disabled">
>`
  user-select: none;
  transition: color 0.25s;

  ${({ selected, disabled, error, hover }) => {
    if (selected || disabled || error) return

    const hoverMixin = css`
      /* Targets just the Check */
      > div:first-of-type {
        background-color: ${color("black10")};
        border-color: ${color("black10")};
      }
    `

    if (hover) {
      return hoverMixin
    }

    return css`
      &:hover {
        ${hoverMixin}
      }
    `
  }}
`

Container.displayName = "Container"
