// @ts-ignore
import React from "react"
import styled from "styled-components"
import { Image } from "../../platform/primitives"
// import { Tag } from "../Tag"

import {
  borderRadius,
  BorderRadiusProps,
  height,
  HeightProps,
  maxWidth,
  MaxWidthProps,
  ratio,
  RatioProps,
  space,
  SpaceProps,
  width,
  WidthProps,
} from "styled-system"

/** Props for web & iOS images */
export interface BaseImageProps {
  /** The url for the image */
  src: string
  /** Apply additional styles to component */
  style?: object
}

export interface ImageProps
  extends BaseImageProps,
    SpaceProps,
    WidthProps,
    HeightProps,
    BorderRadiusProps {}

/**
 * Image component with space, width and height properties
 */
export const BaseImage = styled(Image)<ImageProps>`
  ${space};
  ${width};
  ${height};
  ${borderRadius}
`

export interface ResponsiveImageProps
  extends BaseImageProps,
    SpaceProps,
    WidthProps,
    RatioProps,
    MaxWidthProps {}

/**
 * An Image component that responsively resizes within its environment
 */
export const BaseResponsiveImage = styled.div<ResponsiveImageProps>`
  background: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${ratio};
  ${space};
  ${width};
  ${maxWidth};
`
BaseResponsiveImage.defaultProps = {
  width: "100%",
  ratio: 1,
}
