import React, { useState, useRef, useEffect } from "react"
import { Box, BoxProps, splitBoxProps } from "../Box"

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "width" | "height">,
    BoxProps {
  /** Flag for if image should be lazy loaded */
  lazyLoad?: boolean
  /** Flag indicating that right clicks should be prevented */
  preventRightClick?: boolean
  /** Currently, this is used by clients for BlurHash data,
      decoded and represented as a data URL */
  placeHolderURL?: string
}

export const Image: React.FC<ImageProps> = ({
  className,
  height,
  lazyLoad = false,
  onLoad,
  placeHolderURL,
  preventRightClick = false,
  style,
  width,
  ...rest
}) => {
  const [mode, setMode] = useState<"Pending" | "Ready">("Pending")
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imageRef.current?.complete) {
      setMode("Ready")
    }
  }, [])

  const [boxProps, imageProps] = splitBoxProps(rest)

  // Common image props
  const commonImgProps = {
    ref: imageRef as any,
    loading: lazyLoad ? ("lazy" as const) : undefined,
    onLoad: (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setMode("Ready")
      onLoad?.(event)
    },
    onContextMenu: preventRightClick ? (e) => e.preventDefault() : undefined,
    ...imageProps,
  }

  // Common lazy loading style
  const lazyLoadStyle = lazyLoad
    ? {
        transition: "opacity 0.2s ease-in-out",
        opacity: mode === "Ready" ? 1 : 0,
      }
    : {}

  // If there's a placeholder URL or lazy loading is enabled, use a wrapper container
  if (placeHolderURL || lazyLoad) {
    return (
      <Box
        className={className}
        position="relative"
        width={width || "100%"}
        height={height || "100%"}
        bg={lazyLoad && !placeHolderURL ? "mono10" : undefined}
        {...boxProps}
        style={{
          ...(placeHolderURL && {
            backgroundImage: `url(${placeHolderURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }),
        }}
      >
        <Box
          as="img"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="block"
          style={{ ...lazyLoadStyle, ...style }}
          {...commonImgProps}
        />
      </Box>
    )
  }

  // If no placeholder and no lazy loading, render a direct img element
  return (
    <Box
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      as="img"
      className={className}
      width={width}
      height={height}
      display="block"
      style={style}
      {...boxProps}
      {...commonImgProps}
    />
  )
}
