import styled, { css } from "styled-components"
// import { Tag } from "../Tag"
import { Image } from "../../platform/primitives"

import {
  borderRadius,
  BorderRadiusProps,
  height,
  HeightProps,
  maxWidth,
  MaxWidthProps,
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
    MaxWidthProps {
      ratio?: number
    }

/**
 * An Image component that responsively resizes within its environment
 */
export const BaseResponsiveImage = styled.div<ResponsiveImageProps>`
  background: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${space};
  ${width};
  ${maxWidth};

  ${props => {
    if (props.ratio) {
      return css`
        height: 0;
        padding-bottom: ${props.ratio * 100 + '%'};
      `
    }
  }}
`
BaseResponsiveImage.defaultProps = {
  width: "100%",
  ratio: 1
}
