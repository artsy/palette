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
import { height as systemHeight } from "styled-system"

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
  prefixOffset?: number
  suffixOffset?: number
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
  prefixOffset,
  suffixOffset,
  ...rest
}) => {
  const [visible, setVisible] = useState(false)
  const [selection, setSelection] = useState<Option[]>([])
  const borderLabel = visible || selection.length > 0

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
      {/* {(title || description) && (
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
      )} */}

      <Container
        ref={anchorRef as any}
        onClick={onVisible}
        complete={complete || selection.length > 0}
        disabled={disabled}
        error={error}
        focus={focus || visible}
        hover={hover}
        prefixOffset={prefixOffset}
        suffixOffset={suffixOffset}
        {...rest}
      >
        {
          <StyledLabel
            prefixOffset={prefixOffset}
            htmlFor={name}
            titleMode={borderLabel}
          >
            {title}
          </StyledLabel>
        }

        {selection.length > 0 && (
          <Text variant="sm" lineHeight={1}>
            {name}

            {selection.length > 1 && (
              <Sup color="brand">&nbsp;{selection.length}</Sup>
            )}
          </Text>
        )}
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
  | "complete"
  | "disabled"
  | "error"
  | "hover"
  | "focus"
  | "prefixOffset"
  | "suffixOffset"
>

const Container = styled(Clickable)<ContainerProps>`
  width: 100%;
  padding: 0 24px ${themeGet("space.1")};
  height: 50px;
  /* appearance: none;
  line-height: 1; */
  border: 1px solid;
  border-radius: 3px;
  transition: border-color 0.25s, color 0.25s;
  font-family: ${themeGet("fonts.sans")};
  /* ${systemHeight}; */
  position: relative;

  ${(props) => {
    return css`
      ${STATES.default}
      ${props.complete && STATES.complete}
      ${props.hover && STATES.hover}
      ${props.focus && STATES.focus}
      ${props.disabled && STATES.disabled}
      ${props.error && STATES.error}
      ${!!props.prefixOffset &&
      css`
        padding-left: ${props.prefixOffset}px;
      `}
      ${!!props.suffixOffset &&
      css`
        padding-right: ${props.suffixOffset}px;
      `}

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
type StyledLabelProps = Pick<MultiSelectProps, "prefixOffset"> & {
  titleMode: boolean
}

const StyledLabel = styled.label<StyledLabelProps>`
  position: absolute;
  ${(props) => (props.titleMode ? "top: 0;" : "top: 50%;")};
  ${(props) => (props.titleMode ? "left: 0" : "left: 5px;")};
  /* top: 50%;
  left: 5px; */
  padding: 0 5px;
  background-color: ${themeGet("colors.white100")};
  transform: translateY(-50%);
  transition: 0.25s cubic-bezier(0.64, 0.05, 0.36, 1);
  transition-property: color, transform, padding, font-size, top, left;
  font-family: ${themeGet("fonts.sans")};
  pointer-events: none;
  color: red;

  ${({ prefixOffset }) =>
    !!prefixOffset &&
    css`
      padding-left: ${prefixOffset - 5}px;
    `}
`
