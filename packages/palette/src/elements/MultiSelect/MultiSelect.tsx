import { themeGet } from "@styled-system/theme-get"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { css } from "styled-components"
import { DROP_SHADOW } from "../../helpers"
import { useClickOutside, usePosition } from "../../utils"
import { useUpdateEffect } from "../../utils/useUpdateEffect"
import { useWidthOf } from "../../utils/useWidthOf"
import { Box, BoxProps, splitBoxProps } from "../Box"
import { Checkbox } from "../Checkbox"
import { caretMixin, Option } from "../Select"
import { Text } from "../Text"
import { Tooltip } from "../Tooltip"
import { Clickable } from "../Clickable"
import { RequiredField } from "../../shared/RequiredField"

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
  visible?: boolean
}

/** A drop-down multi-select menu */
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
  const [boxProps] = splitBoxProps(rest)

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
    <Box width="100%" {...boxProps}>
      {!!description && (
        <Tooltip pointer content={description} placement="top-end">
          <Text variant="xs" color="black60" textAlign="right">
            <u>What is this?</u>
          </Text>
        </Tooltip>
      )}

      <Container
        ref={anchorRef as any}
        onClick={onVisible}
        complete={complete || selection.length > 0}
        disabled={!!disabled}
        error={error}
        focus={!!focus}
        hover={!!hover}
        title={title}
        visible={visible}
        required={required}
        mt={title || description ? 0.5 : 0}
        {...rest}
      >
        <Text variant="sm" lineHeight={1}>
          {selection.length > 0 ? `${selection.length} selected` : name}
        </Text>

        {!!title && <StyledLabel htmlFor={name}>{title}</StyledLabel>}
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

      {required && !(error && typeof error === "string") && (
        <RequiredField mt={0.5} ml={1} />
      )}

      {error && typeof error === "string" && (
        <Text variant="xs" mt={0.5} ml={1} color="red100">
          {error}
        </Text>
      )}
    </Box>
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

const MULTISELECT_STATES = {
  default: css`
    height: 50px;
    font-size: ${themeGet("textVariants.sm-display.fontSize")};
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.black30")};

    & > label {
      color: ${themeGet("colors.black60")};
      font-size: ${themeGet("textVariants.sm-display.fontSize")};
    }
  `,
  focus: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.blue100")};
    text-decoration: underline;

    & > label {
      color: ${themeGet("colors.blue100")};
      transform: translateY(-250%);
      font-size: ${themeGet("textVariants.xs.fontSize")};
    }
  `,
  hover: css`
    color: ${themeGet("colors.blue100")};
    border-color: ${themeGet("colors.black60")};
    text-decoration: underline;

    & > label {
      color: ${themeGet("colors.blue100")};
    }
  `,
  completed: css`
    border-color: ${themeGet("colors.black60")};
    text-decoration: none;

    & > label {
      color: ${themeGet("colors.black60")};
      transform: translateY(-250%);
      font-size: ${themeGet("textVariants.xs.fontSize")};
    }
  `,
  disabled: css`
    color: ${themeGet("colors.black30")};
    border-color: ${themeGet("colors.black30")};
    text-decoration: none;

    & > label {
      color: ${themeGet("colors.black30")};
      text-decoration: none;
    }
  `,
  error: css`
    color: ${themeGet("colors.black100")};
    border-color: ${themeGet("colors.red100")};

    & > label {
      color: ${themeGet("colors.red100")};
    }
  `,
}

type ContainerProps = Pick<
  MultiSelectProps,
  "complete" | "disabled" | "error" | "hover" | "focus" | "visible"
>

const Container = styled(Clickable)<ContainerProps>`
  position: relative;
  width: 100%;
  /* 24px = space.1 + 4px-wide caret + space.1 */
  padding: 16px 24px 16px ${themeGet("space.1")};
  font-family: ${themeGet("fonts.sans")};
  border: 1px solid;
  border-radius: 3px;
  border-color: ${themeGet("colors.black30")};
  cursor: pointer;
  line-height: 1;
  transition: color 0.25s, background-color 0.25s, border-color 0.25s;

  ${(props) => {
    return css`
      ${MULTISELECT_STATES.default}
      ${props.complete && MULTISELECT_STATES.completed}
      ${props.hover && MULTISELECT_STATES.hover}
      ${props.focus && MULTISELECT_STATES.focus}
      ${props.disabled && MULTISELECT_STATES.disabled}
      ${props.error && MULTISELECT_STATES.error}
    
      &:hover {
        ${MULTISELECT_STATES.hover}
      }

      ${props.visible && MULTISELECT_STATES.focus}

      &:disabled {
        cursor: default;
        ${MULTISELECT_STATES.disabled}
      }
    `
  }}

  ${caretMixin}
`

const StyledLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 5px;
  padding: 0 5px;
  pointer-events: none;
  transform: translateY(-50%);
  transition: 0.25s cubic-bezier(0.64, 0.05, 0.36, 1);
  /* transition-property: color, font-size, transform; */
  transition-property: color, transform, padding, font-size;
  background-color: ${themeGet("colors.white100")};
  font-family: ${themeGet("fonts.sans")};
`
