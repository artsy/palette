import styled from "styled-components"
import { Box } from "../Box"
import { RADIO_DOT_STATES } from "./tokens"

export interface CheckProps {
  disabled?: boolean
  error?: boolean
  hover?: boolean
  focus?: boolean
  selected?: boolean
}

export const RadioDot = styled(Box)<CheckProps>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.25s, border-color 0.25s, color 0.25s;

  ${(props) => {
    const mode = (() => {
      switch (true) {
        case props.disabled:
          return RADIO_DOT_STATES.disabled
        case props.hover:
          return RADIO_DOT_STATES.hover
        case props.focus:
          return RADIO_DOT_STATES.focus
        case props.error:
          return RADIO_DOT_STATES.error
        default:
          return RADIO_DOT_STATES.default
      }
    })()

    return props.selected ? mode.selected : mode.resting
  }};

  /* Dot  */
  &::after {
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transition: background-color 0.25s;
    background-color: currentColor;
  }
`
