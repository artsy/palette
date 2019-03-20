import React, { CSSProperties, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import styled, { css, keyframes } from "styled-components"
import {
  borderRadius as borderRadiusStyle,
  BorderRadiusProps,
  HeightProps,
  WidthProps,
} from "styled-system"
import { color } from "../../helpers/color"
import { Box, BoxProps } from "../Box"
import { BaseImage as Image, ImageProps } from "./Image.shared"

const InnerLazyImage = styled(LazyLoadImage)<ImageProps>`
  width: 100%;
  ${borderRadiusStyle}
  transition: opacity 0.25s;
`
InnerLazyImage.displayName = "InnerLazyImage"

/**
 * The animation that's used for the background of an image while it's loading
 * in.
 */
const pulse = keyframes`
  0% { background-color: ${color("black10")}; }
  50% { background-color: ${color("black5")}; }
  100% { background-color: ${color("black10")}; }
`

// TODO: Move animation out to a shared place
const pulseAnimation = () =>
  css`
    ${pulse} 2s ease-in-out infinite;
  `

const Placeholder = styled(Box)<BoxProps & BorderRadiusProps>`
  background-color: ${color("black10")};
  animation: ${pulseAnimation};
  ${borderRadiusStyle}
`

interface LazyImageProps
  extends ImageProps,
    WidthProps,
    HeightProps,
    BorderRadiusProps {
  /** Eagerly load the image instead of lazy loading it */
  preload?: boolean
  style?: CSSProperties
  // TODO: Resolve type issues
  /** The image component to render when preload is true */
  imageComponent?: any // FunctionComponent<ImageProps>
}
export const LazyImage: React.FC<LazyImageProps> = ({
  preload = false,
  imageComponent: ImageComponent = Image,
  ...props
}) => {
  const [isImageLoaded, setImageLoaded] = useState(false)
  const {
    src,
    title,
    alt,
    ariaLabel,
    width,
    height,
    borderRadius,
    style,
    ...containerProps
  } = props
  return preload ? (
    <ImageComponent {...props} />
  ) : (
    <Placeholder
      width={width}
      height={height}
      borderRadius={borderRadius}
      {...containerProps}
    >
      <InnerLazyImage
        src={src}
        title={title}
        alt={alt}
        ariaLabel={ariaLabel}
        borderRadius={borderRadius}
        style={{
          ...style,
          opacity: isImageLoaded ? "1" : "0",
        }}
        onLoad={() => setImageLoaded(true)}
      />
      <noscript>
        <ImageComponent {...props} />
      </noscript>
    </Placeholder>
  )
}
