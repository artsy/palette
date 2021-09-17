import React, { CSSProperties, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import styled from "styled-components"
import {
  borderRadius as borderRadiusStyle,
  BorderRadiusProps,
} from "styled-system"
import { SkeletonBox } from "../Skeleton"
import { ImageProps } from "./Image"
import { BaseImage as Image } from "./Image"

const InnerLazyImage = styled(LazyLoadImage)<
  ImageProps & {
    onLoad: () => void
    onError?: (event: React.SyntheticEvent<any, Event>) => void
  }
>`
  width: 100%;
  height: 100%;
  transition: opacity 0.25s;
  ${borderRadiusStyle}
`
InnerLazyImage.displayName = "InnerLazyImage"

interface LazyImageProps extends ImageProps, BorderRadiusProps {
  /** Eagerly load the image instead of lazy loading it */
  preload?: boolean
  style?: CSSProperties
  // TODO: Resolve type issues
  /** The image component to render when preload is true */
  imageComponent?: any // FunctionComponent<ImageProps>
  onContextMenu?: (e: any) => void
  onError?: (event: React.SyntheticEvent<any, Event>) => void
}

/** LazyImage */
export const LazyImage: React.FC<LazyImageProps> = ({
  preload = false,
  imageComponent: ImageComponent = Image,
  ...props
}) => {
  const [isImageLoaded, setImageLoaded] = useState(false)

  const {
    ["aria-label"]: ariaLabel,
    alt,
    borderRadius,
    height,
    onError,
    src,
    srcSet,
    style,
    title,
    width,
    ...containerProps
  } = props

  if (preload) {
    return <ImageComponent {...props} />
  }

  const handleLoad = () => setImageLoaded(true)

  return (
    <SkeletonBox
      borderRadius={borderRadius}
      style={{ width: width ?? undefined, height: height ?? undefined }}
      {...containerProps}
    >
      <InnerLazyImage
        alt={alt}
        aria-label={ariaLabel}
        borderRadius={borderRadius}
        height="100%"
        onError={onError}
        onLoad={handleLoad}
        src={src}
        srcSet={srcSet}
        style={{ ...style, opacity: isImageLoaded ? "1" : "0" }}
        title={title}
        width="100%"
      />

      <noscript>
        <ImageComponent {...props} />
      </noscript>
    </SkeletonBox>
  )
}
