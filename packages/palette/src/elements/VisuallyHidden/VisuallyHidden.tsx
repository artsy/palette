import styled, { css } from "styled-components"
import { Box, BoxProps } from "../Box"

/** Visually hide element, but present in DOM */
export const visuallyHiddenMixin = css`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

/** Reset to `inherit` all properties that cause visually-hidden */
export const visuallyUnhiddenMixin = css`
  clip: inherit;
  clip-path: inherit;
  height: inherit;
  overflow: inherit;
  position: inherit;
  white-space: inherit;
  width: inherit;
`

export interface VisuallyHiddenProps extends BoxProps {
  show?: boolean
}

/** Visually hide element, but present in DOM */
export const VisuallyHidden = styled(Box)<VisuallyHiddenProps>`
  ${visuallyHiddenMixin}
  ${({ show }) => show && visuallyUnhiddenMixin}
`
