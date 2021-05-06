import { css } from "styled-components"

/**
 * Mixin that disables the scrollbar
 */
export const visuallyDisableScrollbar = css`
  /* IE 10+ */
  -ms-overflow-style: none;
  /* Firefox */
  scrollbar-width: none;
  /* Safari and Chrome */
  &::-webkit-scrollbar {
    display: none;
  }
`
