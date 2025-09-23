import React, { useState } from "react"
import styled from "styled-components"
import truncate from "trunc-html"
import { Clickable } from "../Clickable"
import { Text } from "../Text"
import { Box } from "../Box"

export interface ReadMoreProps {
  content: string
  disabled?: boolean
  inlineReadMoreLink?: boolean
  isExpanded?: boolean
  maxChars?: number
  maxLines?: number
  onReadLessClicked?: () => void
  onReadMoreClicked?: () => void
}

export const ReadMore: React.FC<React.PropsWithChildren<ReadMoreProps>> = ({
  content: expandedHTML,
  disabled,
  inlineReadMoreLink = true,
  isExpanded,
  maxChars = Infinity,
  maxLines,
  onReadLessClicked,
  onReadMoreClicked,
}) => {
  const [expanded, setExpanded] = useState(!!isExpanded)

  if (typeof expandedHTML !== "string") return null

  if (maxLines) {
    const handleLineClampToggle = () => {
      if (disabled) return
      setExpanded(!expanded)
      expanded ? onReadLessClicked?.() : onReadMoreClicked?.()
    }

    return (
      <LineClampContainer>
        <SimpleLineClamp
          maxLines={maxLines}
          expanded={expanded}
          dangerouslySetInnerHTML={{ __html: expandedHTML }}
        />
        {!expanded ? (
          <GradientOverlay>
            <LineClampButton onClick={handleLineClampToggle} expanded={false}>
              <ReadMoreText>Read more</ReadMoreText>
            </LineClampButton>
          </GradientOverlay>
        ) : (
          <LineClampButton onClick={handleLineClampToggle} expanded={true}>
            <ReadMoreText>Read less</ReadMoreText>
          </LineClampButton>
        )}
      </LineClampContainer>
    )
  }
  const plainTextCharCount = expandedHTML.replace(HTML_TAG_REGEX, "").length
  const truncatedHTML = truncate(expandedHTML, maxChars).html
  const shouldShowToggle = plainTextCharCount > maxChars

  const handleClick = () => {
    if (disabled) return
    setExpanded((expandedState) => !expandedState)

    expanded
      ? onReadLessClicked && onReadLessClicked()
      : onReadMoreClicked && onReadMoreClicked()
  }

  // If content doesn't need truncation, render normally
  if (!shouldShowToggle) {
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
          {inlineReadMoreLink ? (
            <>
              <span dangerouslySetInnerHTML={{ __html: truncatedHTML }} />{" "}
            </>
          ) : (
            <Box dangerouslySetInnerHTML={{ __html: truncatedHTML }} />
          )}

          <ReadMoreText>Read more</ReadMoreText>
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

const ReadMoreText = styled(Text).attrs({
  as: "span",
  variant: "xs",
  fontWeight: "bold",
})`
  text-decoration: underline;
`

interface SimpleLineClampProps {
  maxLines: number
  expanded: boolean
}

const LineClampContainer = styled.div`
  position: relative;
`

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1.2em;
  background: linear-gradient(
    to right,
    transparent 0%,
    transparent 80%,
    white 90%
  );
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  pointer-events: none;

  /* Make button clickable */
  > button {
    pointer-events: auto;
  }
`

const SimpleLineClamp = styled.div.withConfig({
  shouldForwardProp: (prop) => !["maxLines", "expanded"].includes(prop),
})<SimpleLineClampProps>`
  ${({ maxLines, expanded }) =>
    !expanded &&
    `
    display: -webkit-box;
    -webkit-line-clamp: ${maxLines};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: clip;
  `}
`

interface LineClampButtonProps {
  expanded: boolean
}

const LineClampButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["expanded"].includes(prop),
})<LineClampButtonProps>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  ${({ expanded }) =>
    expanded &&
    `
    margin-top: 8px;
  `}
`

ReadMoreText.displayName = "ReadMoreText"
LineClampContainer.displayName = "LineClampContainer"
GradientOverlay.displayName = "GradientOverlay"
SimpleLineClamp.displayName = "SimpleLineClamp"
LineClampButton.displayName = "LineClampButton"

const HTML_TAG_REGEX = /(<([^>]+)>)/gi
