import React, { useMemo, useState } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import styled from "styled-components"
import truncate from "trunc-html"
import { Clickable, ClickableProps } from "../Clickable"
import { Text } from "../Text"

const ReadMoreLink: React.FC<ClickableProps> = ({ children, ...rest }) => {
  return (
    <>
      {" "}
      <Clickable
        aria-expanded="false"
        cursor="pointer"
        textDecoration="underline"
        {...rest}
      >
        <Text variant="mediumText">{children}</Text>
      </Clickable>
    </>
  )
}

ReadMoreLink.displayName = "ReadMoreLink"

const Container = styled.div<{ isExpanded: boolean }>`
  cursor: ${({ isExpanded }) => (isExpanded ? "auto" : "pointer")};

  > span > *:last-child {
    display: inline;
  }
`

Container.displayName = "Container"

const HTML_TAG_REGEX = /(<([^>]+)>)/gi

export interface ReadMoreProps {
  content: string | JSX.Element
  disabled?: boolean
  isExpanded?: boolean
  maxChars?: number
  onReadMoreClicked?: () => void
}

/** ReadMore */
export const ReadMore: React.FC<ReadMoreProps> = ({
  content,
  disabled,
  isExpanded,
  maxChars = Infinity,
  onReadMoreClicked,
}) => {
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

  const [expanded, setExpanded] = useState(isExpanded || charCount < maxChars)

  const handleClick = () => {
    if (disabled) return
    setExpanded(true)
    onReadMoreClicked && onReadMoreClicked()
  }

  return (
    <Container onClick={handleClick} isExpanded={expanded}>
      <span
        dangerouslySetInnerHTML={{
          __html: expanded ? expandedHTML : truncatedHTML,
        }}
      />

      {!expanded && <ReadMoreLink>Read more</ReadMoreLink>}
    </Container>
  )
}
