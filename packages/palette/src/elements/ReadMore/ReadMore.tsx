import React, { useState } from "react"
import styled from "styled-components"
import truncate from "trunc-html"
import { Clickable } from "../Clickable"
import { Text } from "../Text"
import { Box } from "../Box"

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

  if (typeof expandedHTML !== "string") return null

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
    <Container aria-expanded={expanded}>
      {expanded ? (
        <>
          <Box dangerouslySetInnerHTML={{ __html: expandedHTML }} />

          <Clickable
            cursor="pointer"
            textDecoration="underline"
            onClick={handleClick}
          >
            <Text variant="xs" fontWeight="bold">
              Read less
            </Text>
          </Clickable>
        </>
      ) : (
        <Clickable onClick={handleClick}>
          <span dangerouslySetInnerHTML={{ __html: truncatedHTML }} />{" "}
          <Text
            as="span"
            variant="xs"
            fontWeight="bold"
            style={{ textDecoration: "underline" }}
          >
            Read more
          </Text>
        </Clickable>
      )}
    </Container>
  )
}

const Container = styled.div`
  > * > span > *:last-child {
    display: inherit;
  }
`

Container.displayName = "Container"

const HTML_TAG_REGEX = /(<([^>]+)>)/gi
