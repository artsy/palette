import styled from "styled-components"
import { css } from "styled-components"
import { color, space } from "../../helpers"
import { SpacingUnit } from "../../Theme"
import { Clickable, ClickableProps } from "../Clickable"

const ARROW_WIDTH: SpacingUnit[] = [2, 4]
const ARROW_TRANSITION_MS = 250

/** CarouselNavigationProps */
export type CarouselNavigationProps = ClickableProps

const Arrow = styled(Clickable)`
  ${(props) => {
    if (props.theme.id === "v3") {
      return css`
        &:before {
          content: "";
          position: absolute;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          width: 50px;
          height: 50px;
        }
      `
    }
  }}

  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: opacity ${ARROW_TRANSITION_MS}ms, color ${ARROW_TRANSITION_MS}ms;

  > svg {
    fill: currentColor;
  }

  &:hover,
  &:focus {
    outline: 0;
    color: ${color("black100")};
  }

  &:disabled {
    opacity: 0;
    cursor: default;
  }
`

/**
 * Set some easily overwriteable props using `defaultProps`
 */
Arrow.defaultProps = {
  width: ARROW_WIDTH.map((value) => space(value)),
  height: "100%",
  color: "black60",
}

/**
 * Default next button
 */
export const CarouselNext = styled(Arrow)`
  right: 0;
  transform: translateX(100%);
`

/**
 * Default previous button
 */
export const CarouselPrevious = styled(Arrow)`
  left: 0;
  transform: translateX(-100%);
`
