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

  return (
    <Box
      className={className} // When using styled-components, pass the className prop to the Box component
      position="relative"
      width={width}
      height={height}
      {...boxProps}
      bg={placeHolderURL ? undefined : "black10"}
      style={{
        ...style,
        ...(placeHolderURL && {
          backgroundImage: `url(${placeHolderURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }),
      }}
    >
      <Box
        as="img"
        ref={imageRef as any}
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        display="block"
        loading={lazyLoad ? "lazy" : undefined}
        onLoad={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
          setMode("Ready")
          onLoad?.(event)
        }}
        onContextMenu={
          preventRightClick ? (e) => e.preventDefault() : undefined
        }
        style={{
          objectFit: "cover",
          ...(lazyLoad && {
            transition: "opacity 0.2s ease-in-out",
            opacity: mode === "Ready" ? 1 : 0,
          }),
        }}
        {...imageProps}
      />
    </Box>
  )
}
