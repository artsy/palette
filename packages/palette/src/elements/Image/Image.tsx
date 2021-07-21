import React from "react"
import styled from "styled-components"
import {
  borderRadius,
  BorderRadiusProps,
  compose,
  height,
  HeightProps,
  maxHeight,
  MaxHeightProps,
  maxWidth,
  MaxWidthProps,
  ResponsiveValue,
  space,
  SpaceProps,
  system,
  width,
  WidthProps,
} from "styled-system"
import { CleanTag } from "../CleanTag"
import { LazyImage } from "./LazyImage"

/** Props for a web-only Image component. */
export interface WebImageProps extends ImageProps {
  /** Flag for if image should be lazy loaded */
  lazyLoad?: boolean
  /** Flag indicating that right clicks should be prevented */
  preventRightClick?: boolean
}

const ratioPadding = system({
  ratio: {
    property: "paddingBottom",
    transform: (n) => n * 100 + "%",
  },
})

export interface BaseImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "height" | "width"> {}

export interface ImageProps
  extends BaseImageProps,
    SpaceProps,
    WidthProps,
    HeightProps,
    MaxHeightProps,
    BorderRadiusProps {}

/**
 * Image component with space, width and height properties
 */
export const BaseImage = styled(CleanTag.as("img"))<ImageProps>`
  ${compose(space, width, height, maxHeight, borderRadius)}
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
  background: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${compose(space, width, maxWidth)};
  ${(props) =>
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
      onContextMenu={(e) => preventRightClick && e.preventDefault()}
    />
  )
}

/** Props for a web-only ResponsiveImage component. */
export interface WebResponsiveImageProps extends ResponsiveImageProps {
  /** Flag for if image should be lazy loaded */
  lazyLoad?: boolean
}

/**
 * A web-only ResponsiveImage component.
 * @deprecated See the recipe for creating a responsive image at https://palette.artsy.net/elements/images/image/
 */
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
