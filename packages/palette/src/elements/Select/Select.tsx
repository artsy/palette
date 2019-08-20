import React, { SFC } from "react"
import styled, { css } from "styled-components"
import { color, space } from "../../helpers"
import { Sans } from "../Typography"

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
  title?: string
  onSelect?: (value) => void
  placeholder?: string
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
        {placeholderActive(props) && (
          <option selected value="" disabled>
            {props.placeholder}
          </option>
        )}
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
 * A small version of drop-down select menu
 */
export const SelectSmall: SFC<SelectProps> = props => {
  return (
    <SelectSmallContainer {...props}>
      <label>
        {props.title && (
          <Sans size="2" display="inline" mr={0.5}>
            {props.title}:
          </Sans>
        )}

        <select
          value={props.selected}
          onChange={event =>
            props.onSelect && props.onSelect(event.target.value)
          }
        >
          {placeholderActive(props) && (
            <option selected value="" disabled>
              {props.placeholder}
            </option>
          )}
          {props.options.map(({ value, text }) => (
            <option value={value} key={value}>
              {text}
            </option>
          ))}
        </select>
      </label>
    </SelectSmallContainer>
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
const carretSize = 4
const caretArrow = css<SelectProps>`
  border-left: ${carretSize}px solid transparent;
  border-right: ${carretSize}px solid transparent;
  border-top: ${carretSize}px solid
    ${props => (props.disabled ? color("black10") : color("black100"))};
  width: 0;
  height: 0;
`

const placeholderActive = props =>
  Boolean(props.placeholder) && !Boolean(props.selected)

const LargeSelectContainer = styled.div<SelectProps>`
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

const SelectSmallContainer = styled.div<SelectProps>`
  position: relative;

  label {
    padding: 0;
    margin: 0;
  }

  select {
    ${hideDefaultSkin};
    background-color: ${color("black10")};
    border-radius: 2px;
    ${themeGet("fontFamily.sans.medium")};
    font-size: ${themeGet("typeSizes.sans.2.fontSize")}px;
    line-height: ${themeGet("typeSizes.sans.2.lineHeight")}px;
    padding: ${space(0.5)}px ${space(1) + carretSize * 4}px ${space(0.5)}px
      ${space(1)}px;

    &:hover {
      background-color: ${color("black30")};
    }
    &:focus {
      border-color: ${color("purple100")};
    }
  }

  &::after {
    ${caretArrow};
    content: "";
    cursor: pointer;
    margin-left: -${space(1) + carretSize * 2}px;
    pointer-events: none;
    position: absolute;
    top: ${5 + space(0.5)}px;
  }
`
