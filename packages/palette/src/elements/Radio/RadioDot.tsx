import styled from "styled-components"
import { getThemeConfig } from "../../Theme"
import { Box } from "../Box"
import { RADIO_DOT_STATES as V2_RADIO_DOT_STATES } from "./tokens/v2"
import { RADIO_DOT_STATES as V3_RADIO_DOT_STATES } from "./tokens/v3"

export interface CheckProps {
  disabled?: boolean
  error?: boolean
  hover?: boolean
  focus?: boolean
  selected?: boolean
}

export const RadioDot = styled(Box)<CheckProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.25s, border-color 0.25s, color 0.25s;

  ${(props) => {
    const modes = getThemeConfig(props, {
      v2: V2_RADIO_DOT_STATES,
      v3: V3_RADIO_DOT_STATES,
    })

    const mode = (() => {
      switch (true) {
        case props.disabled:
          return modes.disabled
        case props.hover:
          return modes.hover
        case props.focus:
          return modes.focus
        case props.error:
          return modes.error
        default:
          return modes.default
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
