import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Clickable } from "../Clickable"
import { Text } from "../Text"
import { useTheme } from "../../Theme"

export interface ReadMoreProps {
  content: string
  disabled?: boolean
  inlineReadMoreLink?: boolean
  isExpanded?: boolean
  maxLines?: number
  onReadLessClicked?: () => void
  onReadMoreClicked?: () => void
}

/** ReadMore */
export const ReadMore: React.FC<React.PropsWithChildren<ReadMoreProps>> = ({
  content: expandedHTML,
  disabled,
  inlineReadMoreLink = true,
  isExpanded,
  maxLines = Infinity,
  onReadLessClicked,
  onReadMoreClicked,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const { theme } = useTheme()

  const [isOverflowing, setIsOverflowing] = useState(false)
  const [singleLineHeight, setSingleLineHeight] = useState(0)
  const [expanded, setExpanded] = useState(!!isExpanded)

  const maxLinesToShow = expanded ? Infinity : maxLines
  const sentinelSpan = `<span data-readmore-sentinel aria-hidden="true" style="display:inline-block;width:0;padding:0;margin:0;">&#8203;</span>`

  if (typeof expandedHTML !== "string") return null

  const handleClick = () => {
    if (disabled) return

    setExpanded((expandedState) => !expandedState)

    expanded ? onReadLessClicked?.() : onReadMoreClicked?.()
  }

  useEffect(() => {
    if (!ref.current) return

    setIsOverflowing(ref.current.scrollHeight > ref.current.clientHeight)

    const sentinel = ref.current.querySelector("[data-readmore-sentinel]")
    if (!sentinel) return

    setSingleLineHeight(sentinel.clientHeight)
  }, [])

  return (
    <Container aria-expanded={expanded}>
      <LineClamp ref={ref} lineClamp={maxLinesToShow}>
        {/* LineClamp's `display` causes stacking of margins. Nested div ensures internal margins collapse. */}
        <div
          dangerouslySetInnerHTML={{
            __html: expanded ? expandedHTML : `${expandedHTML}${sentinelSpan}`,
          }}
        />
      </LineClamp>

      {isOverflowing && (
        <Clickable
          cursor="pointer"
          textDecoration="underline"
          onClick={handleClick}
          {...(!expanded && inlineReadMoreLink
            ? {
                position: "absolute",
                bottom: 0,
                right: 0,
                background: `linear-gradient(to left, ${theme.colors.mono0} 0, ${theme.colors.mono0} calc(100% - ${theme.space[4]}), transparent 100%)`,
                pl: 4,
                height: singleLineHeight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }
            : {})}
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
