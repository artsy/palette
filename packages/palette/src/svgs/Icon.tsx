// @ts-ignore
import React from "react"
import styled from "styled-components"
import {
  left,
  LeftProps,
  position,
  PositionProps,
  right,
  RightProps,
  space,
  SpaceProps,
  top,
  TopProps,
} from "styled-system"
import { Color } from "../Theme"

export interface IconProps
  extends Pick<React.SVGProps<any>, Exclude<keyof React.SVGProps<any>, "ref">>,
    SpaceProps,
    PositionProps,
    TopProps,
    RightProps,
    LeftProps {
  fill?: Color
}

/** Wrapper for icons to include space */
export const Icon = styled.svg.attrs<IconProps>({})`
  position: relative;

  ${space};
  ${top};
  ${right};
  ${left};
  ${position};
`

Icon.defaultProps = {
  fill: "black100",
  height: "18px",
  width: "18px",
}
