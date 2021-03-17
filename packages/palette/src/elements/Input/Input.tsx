import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled from "styled-components"
import { css } from "styled-components"
import { getThemeConfig, useThemeConfig } from "../../Theme"
import { Box, BoxProps, splitBoxProps } from "../Box"
import { Spacer } from "../Spacer"
import { Text, TextVariant } from "../Text"
import { INPUT_STATES as V2_INPUT_STATES } from "./tokens/v2"
import { INPUT_STATES as V3_INPUT_STATES } from "./tokens/v3"

export interface InputProps
  extends BoxProps,
    React.HTMLAttributes<HTMLInputElement> {
  description?: string
  disabled?: boolean
  error?: string | boolean
  focus?: boolean
  hover?: boolean
  required?: boolean
  title?: string
}

/** Input component */
export const Input: React.ForwardRefExoticComponent<InputProps> = React.forwardRef(
  (
    { description, disabled, error, required, focus, hover, title, ...rest },
    ref
  ) => {
    const [boxProps, inputProps] = splitBoxProps(rest)

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
        <div>
          {title && (
            <Text
              variant={tokens.titleVariant}
              style={{ textTransform: tokens.titleTextTransform }}
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

        {(title || description) && <Spacer m={0.5} />}

        <StyledInput
          ref={ref as any}
          disabled={disabled}
          focus={focus}
          hover={hover}
          error={!!error}
          {...inputProps}
        />

        {error && typeof error === "string" && (
          <Text variant={tokens.secondaryTextVariant} mt={0.5} color="red100">
            {error}
          </Text>
        )}
      </Box>
    )
  }
)

type StyledInputProps = Pick<
  InputProps,
  "disabled" | "error" | "hover" | "focus"
>

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: 0 ${themeGet("space.1")};
  appearance: none;
  line-height: 1;
  border: 1px solid;
  border-radius: 0;
  transition: border-color 0.25s;

  ${(props) => {
    const states = getThemeConfig(props, {
      v2: V2_INPUT_STATES,
      v3: V3_INPUT_STATES,
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
  }};
`
