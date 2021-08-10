import { themeGet } from "@styled-system/theme-get"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { DROP_SHADOW } from "../../helpers"
import { useClickOutside, usePosition } from "../../utils"
import { useUpdateEffect } from "../../utils/useUpdateEffect"
import { Box, BoxProps } from "../Box"
import { Checkbox } from "../Checkbox"
import { Clickable } from "../Clickable"
import { caretMixin, Option } from "../Select"
import { Sup } from "../Sup"
import { Text } from "../Text"

export interface MultiSelectProps extends BoxProps {
  title: React.ReactNode
  options: Option[]
  onSelect?: (selection: Option[]) => void
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  title,
  options,
  onSelect,
  ...rest
}) => {
  const [visible, setVisible] = useState(false)
  const [selection, setSelection] = useState<Option[]>([])
  const [width, setWidth] = useState(0)

  // Yields focus back and forth between popover and anchor
  useUpdateEffect(() => {
    if (visible && tooltipRef.current) {
      tooltipRef.current.focus()
      return
    }

    if (!anchorRef.current) return
    anchorRef.current.focus()
  }, [visible])

  const onVisible = () => setVisible(true)
  const onHide = () => setVisible(false)

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onHide()
      }
    }

    document.addEventListener("keydown", handleKeydown)
    return () => {
      document.removeEventListener("keydown", handleKeydown)
    }
  }, [])

  useEffect(() => {
    if (!anchorRef.current) return

    const handleResize = () => {
      setWidth(anchorRef.current.offsetWidth)
    }

    handleResize()

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const { anchorRef, tooltipRef } = usePosition({
    position: "bottom",
    offset: 10,
    active: visible,
  })

  useClickOutside({
    ref: tooltipRef,
    onClickOutside: onHide,
    when: visible,
    type: "click",
  })

  const handleSelect = (option: Option) => {
    return (selected: boolean) => {
      const prevSelection = selection
      const nextSelection = selected
        ? [...prevSelection, option]
        : prevSelection.filter(({ value }) => option.value !== value)

      setSelection(nextSelection)
      onSelect?.(nextSelection)
    }
  }

  return (
    <>
      <Container ref={anchorRef as any} onClick={onVisible} {...rest}>
        <Text variant="sm" lineHeight={1}>
          {title}

          {selection.length > 0 && (
            <Sup color="brand">&nbsp;{selection.length}</Sup>
          )}
        </Text>
      </Container>

      {visible && (
        <Options
          tabIndex={0}
          ref={tooltipRef as any}
          zIndex={1}
          bg="white100"
          width={width}
        >
          {options.map((option) => {
            return (
              <Checkbox
                key={option.value}
                height={50}
                px={1}
                selected={selection.includes(option)}
                onSelect={handleSelect(option)}
              >
                {option.text}
              </Checkbox>
            )
          })}
        </Options>
      )}
    </>
  )
}

const Options = styled(Box)`
  position: fixed;
  z-index: 1;
  max-height: 300px;
  text-align: left;
  box-shadow: ${DROP_SHADOW};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

const Container = styled(Clickable)`
  position: relative;
  width: 100%;
  height: 50px;
  border: 1px solid;
  color: ${themeGet("colors.black100")};
  border-color: ${themeGet("colors.black30")};
  /* 24px = space.1 + 4px-wide caret + space.1 */
  padding: 0 24px 0 ${themeGet("space.1")};
  transition: background-color 0.25s, border-color 0.25s;

  &:hover {
    border-color: ${themeGet("colors.black60")};
  }

  &:focus {
    border-color: ${themeGet("colors.black60")};
  }

  &:disabled {
    cursor: default;
    color: ${themeGet("colors.black60")};
    border-color: ${themeGet("colors.black10")};
  }

  ${caretMixin}
`
