import React from "react"
import type {
  BorderProps,
  ColorProps,
  SpaceProps,
  WidthProps,
} from "styled-system"
import { STYLE_PROP_NAMES } from "../../styles/resolveDeclarations"
import { resolveStyleProps } from "../../styles/resolveStyleProps"
import { separator } from "./Separator.css"

export interface SeparatorProps
  extends SpaceProps,
    WidthProps,
    BorderProps,
    ColorProps {}

type SeparatorComponentProps = SeparatorProps &
  Omit<React.HTMLAttributes<HTMLElement>, keyof SeparatorProps> & {
    as?: React.ElementType
  }

/**
 * A horizontal divider whose width and spacing can be adjusted
 */
export const Separator = React.forwardRef<
  HTMLElement,
  SeparatorComponentProps
>(({ as: Component = "div", className, style, ...props }, ref) => {
  const resolved = resolveStyleProps({
    props: {
      ...props,
      width: props.width ?? "100%",
      color: props.color ?? "mono10",
    },
    names: STYLE_PROP_NAMES,
  })

  return (
    <Component
      {...resolved.rest}
      ref={ref}
      className={[separator, resolved.className, className]
        .filter(Boolean)
        .join(" ")}
      style={{ ...resolved.style, ...style }}
    />
  )
})

Separator.displayName = "Separator"
