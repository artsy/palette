import { themeGet } from "@styled-system/theme-get"
import React, { HTMLAttributes } from "react"
import styled, { css } from "styled-components"
import { Text, TextProps } from "../Text"

/**
 * HTML
 */
export type HTMLProps = TextProps &
  HTMLAttributes<HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement> &
  ({ html: string } | { children: React.ReactNode })

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
    margin: ${themeGet("space.1")}px auto;

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
    background-color: ${themeGet("colors.black10")};
  }
`

const Container = styled(Text)`
  ${htmlMixin}
`

Container.defaultProps = {
  variant: "sm",
}

/**
 * Sets reasonable defaults for tags that we might encounter in Markdown output.
 * If `html` prop is passed; it's set as innerHTML, otherwise contents are wrapped
 * with default HTML styling.
 */
export const HTML: React.FC<HTMLProps> = (props) => {
  if ("html" in props) {
    const { html, ...htmlRest } = props
    return (
      <Container dangerouslySetInnerHTML={{ __html: html }} {...htmlRest} />
    )
  }

  const { children, ...childrenRest } = props
  return <Container {...childrenRest}>{children}</Container>
}

HTML.displayName = "HTML"
