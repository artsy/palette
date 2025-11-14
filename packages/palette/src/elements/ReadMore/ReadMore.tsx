import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Clickable } from "../Clickable"
import { Text } from "../Text"
import { Box } from "../Box"

export interface ReadMoreProps {
  content: string
  disabled?: boolean
  defaultExpanded?: boolean
  maxLines?: number
  onReadLessClicked?: () => void
  onReadMoreClicked?: () => void
}

export const ReadMore: React.FC<React.PropsWithChildren<ReadMoreProps>> = ({
  content: expandedHTML,
  disabled,
  defaultExpanded,
  maxLines = Infinity,
  onReadLessClicked,
  onReadMoreClicked,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const [overflowing, setOverflowing] = useState(false)
  const [expanded, setExpanded] = useState(!!defaultExpanded)

  const maxLinesToShow = expanded ? Infinity : maxLines

  const handleClick = () => {
    if (disabled) return

    setExpanded((prevExpanded) => {
      const nextExpanded = !prevExpanded
      nextExpanded ? onReadMoreClicked?.() : onReadLessClicked?.()
      return nextExpanded
    })
  }

  const handleResize = () => {
    if (!ref.current) return false

    const shouldExpand = ref.current.scrollHeight > ref.current.clientHeight
    setOverflowing(shouldExpand)

    return shouldExpand
  }

  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return

    const shouldExpand = handleResize()
    if (!shouldExpand) setExpanded(true)

    initialized.current = true
  }, [])

  return (
    <Container aria-expanded={expanded}>
      <LineClamp
        key={`${expanded}`} // Forces a re-render on Mobile Safari
        ref={ref}
        lineClamp={maxLinesToShow}
      >
        {/* LineClamp's `display` causes stacking of margins. Nested div ensures internal margins collapse. */}
        <Box
          position="relative"
          dangerouslySetInnerHTML={{
            __html: expandedHTML,
          }}
        />
      </LineClamp>

      {overflowing && (
        <Clickable
          cursor="pointer"
          textDecoration="underline"
          onClick={handleClick}
          display="block"
          width="100%"
        >
          <Text variant="xs" fontWeight="bold">
            Read {expanded ? "less" : "more"}
          </Text>
        </Clickable>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

Container.displayName = "Container"

const LineClamp = styled.div<{ lineClamp: number }>`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => props.lineClamp};
  line-clamp: ${(props) => props.lineClamp};
  overflow: hidden;
`
