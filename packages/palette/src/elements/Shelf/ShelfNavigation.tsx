import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled from "styled-components"
import { css } from "styled-components"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Clickable, ClickableProps } from "../Clickable"

/** ShelfNavigationProps */
export interface ShelfNavigationProps extends ClickableProps {
  hover?: boolean
  focus?: boolean
  disabled?: boolean
}

const STATES = {
  hover: css`
    outline: 0;
    color: ${themeGet("colors.mono100")};
    box-shadow: ${themeGet("effects.dropShadow")};
  `,
  focus: css`
    outline: 0;
    color: ${themeGet("colors.mono100")};
    border-color: ${themeGet("colors.brand")};
  `,
  disabled: css`
    opacity: 0;
    cursor: default;
  `,
}

const Arrow = styled(Clickable)<ShelfNavigationProps>`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: opacity 250ms, color 250ms, border-color 250ms,
    box-shadow 0.25s ease;
  color: ${themeGet("colors.mono60")};
  background-color: ${themeGet("colors.mono0")};
  border: 1px solid ${themeGet("colors.mono5")};
  border-radius: 50%;
  pointer-events: auto;

  > svg {
    fill: currentColor;
  }

  ${(props) => {
    return css`
      ${props.hover && STATES.hover}
      ${props.focus && STATES.focus}
      ${props.disabled && STATES.focus}
    `
  }}

  &:hover {
    ${STATES.hover}
  }
  &:focus {
    ${STATES.focus}
  }

  &:disabled {
    ${STATES.disabled}
  }
`

/**
 * Default next button
 */
export const ShelfNext: React.FC<
  React.PropsWithChildren<ShelfNavigationProps>
> = (props) => {
  return (
    <Arrow {...props}>
      <ChevronRightIcon width={15} height={15} />
    </Arrow>
  )
}

/**
 * Default previous button
 */
export const ShelfPrevious: React.FC<
  React.PropsWithChildren<ShelfNavigationProps>
> = (props) => {
  return (
    <Arrow {...props}>
      <ChevronLeftIcon width={15} height={15} />
    </Arrow>
  )
}
