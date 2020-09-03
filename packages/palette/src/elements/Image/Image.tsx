import React from "react"

import { LazyImage } from "./LazyImage"

import styled from "styled-components"
import { Image as ImageTag } from "../../platform/primitives"
import { CleanTag } from "../CleanTag"

import {
  borderRadius,
  BorderRadiusProps,
  height,
  HeightProps,
  maxWidth,
  MaxWidthProps,
  ResponsiveValue,
  space,
  SpaceProps,
  system,
  width,
  WidthProps,
} from "styled-system"

/** Props for a web-only Image component. */
export interface WebImageProps extends ImageProps {
  /** Flag for if image should be lazy loaded */
  lazyLoad?: boolean
  /** Alternate text for image */
  alt?: string
  /** A11y text label */
  ["aria-label"]?: string
  /** The title of the image */
  title?: string
  /** Flag indicating that right clicks should be prevented */
  preventRightClick?: boolean
}

const ratioPadding = system({
  ratio: {
    property: "paddingBottom",
    transform: n => n * 100 + "%",
  },
})

/** Props for web & iOS images */
export interface BaseImageProps {
  /** The URL for the image */
  src: string
  /** The URLs for the image */
  srcSet?: string
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
export const BaseImage = styled(CleanTag.as(ImageTag))<ImageProps>`
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
  ratio?: ResponsiveValue<number>
}

/**
 * An Image component that responsively resizes within its environment
 */
export const BaseResponsiveImage = styled(CleanTag)<ResponsiveImageProps>`
  background: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${space};
  ${width};
  ${maxWidth};
  ${props =>
    props.ratio
      ? {
          height: 0,
          ...ratioPadding(props),
        }
      : null};
`
BaseResponsiveImage.defaultProps = {
  width: "100%",
  ratio: 1,
}

/** A web-only Image component. */
export const Image = ({
  lazyLoad = false,
  preventRightClick = false,
  ...props
}: WebImageProps) => {
  return (
    <LazyImage
      preload={!lazyLoad}
      imageComponent={BaseImage}
      {...props}
      onContextMenu={e => preventRightClick && e.preventDefault()}
    />
  )
}

/** Props for a web-only ResponsiveImage component. */
export interface WebResponsiveImageProps extends ResponsiveImageProps {
  /** Flag for if image should be lazy loaded */
  lazyLoad?: boolean
}

/** A web-only ResponsiveImage component. */
export const ResponsiveImage = ({
  lazyLoad = false,
  ...props
}: WebResponsiveImageProps) => (
  <LazyImage
    preload={!lazyLoad}
    imageComponent={BaseResponsiveImage}
    {...props}
  />
)

export { LazyImage }
