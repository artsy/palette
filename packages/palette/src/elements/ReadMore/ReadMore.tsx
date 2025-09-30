import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Clickable } from "../Clickable"
import { Text } from "../Text"
import { useTheme } from "../../Theme"
import { Box } from "../Box"

export interface ReadMoreProps {
  content: string
  disabled?: boolean
  inlineReadMoreLink?: boolean
  defaultExpanded?: boolean
  maxLines?: number
  onReadLessClicked?: () => void
  onReadMoreClicked?: () => void
}

export const ReadMore: React.FC<React.PropsWithChildren<ReadMoreProps>> = ({
  content: expandedHTML,
  disabled,
  inlineReadMoreLink = true,
  defaultExpanded,
  maxLines = Infinity,
  onReadLessClicked,
  onReadMoreClicked,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const { theme } = useTheme()

  const [overflowing, setOverflowing] = useState(false)
  const [singleLineHeight, setSingleLineHeight] = useState(0)
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

    const sentinel = ref.current.querySelector("[data-readmore-sentinel]")
    if (!sentinel) return shouldExpand

    setSingleLineHeight(sentinel.clientHeight)
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
      <LineClamp ref={ref} lineClamp={maxLinesToShow}>
        {/* LineClamp's `display` causes stacking of margins. Nested div ensures internal margins collapse. */}
        <Box
          position="relative"
          dangerouslySetInnerHTML={{
            __html: expanded ? expandedHTML : `${expandedHTML}${SENTINEL}`,
          }}
        />
      </LineClamp>

      {overflowing && (
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

const SENTINEL = `<span data-readmore-sentinel aria-hidden="true" style="display:block;width:0;padding:0;margin:0;position:absolute;bottom:0;right:0;">&#8203;</span>`

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
