import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled from "styled-components"
import { css } from "styled-components"
import { CheckIcon } from "../../svgs"
import { Clickable, ClickableProps } from "../Clickable"
import { Text } from "../Text"
import { PILL_VARIANTS } from "./tokens"

export const PILL_VARIANT_NAMES = [
  "textRound",
  "textSquare",
  "filter",
  "artist",
] as const

export type PillVariant = typeof PILL_VARIANT_NAMES[number]
export type PillState = "default" | "focus" | "hover" | "active"

/** PillProps */
export type PillProps = ClickableProps & {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  /** Forces focus state */
  focus?: boolean
  /** Forces hover state */
  hover?: boolean
} & (
    | {
        variant?: Extract<PillVariant, "textRound" | "textSquare" | "filter">
        /** Forces active state & border-color to black60 */
        active?: boolean
      }
    | {
        /** `"artist"` pills do not have an `active` state */
        variant?: Extract<PillVariant, "artist">
        /**
         * Optional avatar; 1x or [1x, 2x]
         * Should target 30x30 @1x, 60x60 @2x
         */
        src?: string | [string, string]
      }
  )

const Container = styled(Clickable)<PillProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  border: 1px solid ${themeGet("colors.black15")};
  transition: color 0.25s ease, border-color 0.25s ease,
    background-color 0.25s ease, box-shadow 0.25s ease;

  ${(props) => {
    const states = PILL_VARIANTS[props.variant ?? "textRound"]

    return css`
      ${states.default}
      ${props.hover && states.hover}
      ${props.focus && states.focus}
      ${"active" in props && props.active && states.active}

      &:hover {
        ${states.hover}
      }

      &:focus {
        outline: 0;
        ${states.focus}
        ${"active" in props && props.active && states.active}
      }
    `
  }}
`

const Thumbnail = styled.img`
  display: block;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-right: ${themeGet("space.1")};
  background-color: ${themeGet("colors.black30")};
`

/**
 * A Pill is a non-CTA button.
 * It may be used for things like active filters, search states,
 * or to denote an artist entity (possibly in the context of a card).
 */
export const Pill: React.FC<PillProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      {"active" in rest && rest.active && rest.variant === "filter" && (
        <CheckIcon mr={0.5} />
      )}

      {rest.variant === "artist" && (
        <Thumbnail
          {...(rest.src
            ? { src: typeof rest.src === "string" ? rest.src : rest.src[0] }
            : {})}
          {...(rest.src && typeof rest.src !== "string" && rest.src[1]
            ? { srcSet: `${rest.src[0]} 1x, ${rest.src[1]} 2x` }
            : {})}
          // Intentionally empty string
          alt=""
        />
      )}

      <Text
        variant="xs"
        {...(typeof children === "string"
          ? // Simple label — handle the text overflow
            { overflowEllipsis: true }
          : // Otherwise use the children as-is and center align them
            { display: "flex", alignItems: "center" })}
      >
        {children}
      </Text>
    </Container>
  )
}

Pill.defaultProps = {
  variant: "textRound",
}
