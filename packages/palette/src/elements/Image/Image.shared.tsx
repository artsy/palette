// @ts-ignore
import React from "react"
import styled from "styled-components"
import { Image } from "../../platform/primitives"
import { CleanTag } from "../CleanTag"

import {
  border,
  BorderProps,
  compose,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  system,
} from "styled-system"

const ratioPadding = system({
  ratio: {
    property: "paddingBottom",
    transform: n => n * 100 + "%",
  },
})

const ratio = (props: { ratio?: number }) =>
  props.ratio
    ? {
        height: 0,
        ...ratioPadding(props),
      }
    : null

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
    LayoutProps,
    BorderProps {}

/**
 * Image component with space, width and height properties
 */
export const BaseImage = styled(CleanTag.as(Image))<ImageProps>`
  ${compose(
    space,
    layout,
    border
  )}
`

export interface ResponsiveImageProps
  extends BaseImageProps,
    SpaceProps,
    LayoutProps {
  ratio?: number
}

/**
 * An Image component that responsively resizes within its environment
 */
export const BaseResponsiveImage = styled(CleanTag)<ResponsiveImageProps>`
  background: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${compose(
    ratio,
    space,
    layout
  )}
`
BaseResponsiveImage.defaultProps = {
  width: "100%",
  ratio: 1,
}
