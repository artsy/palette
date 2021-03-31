import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"
import { Radio, RadioProps } from "../Radio"

export type BorderedRadioProps = RadioProps

/** A radio button with a border */
export const BorderedRadio = styled(Radio)<BorderedRadioProps>`
  padding: ${themeGet("space.2")};
  border-radius: 2px;
  border: 1px solid ${themeGet("colors.black10")};
  transition: background-color 0.25s;

  :hover:not(:disabled) {
    background-color: ${themeGet("colors.black5")};
  }

  :not(:first-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  :not(:last-child) {
    border-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`
