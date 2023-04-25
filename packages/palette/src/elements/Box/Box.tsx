import styled from "styled-components"
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  gridArea,
  GridAreaProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  ResponsiveValue,
  space,
  SpaceProps,
  system,
  textAlign,
  TextAlignProps,
} from "styled-system"
import { splitProps } from "../../utils/splitProps"

const gap = system({
  gap: {
    property: "gap",
    scale: "space",
  },
})

export interface BoxProps
  extends BackgroundProps,
    BorderProps,
    Omit<ColorProps, "color">,
    FlexboxProps,
    GridAreaProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    TextAlignProps {
  gap?: ResponsiveValue<string | number>
}

/**
 * All the system functions for Box
 */
export const boxMixin = compose(
  background,
  border,
  color,
  flexbox,
  gridArea,
  layout,
  position,
  space,
  textAlign,
  gap
)

/**
 * Box is just a `View` or `div` (depending on the platform) with common styled-systems
 * hooks.
 */
export const Box = styled.div<BoxProps>`
  ${boxMixin}
`

Box.displayName = "Box"

/** Splits out props into valid and invalid BoxProps */
export const splitBoxProps = splitProps<BoxProps>(boxMixin)
