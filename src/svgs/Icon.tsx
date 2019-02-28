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

// : React.SVGProps<SVGSVGElement>

// tslint:disable-next-line:no-empty-interface
export interface IconProps
  extends React.SVGProps<any>,
    SpaceProps,
    PositionProps,
    TopProps,
    RightProps,
    LeftProps {}

/** Wrapper for icons to include space */
export const Icon = styled.svg.attrs<IconProps>({})`
  position: relative;

  ${space};
  ${top};
  ${right};
  ${left};
  ${position};
`
