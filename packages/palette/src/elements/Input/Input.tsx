import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled, { css } from "styled-components"
import { height as systemHeight } from "styled-system"
import { Box, BoxProps, splitBoxProps } from "../Box"
import { Text } from "../Text"
import { INPUT_STATES } from "./tokens"
import TextField, {
  HelperText,
  Input as MaterialInput,
} from "@material/react-text-field"
import "@material/react-text-field/dist/text-field.css"

export type InputProps = (InputOldDesignProps | InputNewDesignProps) &
  InputSharedProps
export interface InputSharedProps
  extends BoxProps,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "width" | "height" | "capture"
    > {
  active?: boolean
  description?: string
  disabled?: boolean
  error?: string | boolean
  focus?: boolean
  hover?: boolean
  required?: boolean
  title?: string
}

interface InputOldDesignProps {
  readonly newDesign?: false
}

interface InputNewDesignProps {
  floatingLabelClassName?: string
  fullWidth?: boolean
  readonly newDesign: true
}

/** Input component */
export const Input: React.ForwardRefExoticComponent<
  InputProps & { ref?: React.Ref<HTMLInputElement> }
> = React.forwardRef(
  (
    {
      children,
      className,
      description,
      disabled,
      error,
      focus,
      height,
      hover,
      required,
      title,
      ...rest
    },
    ref
  ) => {
    const [boxProps, inputProps] = splitBoxProps(rest)

    if (rest.newDesign) {
      return (
        <Box width="100%" className={className} {...boxProps}>
          <TextFieldStyledComponent
            label={title}
            floatingLabelClassName={rest.floatingLabelClassName}
            outlined
            color="blue100"
            helperText={<HelperText>{description}</HelperText>}
          >
            <MaterialInput
              disabled={disabled}
              ref={ref as any}
              {...inputProps}
            />
          </TextFieldStyledComponent>
        </Box>
      )
    }

    return (
      <Box width="100%" className={className} {...boxProps}>
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

        <Box position="relative" mt={title || description ? 0.5 : 0}>
          <StyledInput
            ref={ref as any}
            disabled={disabled}
            focus={focus}
            hover={hover}
            error={!!error}
            required={required}
            height={(height ?? 50) as any}
            {...inputProps}
          />

          {children}
        </Box>

        {error && typeof error === "string" && (
          <Text variant="xs" mt={0.5} color="red100">
            {error}
          </Text>
        )}
      </Box>
    )
  }
)

Input.displayName = "Input"

type StyledInputProps = Pick<
  InputProps,
  "disabled" | "error" | "hover" | "focus" | "active"
>

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: 0 ${themeGet("space.1")};
  appearance: none;
  line-height: 1;
  border: 0;
  border-bottom: 1px solid;
  border-radius: 0;
  transition: border-color 0.25s, color 0.25s;
  font-family: ${themeGet("fonts.sans")};
  ${systemHeight};

  ::placeholder {
    transition: color 0.25s;
  }

  ${(props) => {
    return css`
      ${INPUT_STATES.default}
      ${props.hover && INPUT_STATES.hover}
      ${props.focus && INPUT_STATES.focus}
      ${props.active && INPUT_STATES.active}
      ${props.disabled && INPUT_STATES.disabled}
      ${props.error && INPUT_STATES.error}

      &:hover {
        ${INPUT_STATES.hover}
      }

      &:focus {
        outline: none;
        ${INPUT_STATES.focus}

        :not(:placeholder-shown) {
          ${INPUT_STATES.active}
          ${props.error && INPUT_STATES.error}
        }
      }

      &:disabled {
        cursor: default;
        ${INPUT_STATES.disabled}
      }
    `
  }};
`

const TextFieldStyles = css`
  .mdc-text-field {
    font-family: ${themeGet("fonts.sans")};
  }
  .mdc-floating-label {
    color: ${themeGet("colors.blue100")};
  }
`

const TextFieldStyledComponent = styled(TextField)`
  ${() => {
    return css`
      ${TextFieldStyles}
    `
  }};
`
