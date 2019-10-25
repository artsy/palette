// @ts-ignore
import React, { FC } from "react"
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

// : React.SVGProps<SVGSVGElement>

// tslint:disable-next-line:no-empty-interface
export interface IconProps
  extends React.SVGProps<any>,
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
/** Compatibility component used to normalize paths between react dom and react native */
export const Path: FC<JSX.IntrinsicElements["path"]> = ({ ...props }) => {
  return <path {...props} />
}

/** Compatibility component used to normalize titles between react dom and react native */
export const Title: FC<JSX.IntrinsicElements["title"]> = ({ ...props }) => {
  return <title {...props} />
}

/** Compatibility component used to normalize svg groups between react dom and react native */
export const G: FC<JSX.IntrinsicElements["g"]> = ({ ...props }) => {
  return <g {...props} />
}

/** Compatibility component used to normalize svg circles between react dom and react native */
export const Circle: FC<JSX.IntrinsicElements["circle"]> = ({ ...props }) => {
  return <circle {...props} />
}

/** Compatibility component used to normalize svg rects between react dom and react native */
export const Rect: FC<JSX.IntrinsicElements["rect"]> = ({ ...props }) => {
  return <rect {...props} />
}
