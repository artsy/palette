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
import { SkeletonBox } from "../Skeleton"
import { ImageProps } from "./Image"
import { BaseImage as Image } from "./Image"
import { Box } from "../Box"

const imagePropsToOmit = omitProps.filter(
  (prop) => prop !== "width" && prop !== "height"
)

// @ts-expect-error  MIGRATE_STRICT_MODE
const InnerLazyImage = styled(CleanTag.as(LazyLoadImage))<
  ImageProps & {
    onLoad: (event: React.SyntheticEvent<HTMLImageElement>) => void
    onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void
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
export const LazyImage: React.FC<React.PropsWithChildren<LazyImageProps>> = ({
  preload = false,
  imageComponent: ImageComponent = Image,
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
  onLoad,
  placeHolderURL,
  ...rest
}) => {
  const [isImageLoaded, setImageLoaded] = useState(false)

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true)
    onLoad?.(event)
  }

  // If there is a placeholder, use a regular Box to avoid a grey background.
  const Wrapper = placeHolderURL ? Box : SkeletonBox

  const imageProps = {
    ["aria-label"]: ariaLabel,
    alt,
    borderRadius,
    height: "100%",
    omitFromProps: imagePropsToOmit,
    onError,
    onLoad: handleLoad,
    src,
    srcSet,
    style: {
      ...style,
      opacity: isImageLoaded ? "1" : "0",
      // Avoids the placeholder image showing underneath the image
      display: placeHolderURL ? "block" : style?.display,
    },
    title,
    width: "100%",
  }

  const containerProps = {
    borderRadius,
    height,
    width,
    ...(placeHolderURL
      ? {
          backgroundImage: `url(${placeHolderURL})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }
      : {}),
    ...rest,
  }

  if (preload) {
    return (
      <Wrapper {...containerProps}>
        <ImageComponent {...imageProps} />
      </Wrapper>
    )
  }

  return (
    <Wrapper {...containerProps}>
      <InnerLazyImage {...imageProps} />

      <noscript>
        <ImageComponent {...imageProps} />
      </noscript>
    </Wrapper>
  )
}
