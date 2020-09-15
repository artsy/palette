import React, { HTMLAttributes } from "react"
import styled, { css } from "styled-components"
import { color } from "../../helpers"
import { space } from "../../helpers/space"
import { Text, TextProps } from "../Text"

/**
 * HTML
 */
export type HTMLProps = TextProps &
  HTMLAttributes<HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement> & {
    html: string
  }

/**
 * Sets reasonable defaults for tags that we might encounter in Markdown output.
 */
export const htmlMixin = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  ul,
  ol,
  p,
  blockquote,
  pre,
  hr {
    margin: ${space(1)}px auto;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  hr {
    height: 1px;
    border: 0;
    background-color: ${color("black10")};
  }
`

/**
 * Sets reasonable defaults for tags that we might encounter in Markdown output.
 */
export const HTMLStyles = styled(Text)`
  ${htmlMixin}
`

HTMLStyles.defaultProps = {
  variant: "text",
}

/**
 * Sets reasonable defaults for tags that we might encounter in Markdown output.
 */
export const HTML: React.FC<HTMLProps> = ({ html, ...rest }) => {
  return <HTMLStyles dangerouslySetInnerHTML={{ __html: html }} {...rest} />
}

HTML.displayName = "HTML"
