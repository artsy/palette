import React, { SFC } from "react"
import styled, { css } from "styled-components"
import { Sans } from "../elements"
import { color, space } from "../helpers"

import {
  PositionProps,
  space as styledSpace,
  SpaceProps,
  themeGet,
} from "styled-system"

interface Option {
  value: string
  text: string
}
export interface SelectProps extends PositionProps, SpaceProps {
  options: Option[]
  selected?: string
  disabled?: boolean
  error?: string
  onSelect?: (value) => void
}

/**
 * A large drop-down select menu
 */
export const LargeSelect: SFC<SelectProps> = props => {
  return (
    <LargeSelectContainer {...props} p={1}>
      <select
        value={props.selected}
        disabled={props.disabled}
        onChange={event => props.onSelect && props.onSelect(event.target.value)}
      >
        {props.options.map(({ value, text }) => (
          <option value={value} key={value}>
            {text}
          </option>
        ))}
      </select>
    </LargeSelectContainer>
  )
}

/**
 * A small drop-down select menu
 */
export const SmallSelect: SFC<SelectProps> = props => {
  return (
    <SmallSelectContainer {...props}>
      <label>
        <Sans size="2" display="inline" mr={0.5}>
          Sort:
        </Sans>

        <select
          value={props.selected}
          onChange={event =>
            props.onSelect && props.onSelect(event.target.value)
          }
        >
          {props.options.map(({ value, text }) => (
            <option value={value} key={value}>
              {text}
            </option>
          ))}
        </select>
      </label>
    </SmallSelectContainer>
  )
}

const hideDefaultSkin = css`
  background: none;
  border: none;
  cursor: pointer;
  outline: 0;
  -webkit-appearance: none;

  -moz-appearance: none;
  text-indent: 0.01px;
  text-overflow: "";

  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }

  option:not(:checked) {
    color: black; /* prevent <option>s from becoming transparent as well */
  }
`

const caretArrow =
  css <
  SelectProps >
  `
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid
    ${props => (props.disabled ? color("black10") : color("black100"))};
  width: 0;
  height: 0;
`

const LargeSelectContainer = styled.div.attrs<SelectProps>({})`
  position: relative;
  width: 100%;

  select {
    width: 100%;
    font-family: ${themeGet("fontFamily.serif.regular")};
    font-size: ${themeGet("typeSizes.serif.3.fontSize")}px;
    line-height: ${themeGet("typeSizes.serif.3t.lineHeight")}px;
    height: 40px;
    ${hideDefaultSkin};
    border: 1px solid
      ${({ error }) => (error && color("red100")) || color("black10")};
    border-radius: 0;
    transition: border-color 0.25s;
    padding-right: ${space(1)}px;
    cursor: ${props => (props.disabled ? "default" : "pointer")};
    ${styledSpace};
    &:hover,
    &:focus {
      border-color: ${color("purple100")};
    }
  }

  &::after {
    content: "";
    cursor: ${props => (props.disabled ? "default" : "pointer")};
    pointer-events: none;
    position: absolute;
    top: 45%;
    right: ${space(1)}px;

    ${caretArrow};
  }
`

const SmallSelectContainer = styled.div.attrs<SelectProps>({})`
  position: relative;

  select {
    font-size: ${themeGet("typeSizes.sans.2.fontSize")}px;
    line-height: ${themeGet("typeSizes.sans.2.lineHeight")}px;
    font-weight: bold;
    ${hideDefaultSkin};
  }

  &::after {
    content: "";
    cursor: pointer;
    pointer-events: none;
    position: absolute;
    top: 12px;
    margin-left: 8px;
    ${caretArrow};
  }

  ${styledSpace};
`
