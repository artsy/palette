import { themeGet } from "@styled-system/theme-get"
import React, { useState } from "react"
import styled, { css } from "styled-components"
import { TextVariant } from "../../../../palette-tokens/dist/typography/types"
import { getThemeConfig, useThemeConfig } from "../../Theme"
import { Box, BoxProps, splitBoxProps } from "../Box"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Text } from "../Text/Text"
import { TEXTAREA_STATES as V2_TEXTAREA_STATES } from "./tokens/v2"
import { TEXTAREA_STATES as V3_TEXTAREA_STATES } from "./tokens/v3"

export interface TextAreaProps
  extends BoxProps,
    Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      "onChange" | "title"
    > {
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

    const characterLimitExceeded = (text: string) => {
      return Boolean(characterLimit && text.length > characterLimit)
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.currentTarget.value
      setValue(nextValue)
      onChange?.({
        value: nextValue,
        exceedsCharacterLimit: characterLimitExceeded(nextValue),
      })
    }

    const hasError = Boolean(error || characterLimitExceeded(value))

    const tokens = useThemeConfig({
      v2: {
        titleVariant: "text" as TextVariant,
        titleTextTransform: null,
        secondaryTextVariant: "small" as TextVariant,
      },
      v3: {
        titleVariant: "xs" as TextVariant,
        titleTextTransform: "uppercase",
        secondaryTextVariant: "xs" as TextVariant,
      },
    })

    return (
      <Box width="100%" {...boxProps}>
        {(title || description) && (
          <>
            <div>
              {title && (
                <Text
                  variant={tokens.titleVariant}
                  textTransform={tokens.titleTextTransform}
                >
                  {title}
                  {required && (
                    <Box as="span" color="brand">
                      *
                    </Box>
                  )}
                </Text>
              )}

              {description && (
                <Text variant={tokens.secondaryTextVariant} color="black60">
                  {description}
                </Text>
              )}
            </div>

            <Spacer m={0.5} />
          </>
        )}

        <StyledTextArea
          ref={ref as any}
          disabled={disabled}
          focus={focus}
          hover={hover}
          error={hasError}
          onChange={handleChange}
          defaultValue={defaultValue}
          {...inputProps}
        />

        <Spacer mt={0.5} />

        <Flex justifyContent="space-between">
          {error && typeof error === "string" ? (
            <Text variant={tokens.secondaryTextVariant} color="red100">
              {error}
            </Text>
          ) : (
            <div />
          )}

          {typeof characterLimit !== "undefined" && (
            <Text
              variant={tokens.secondaryTextVariant}
              color={characterLimitExceeded(value) ? "red100" : "black60"}
            >
              {value.length} / {characterLimit} max
            </Text>
          )}
        </Flex>
      </Box>
    )
  }
)

type StyledTextAreaProps = Pick<
  TextAreaProps,
  "disabled" | "error" | "hover" | "focus"
>

const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  appearance: none;
  display: block;
  width: 100%;
  padding: ${themeGet("space.1")};
  resize: vertical;
  transition: border-color 0.25s ease;
  outline: none;
  border: 1px solid;
  font-family: ${themeGet("fonts.sans")};

  ${(props) => {
    const states = getThemeConfig(props, {
      v2: V2_TEXTAREA_STATES,
      v3: V3_TEXTAREA_STATES,
    })

    return css`
      ${states.default}
      ${props.hover && states.hover}
      ${props.focus && states.focus}
      ${props.disabled && states.disabled}
      ${props.error && states.error}

      &:hover {
        ${states.hover}
      }

      &:focus {
        outline: none;
        ${states.focus}
      }

      &:disabled {
        cursor: default;
        ${states.disabled}
      }
    `
  }}
`
