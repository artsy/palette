import { themeGet } from "@styled-system/theme-get"
import React, { useCallback, useState } from "react"
import styled, { css } from "styled-components"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
import { Sans } from "../Typography/Typography"

const StyledTextArea = styled.textarea`
  transition: border-color 0.25s ease;
  padding: ${themeGet("space.1")};
  min-height: ${themeGet("space.9")};
  font-family: ${themeGet("fontFamily.sans.regular")};
  font-size: ${themeGet("typeSizes.sans.3.fontSize")};
  line-height: ${themeGet("typeSizes.sans.3.lineHeight")};
  outline: none;
  ${({ hasError }: { hasError?: boolean }) => css`
    border: 1px solid ${themeGet(hasError ? "colors.red100" : "colors.black10")};
    :active,
    :focus {
      border-color: ${themeGet(
        hasError ? "colors.red100" : "colors.purple100"
      )};
    }
  `};
  resize: vertical;
`

const Required = styled.span`
  color: ${themeGet("colors.purple100")};
`

export interface TextAreaProps {
  error?: string
  required?: boolean
  characterLimit?: number
  title?: React.ReactNode
  description?: React.ReactNode
  onChange?(result: TextAreaChange): void

  // forwarded to the styled.input
  className?: string
  defaultValue?: string
  innerRef?: React.RefObject<HTMLTextAreaElement>
  name?: string
  placeholder?: string
}

export interface TextAreaChange {
  value: string
  exceedsCharacterLimit: boolean
}

/** TextArea */
export const TextArea: React.FC<TextAreaProps> = ({
  error,
  characterLimit,
  title,
  description,
  defaultValue = "",
  required,
  onChange,
  ...rest
}) => {
  const [value, setValue] = useState(defaultValue)

  const characterLimitExceeded = () => {
    return Boolean(characterLimit && value.length > characterLimit)
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = event.currentTarget.value
    setValue(nextValue)
    onChange?.({
      value: nextValue,
      exceedsCharacterLimit: characterLimitExceeded(),
    })
  }

  const hasError = Boolean(error || characterLimitExceeded())

  return (
    <Flex flexDirection="column">
      {title && (
        <>
          <Sans size="3t">
            {title}
            {required && <Required>*</Required>}
          </Sans>
        </>
      )}

      {description && (
        <>
          <Sans size="2" color="black60">
            {description}
          </Sans>
        </>
      )}

      {(title || description) && <Spacer mb={1} />}

      <StyledTextArea {...rest} onChange={handleChange} hasError={hasError} />

      <Spacer mb={1} />

      <Flex justifyContent="space-between">
        <Sans color="red100" size="2">
          {error}
        </Sans>

        {typeof characterLimit !== "undefined" && (
          <Sans
            size="2"
            color={characterLimitExceeded() ? "red100" : "black60"}
          >
            {value.length} / {characterLimit} max
          </Sans>
        )}
      </Flex>
    </Flex>
  )
}
