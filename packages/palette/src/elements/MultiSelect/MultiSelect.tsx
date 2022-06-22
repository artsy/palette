import { themeGet } from "@styled-system/theme-get"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { css } from "styled-components"
import { DROP_SHADOW } from "../../helpers"
import { useClickOutside, usePosition } from "../../utils"
import { useUpdateEffect } from "../../utils/useUpdateEffect"
import { useWidthOf } from "../../utils/useWidthOf"
import { Box, BoxProps } from "../Box"
import { Checkbox } from "../Checkbox"
import { Clickable } from "../Clickable"
import { caretMixin, Option } from "../Select"
import { Sup } from "../Sup"
import { Text } from "../Text"

export interface MultiSelectProps extends BoxProps {
  complete?: boolean
  description?: string
  disabled?: boolean
  error?: string | boolean
  focus?: boolean
  hover?: boolean
  name?: string
  options: Option[]
  required?: boolean
  title?: string
  onSelect?: (selection: Option[]) => void
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  complete,
  description,
  disabled,
  error,
  focus,
  hover,
  name = "Select",
  options,
  required,
  title,
  onSelect,
  ...rest
}) => {
  const [visible, setVisible] = useState(false)
  const [selection, setSelection] = useState<Option[]>([])

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

  const { anchorRef, tooltipRef } = usePosition({
    position: "bottom",
    offset: 10,
    active: visible,
  })

  const { width } = useWidthOf({ ref: anchorRef })

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
      {(title || description) && (
        <>
          {title && (
            <Text variant="xs">
              {title}
              {required && (
                <Box as="span" color="brand">
                  *
                </Box>
              )}
            </Text>
          )}

          {description && (
            <Text variant="xs" color="black60">
              {description}
            </Text>
          )}
        </>
      )}

      <Container
        ref={anchorRef as any}
        onClick={onVisible}
        complete={complete || selection.length > 0}
        disabled={disabled}
        error={error}
        focus={focus || visible}
        hover={hover}
        mt={title || description ? 0.5 : 0}
        {...rest}
      >
        <Text variant="sm" lineHeight={1}>
          {name}

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

      {error && typeof error === "string" && (
        <Text variant="xs" mt={0.5} color="red100">
          {error}
        </Text>
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

const STATES = {
  default: css`
    color: ${themeGet("colors.black60")};
    border-color: ${themeGet("colors.black30")};
  `,
  complete: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black60")};
  `,
  focus: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black60")};
  `,
  hover: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black60")};
  `,
  disabled: css`
    color: ${themeGet("colors.black30")};
    border-color: ${themeGet("colors.black30")};
  `,
  error: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.red100")};
  `,
}

type ContainerProps = Pick<
  MultiSelectProps,
  "complete" | "disabled" | "error" | "hover" | "focus"
>

const Container = styled(Clickable)<ContainerProps>`
  position: relative;
  width: 100%;
  height: 50px;
  border: 0;
  border-bottom: 1px solid;
  /* 24px = space.1 + 4px-wide caret + space.1 */
  padding: 0 24px 0 ${themeGet("space.1")};
  transition: background-color 0.25s, border-color 0.25s;

  ${(props) => {
    return css`
      ${STATES.default}
      ${props.complete && STATES.complete}
      ${props.hover && STATES.hover}
      ${props.focus && STATES.focus}
      ${props.disabled && STATES.disabled}
      ${props.error && STATES.error}

      &:hover {
        ${STATES.hover}
      }

      &:focus {
        ${STATES.focus}
      }

      &:disabled {
        cursor: default;
        ${STATES.disabled}
      }
    `
  }}

  ${caretMixin}
`
