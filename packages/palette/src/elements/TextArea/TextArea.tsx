import { themeGet } from "@styled-system/theme-get"
import React, { useCallback, useMemo, useState } from "react"
import styled, { css } from "styled-components"
import { Box, BoxProps, splitBoxProps } from "../Box"
import { Spacer } from "../Spacer"
import { Text } from "../Text/Text"
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
  title?: React.ReactNode
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
        {(title || description) && (
          <>
            <div>
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
            </div>

            <Spacer m={0.5} />
          </>
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
            {...inputProps}
          />

          {typeof characterLimit !== "undefined" && (
            <Text
              position="absolute"
              bottom={0}
              left={0}
              px={1}
              py={0.5}
              variant="xs"
              color={characterLimitExceeded(value) ? "red100" : "black60"}
              style={{ pointerEvents: "none" }}
            >
              {characterLimit - value.length} characters remaining
            </Text>
          )}
        </Box>

        {error && typeof error === "string" && (
          <Text variant="xs" color="red100" mt={0.5}>
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
  "disabled" | "error" | "hover" | "focus" | "active"
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
  font-family: ${themeGet("fonts.sans")};

  ::placeholder {
    transition: color 0.25s;
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

      &:focus {
        outline: none;
        ${TEXTAREA_STATES.focus}

        :not(:placeholder-shown) {
          ${TEXTAREA_STATES.active}
          ${props.error && TEXTAREA_STATES.error}
        }
      }

      &:disabled {
        cursor: default;
        ${TEXTAREA_STATES.disabled}
      }
    `
  }}
`
