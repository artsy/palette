// @ts-ignore
import React from "react"
import styled from "styled-components"

import {
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

export interface BaseImageProps {
  /** The url for the image */
  src: string
  /** Alternate text for image */
  alt?: string
  /** A11y text label */
  ariaLabel?: string
  /** Apply additional styles to component */
  style?: object
}

export interface ImageProps
  extends BaseImageProps,
    SpaceProps,
    WidthProps,
    HeightProps {}

/**
 * Image component with space, width and height properties
 */
export const Image = styled.img<ImageProps>`
  ${space};
  ${width};
  ${height};
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
export const ResponsiveImage = styled.div<ResponsiveImageProps>`
  background: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${ratio};
  ${space};
  ${width};
  ${maxWidth};
`

// @ts-ignore
ResponsiveImage.defaultProps = {
  width: "100%",
  ratio: 1,
}
