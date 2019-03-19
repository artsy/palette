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

interface ImageProps extends BorderRadiusProps {
  src: string
  alt?: string
  title?: string
  imageStyles?: string
}

const Image = styled.img<ImageProps>`
  width: 100%;
  ${borderRadiusStyle}
  ${props => props.imageStyles};
`
Image.displayName = "Image"

const InnerLazyImage = styled(LazyLoadImage)<ImageProps>`
  width: 100%;
  ${borderRadiusStyle}
  ${props => props.imageStyles};
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
  preload?: boolean
  placeholderProps?: any
  style?: CSSProperties
}
export const LazyImage: React.FC<LazyImageProps> = ({
  preload,
  placeholderProps,
  width,
  height,
  borderRadius,
  ...props
}) => {
  const [isImageLoaded, setImageLoaded] = useState(false)
  return (
    <Placeholder width={width} height={height} borderRadius={borderRadius}>
      {preload ? (
        <Image borderRadius={borderRadius} {...props} />
      ) : (
        <InnerLazyImage
          {...props}
          borderRadius={borderRadius}
          style={{
            ...props.style,
            opacity: isImageLoaded ? "1" : "0",
          }}
          onLoad={() => setImageLoaded(true)}
        />
      )}
      <noscript>
        <Image borderRadius={borderRadius} {...props} />
      </noscript>
    </Placeholder>
  )
}
