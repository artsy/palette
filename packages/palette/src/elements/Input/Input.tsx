import { TextVariant } from "@artsy/palette-tokens/dist/typography/types"
import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled from "styled-components"
import { css } from "styled-components"
import { getThemeConfig, useThemeConfig } from "../../Theme"
import { Box, BoxProps, splitBoxProps } from "../Box"
import { Spacer } from "../Spacer"
import { Text } from "../Text"
import { INPUT_STATES as V2_INPUT_STATES } from "./tokens/v2"
import { INPUT_STATES as V3_INPUT_STATES } from "./tokens/v3"

export interface InputProps
  extends BoxProps,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "width" | "height"
    > {
  description?: string
  disabled?: boolean
  error?: string | boolean
  focus?: boolean
  hover?: boolean
  required?: boolean
  title?: string
}

/** Input component */
export const Input: React.ForwardRefExoticComponent<
  InputProps & { ref?: React.Ref<HTMLInputElement> }
> = React.forwardRef(
  (
    {
      className,
      description,
      disabled,
      error,
      required,
      focus,
      hover,
      title,
      ...rest
    },
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
      <Box width="100%" className={className} {...boxProps}>
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

        <StyledInput
          ref={ref as any}
          disabled={disabled}
          focus={focus}
          hover={hover}
          error={!!error}
          required={required}
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
  font-family: ${themeGet("fonts.sans")};

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
