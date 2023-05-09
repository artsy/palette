import { themeGet } from "@styled-system/theme-get"
import React, { useCallback, useMemo, useState } from "react"
import styled, { css } from "styled-components"
import { RequiredField } from "../../shared/RequiredField"
import { Box, BoxProps, splitBoxProps } from "../Box"
import { Text } from "../Text"
import { Tooltip } from "../Tooltip"
import { TEXTAREA_STATES } from "./tokens"

export interface TextAreaProps
  extends BoxProps,
    Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      "onChange" | "title"
    > {
  active?: boolean
  characterLimit?: number
  defaultValue?: string
  description?: React.ReactNode
  required?: boolean
  title?: string
  disabled?: boolean
  error?: string | boolean
  focus?: boolean
  hover?: boolean
  onChange?(result: TextAreaChange): void
}

export interface TextAreaChange {
  value: string
  exceedsCharacterLimit: boolean
}

/** TextArea */
export const TextArea: React.ForwardRefExoticComponent<
  TextAreaProps & { ref?: React.Ref<HTMLTextAreaElement> }
> = React.forwardRef(
  (
    {
      error,
      disabled,
      focus,
      hover,
      characterLimit,
      title,
      description,
      defaultValue = "",
      required,
      onChange,
      ...rest
    },
    ref
  ) => {
    const [boxProps, inputProps] = splitBoxProps(rest)

    const [value, setValue] = useState(defaultValue)

    const characterLimitExceeded = useCallback(
      (text: string) => {
        return Boolean(characterLimit && text.length > characterLimit)
      },
      [characterLimit]
    )

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const nextValue = event.currentTarget.value
        setValue(nextValue)
        onChange?.({
          value: nextValue,
          exceedsCharacterLimit: characterLimitExceeded(nextValue),
        })
      },
      [characterLimitExceeded, onChange]
    )

    const hasError = useMemo(
      () => Boolean(error || characterLimitExceeded(value)),
      [characterLimitExceeded, error, value]
    )

    return (
      <Box width="100%" {...boxProps}>
        {!!description && (
          <Tooltip pointer content={description} placement="top-end">
            <Text variant="xs" color="black60" textAlign="right">
              <u>What is this?</u>
            </Text>
          </Tooltip>
        )}

        <Box position="relative">
          <StyledTextArea
            ref={ref as any}
            disabled={disabled}
            focus={focus}
            hover={hover}
            error={hasError}
            onChange={handleChange}
            defaultValue={defaultValue}
            required={required}
            title={title}
            {...inputProps}
          />

          {!!title && (
            <StyledLabel htmlFor={inputProps.name}>{title}</StyledLabel>
          )}
        </Box>

        {(required || characterLimit) && !(error && typeof error === "string") && (
          <Box display="flex" mt={0.5} mx={1}>
            {required && <RequiredField flex={1} />}

            {typeof characterLimit !== "undefined" && (
              <Text
                flex={1}
                variant="xs"
                color={characterLimitExceeded(value) ? "red100" : "black60"}
                textAlign="right"
              >
                {value.length}/{characterLimit}
              </Text>
            )}
          </Box>
        )}

        {error && typeof error === "string" && (
          <Text variant="xs" color="red100" mt={0.5} ml={1}>
            {error}
          </Text>
        )}
      </Box>
    )
  }
)

TextArea.displayName = "TextArea"

type StyledTextAreaProps = Pick<
  TextAreaProps,
  "disabled" | "error" | "hover" | "focus" | "active" | "title"
>

const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  appearance: none;
  display: block;
  width: 100%;
  padding: ${themeGet("space.1")};
  resize: vertical;
  transition: border-color 0.25s, color 0.25s;
  outline: none;
  border: 1px solid;
  border-radius: 3px;
  font-family: ${themeGet("fonts.sans")};

  ::placeholder {
    transition: color 0.25s, opacity 0.25s;
  }

  ${(props) => {
    return css`
      ${TEXTAREA_STATES.default}
      ${props.hover && TEXTAREA_STATES.hover}
      ${props.focus && TEXTAREA_STATES.focus}
      ${props.active && TEXTAREA_STATES.active}
      ${props.disabled && TEXTAREA_STATES.disabled}
      ${props.error && TEXTAREA_STATES.error}

      &:hover {
        ${TEXTAREA_STATES.hover}
      }

      &:not(:placeholder-shown) {
        ${!!props.placeholder && TEXTAREA_STATES.completed}
        ${props.error && TEXTAREA_STATES.error}
      }

      &:focus {
        outline: none;
        ${TEXTAREA_STATES.focus}

        :not(:placeholder-shown) {
          ${!!props.placeholder && TEXTAREA_STATES.active}
          ${props.error && TEXTAREA_STATES.error}
        }
      }

      &:disabled {
        cursor: default;
        ${TEXTAREA_STATES.disabled}
      }

      ${props.title &&
      css`
        ::placeholder {
          opacity: 0;
        }
      `}
    `
  }}
`
const StyledLabel = styled.label`
  position: absolute;
  top: 24px;
  left: 6px;
  padding: 0 5px;
  background-color: ${themeGet("colors.white100")};
  transform: translateY(-50%);
  transition: 0.25s cubic-bezier(0.64, 0.05, 0.36, 1);
  transition-property: color, transform, padding, font-size;
  font-family: ${themeGet("fonts.sans")};
  pointer-events: none;
`
