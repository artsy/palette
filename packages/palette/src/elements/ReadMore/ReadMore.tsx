import React, { useMemo, useState } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import styled, { css } from "styled-components"
import truncate from "trunc-html"
import { Box, splitBoxProps } from "../Box"
import { Clickable } from "../Clickable"
import { HTML, HTMLProps } from "../HTML"
import { Text } from "../Text"

const HTML_TAG_REGEX = /(<([^>]+)>)/gi

const Container = styled(Box)<{ expanded: boolean }>`
  ${({ expanded }) =>
    expanded
      ? css`
          cursor: default;
        `
      : css`
          cursor: pointer;
        `};

  > span > *:last-child {
    /* display: inline; */
    /* line-height: 0; */
  }
`

const Span: React.FC<HTMLProps> = props => <span {...props} />

export interface ReadMoreProps extends Omit<HTMLProps, "html"> {
  content: string | JSX.Element
  disabled?: boolean
  isExpanded?: boolean
  maxChars?: number
  Component?: typeof HTML | React.FC<Omit<HTMLProps, "html">>
  onReadMoreClicked?(): void
}

/** ReadMore */
export const ReadMore: React.FC<ReadMoreProps> = ({
  content,
  disabled,
  isExpanded,
  maxChars = Infinity,
  /**
   * Defaults to a vanilla `span`
   */
  Component = Span,
  ...rest
}) => {
  const [boxProps, htmlProps] = splitBoxProps(rest)

  const expandedHTML = useMemo(() => {
    return typeof content === "string" ? content : renderToStaticMarkup(content)
  }, [content])

  const charCount = useMemo(
    () => expandedHTML.replace(HTML_TAG_REGEX, "").length,
    [expandedHTML]
  )

  const truncatedHTML = useMemo(() => truncate(expandedHTML, maxChars).html, [
    expandedHTML,
    maxChars,
  ])

  const [expanded, setIsExpanded] = useState(isExpanded || charCount < maxChars)

  const handleClick = () => {
    if (disabled) return
    setIsExpanded(true)
  }

  return (
    <Container expanded={expanded} onClick={handleClick} {...boxProps}>
      <Component
        as="span"
        {...htmlProps}
        dangerouslySetInnerHTML={{
          __html: expanded ? expandedHTML : truncatedHTML,
        }}
      />

      {!expanded && (
        <Clickable
          onClick={handleClick}
          aria-expanded={expanded}
          disabled={disabled}
          ml={0.5}
        >
          <Text
            variant="mediumText"
            textDecoration="underline"
            color="black100"
          >
            Read more
          </Text>
        </Clickable>
      )}
    </Container>
  )
}
