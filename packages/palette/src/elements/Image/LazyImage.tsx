import React, { CSSProperties, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import styled from "styled-components"
import {
  borderRadius as borderRadiusStyle,
  BorderRadiusProps,
  HeightProps,
  WidthProps,
} from "styled-system"
import { CleanTag, omitProps } from "../CleanTag"
import { SkeletonBox, SkeletonImage } from "../Skeleton"
import { ImageProps } from "./Image"
import { BaseImage as Image } from "./Image"

const imagePropsToOmit = omitProps.filter(
  (prop) => prop !== "width" && prop !== "height"
)

// @ts-expect-error  MIGRATE_STRICT_MODE
const InnerLazyImage = styled(CleanTag.as(LazyLoadImage))<
  ImageProps & {
    onLoad: () => void
    onError?: (event: React.SyntheticEvent<any, Event>) => void
  }
>`
  width: 100%;
  height: 100%;
  ${borderRadiusStyle}
  transition: opacity 0.25s;
`
InnerLazyImage.displayName = "InnerLazyImage"

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
  const [hideBlurhash, setHideBlurhash] = useState(false)

  const {
    src,
    srcSet,
    title,
    alt,
    ["aria-label"]: ariaLabel,
    width,
    height,
    borderRadius,
    style,
    onError,
    blurhash,
    ...containerProps
  } = props

  if (preload) {
    return (
      <SkeletonImage
        width={width}
        height={height}
        borderRadius={borderRadius}
        blurhash={hideBlurhash ? undefined : blurhash}
        {...containerProps}
      >
        <ImageComponent onLoad={() => setHideBlurhash(true)} {...props} />
      </SkeletonImage>
    )
  }

  const handleLoad = () => {
    setImageLoaded(true)
    setTimeout(() => {
      setHideBlurhash(true)
    }, 500)
  }

  if (blurhash) {
    return (
      <SkeletonImage
        width={width}
        height={height}
        borderRadius={borderRadius}
        blurhash={hideBlurhash ? undefined : blurhash}
        {...containerProps}
      >
        <InnerLazyImage
          omitFromProps={imagePropsToOmit}
          onError={onError}
          src={src}
          srcSet={srcSet}
          title={title}
          alt={alt}
          aria-label={ariaLabel}
          borderRadius={borderRadius}
          width="100%"
          height="100%"
          style={{
            ...style,
            opacity: isImageLoaded ? "1" : "0",
          }}
          onLoad={handleLoad}
        />
        <noscript>
          <ImageComponent {...props} />
        </noscript>
      </SkeletonImage>
    )
  }

  return (
    <SkeletonBox
      width={width}
      height={height}
      borderRadius={borderRadius}
      {...containerProps}
    >
      <InnerLazyImage
        omitFromProps={imagePropsToOmit}
        onError={onError}
        src={src}
        srcSet={srcSet}
        title={title}
        alt={alt}
        aria-label={ariaLabel}
        borderRadius={borderRadius}
        width="100%"
        height="100%"
        style={{
          ...style,
          opacity: isImageLoaded ? "1" : "0",
        }}
        onLoad={handleLoad}
      />
      <noscript>
        <ImageComponent {...props} />
      </noscript>
    </SkeletonBox>
  )
}
