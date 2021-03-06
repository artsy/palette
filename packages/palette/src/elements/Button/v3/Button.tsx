import React, { useEffect, useRef } from "react"
import styled, { css } from "styled-components"
import { variant } from "styled-system"
import { THEME_V3 } from "../../../themes"
import { boxMixin } from "../../Box"
import { Spinner } from "../../Spinner"
import { Text } from "../../Text"
import { ButtonProps } from "../Button"
import { BUTTON_SIZES, BUTTON_TEXT_SIZES, BUTTON_VARIANTS } from "./tokens"

export const ButtonV3: React.FC<ButtonProps> = ({
  children,
  loading,
  color,
  size,
  onClick,
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement | null>(null)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!loading && onClick) {
      onClick(event)
    }
  }

  useEffect(() => {
    if (loading && ref.current !== null) {
      ref.current.blur()
    }
  }, [loading])

  return (
    <Container
      ref={ref as any}
      onClick={handleClick}
      size={size}
      loading={loading}
      tabIndex={loading ? -1 : 0}
      {...rest}
    >
      {loading && <Spinner size={size} color="currentColor" />}

      <Text
        pt="1px"
        variant={BUTTON_TEXT_SIZES[size]}
        opacity={loading ? 0 : 1}
      >
        {children}
      </Text>
    </Container>
  )
}

ButtonV3.defaultProps = {
  size: "medium",
  variant: "primaryBlack",
}

type ContainerProps = Pick<
  ButtonProps,
  "size" | "inline" | "loading" | "hover" | "focus" | "disabled"
>

const Container = styled.button<ContainerProps>`
  display: inline-block;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  text-decoration: none;
  align-items: center;
  border: 1px solid;
  transition: color 0.25s ease, border-color 0.25s ease,
    background-color 0.25s ease, box-shadow 0.25s ease;

  ${boxMixin};

  /* Handle sizing */
  ${variant({ prop: "size", variants: BUTTON_SIZES })}

  ${(props) => {
    // Handle props driven states
    if (props.hover) {
      return variant({ variants: BUTTON_VARIANTS.hover })
    }

    if (props.focus) {
      return css`
        outline: 0;
        ${variant({ variants: BUTTON_VARIANTS.focus })}
      `
    }

    if (props.loading) {
      return css`
        cursor: auto;
        transition: none;
        pointer-events: none;
        ${variant({ variants: BUTTON_VARIANTS.loading })}
      `
    }

    if (props.disabled) {
      return css`
        pointer-events: none;
        ${variant({ variants: BUTTON_VARIANTS.disabled })}
      `
    }

    return variant({ variants: BUTTON_VARIANTS.default })
  }}

  ${() => {
    // Handle pseudo classes
    return css`
      @media ${THEME_V3.mediaQueries.hover} {
        &:hover {
          ${variant({ variants: BUTTON_VARIANTS.hover })}
        }
      }

      &:focus {
        outline: 0;
        ${variant({ variants: BUTTON_VARIANTS.focus })}
      }

      &:disabled {
        pointer-events: none;
        ${variant({ variants: BUTTON_VARIANTS.disabled })}
      }
    `
  }};
`
