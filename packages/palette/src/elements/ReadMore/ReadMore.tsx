import React, { useState } from "react"
import styled from "styled-components"
import truncate from "trunc-html"
import { Clickable, ClickableProps } from "../Clickable"
import { Text } from "../Text"

const ReadMoreOrLessLink: React.FC<ClickableProps> = ({
  children,
  ...rest
}) => {
  return (
    <>
      {" "}
      <Clickable
        aria-expanded="false"
        cursor="pointer"
        textDecoration="underline"
        {...rest}
      >
        <Text variant="xs" fontWeight="bold">
          {children}
        </Text>
      </Clickable>
    </>
  )
}

ReadMoreOrLessLink.displayName = "ReadMoreOrLessLink"

const Container = styled.div<{ isExpanded: boolean }>`
  cursor: pointer;

  > span {
    display: ${({ isExpanded }) => (isExpanded ? "block" : "inline")};
  }

  > span > *:last-child {
    display: inherit;
  }
`

Container.displayName = "Container"

const HTML_TAG_REGEX = /(<([^>]+)>)/gi

export interface ReadMoreProps {
  content: string
  disabled?: boolean
  isExpanded?: boolean
  maxChars?: number
  onReadLessClicked?: () => void
  onReadMoreClicked?: () => void
}

/** ReadMore */
export const ReadMore: React.FC<ReadMoreProps> = ({
  content: expandedHTML,
  disabled,
  isExpanded,
  maxChars = Infinity,
  onReadLessClicked,
  onReadMoreClicked,
}) => {
  const [expanded, setExpanded] = useState(!!isExpanded)

  if (typeof expandedHTML !== "string") {
    return null
  }
  const charCount = expandedHTML.replace(HTML_TAG_REGEX, "").length

  const truncatedHTML = truncate(expandedHTML, maxChars).html

  const visible = charCount > maxChars

  const handleClick = () => {
    if (disabled) return
    setExpanded((expandedState) => !expandedState)

    expanded
      ? onReadLessClicked && onReadLessClicked()
      : onReadMoreClicked && onReadMoreClicked()
  }

  if (!visible) {
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: expandedHTML,
        }}
      />
    )
  }

  return (
    <Container onClick={handleClick} isExpanded={expanded}>
      <span
        dangerouslySetInnerHTML={{
          __html: expanded ? expandedHTML : truncatedHTML,
        }}
      />

      <ReadMoreOrLessLink>
        {expanded ? "Read less" : "Read more"}
      </ReadMoreOrLessLink>
    </Container>
  )
}
