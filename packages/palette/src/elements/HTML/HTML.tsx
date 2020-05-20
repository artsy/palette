import React from "react"
import styled, { css } from "styled-components"
import { space } from "../../helpers/space"
import { Box } from "../Box"
import { Sans, SansProps, Serif, SerifProps } from "../Typography"

/**
 * HTML
 */
export type HTMLProps = (SansProps | SerifProps) & {
  fontFamily?: "sans" | "serif"
  html: string
}

const htmlMixin = css`
  > ${Box} {
    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > ul,
    > ol,
    > p {
      margin: ${space(1)}px auto;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`

const TYPEFACES = {
  sans: styled(Sans)`
    ${htmlMixin}
  `,
  serif: styled(Serif)`
    ${htmlMixin}
  `,
} as const

type Typeface = keyof typeof TYPEFACES

/**
 * HTML
 */
export const HTML = ({ fontFamily = "sans", html, size, ...rest }) => {
  const Component = TYPEFACES[fontFamily as Typeface]

  return (
    <Component size={size} {...rest}>
      <Box dangerouslySetInnerHTML={{ __html: html }} />
    </Component>
  )
}

HTML.displayName = "HTML"
