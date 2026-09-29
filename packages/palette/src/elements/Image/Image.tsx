import React, { useState, useRef, useEffect } from "react"
import { Box, BoxProps, splitBoxProps } from "../Box"
import styled from "styled-components"
import isPropValid from "@emotion/is-prop-valid"

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

type Mode = "Pending" | "Ready" | "Error"

export const Image: React.FC<ImageProps> = ({
  className,
  height,
  lazyLoad = false,
  onError,
  onLoad,
  placeHolderURL,
  preventRightClick = false,
  src,
  srcSet,
  style,
  width,
  ...rest
}) => {
  const [mode, setMode] = useState<Mode>("Pending")
  const imageRef = useRef<HTMLImageElement>(null)
  const source = `${src ?? ""} ${srcSet ?? ""}`
  // The source that last reported `load` or `error`
  const settledSourceRef = useRef<string | null>(null)

  // An image can settle before React attaches its listeners (during hydration),
  // in which case `load`/`error` never fire. Replay the missed event so our
  // state and the consumer's handlers stay in sync. Handlers settle once per
  // source, so a replay can't double up with a browser event for the same
  // source, whichever arrives first (a cached image reports `complete` before
  // its `load` event is dispatched).
  useEffect(() => {
    const image = imageRef.current
    if (!image?.complete || settledSourceRef.current === source) return

    let cancelled = false
    settledEventType(image).then((type) => {
      if (!cancelled) image.dispatchEvent(new Event(type))
    })

    return () => {
      cancelled = true
    }
  }, [source])

  const settle = (
    nextMode: Mode,
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    handler?: React.ReactEventHandler<HTMLImageElement>
  ) => {
    if (settledSourceRef.current === source) return
    settledSourceRef.current = source
    setMode(nextMode)
    handler?.(event)
  }

  const [boxProps, imageProps] = splitBoxProps(rest)

  // Common image props
  const commonImgProps = {
    ref: imageRef as any,
    loading: lazyLoad ? ("lazy" as const) : undefined,
    "aria-hidden": mode === "Error" || undefined,
    onLoad: (event: React.SyntheticEvent<HTMLImageElement, Event>) =>
      settle("Ready", event, onLoad),
    onError: (event: React.SyntheticEvent<HTMLImageElement, Event>) =>
      settle("Error", event, onError),
    onContextMenu: preventRightClick ? (e) => e.preventDefault() : undefined,
    src,
    srcSet,
    ...imageProps,
  }

  // Lazy-loaded images fade in once ready. Broken images are hidden entirely:
  // visually, to avoid the browser's broken-image glyph, and from assistive
  // technology, since there is no image to describe.
  const isHidden = mode === "Error" || (lazyLoad && mode !== "Ready")
  const visibilityStyle = {
    ...(lazyLoad && { transition: "opacity 0.2s ease-in-out", opacity: 1 }),
    ...(isHidden && { opacity: 0 }),
  }

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
        <Img
          as="img"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="block"
          style={{ ...visibilityStyle, ...style }}
          {...commonImgProps}
        />
      </Box>
    )
  }

  // If no placeholder and no lazy loading, render a direct img element
  return (
    <Img
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      as="img"
      className={className}
      width={width}
      height={height}
      display="block"
      style={{ ...visibilityStyle, ...style }}
      {...boxProps}
      {...commonImgProps}
    />
  )
}

/** How an already-`complete` image settled: did it load, or fail? */
const settledEventType = async (
  image: HTMLImageElement
): Promise<"load" | "error"> => {
  if (image.naturalWidth > 0) return "load"

  // A broken image has no natural width, but neither does an SVG without
  // intrinsic dimensions; decoding tells them apart. Browsers without
  // `decode` fall back to treating the image as loaded.
  try {
    await image.decode?.()
    return "load"
  } catch {
    return "error"
  }
}

// Can be removed when styled-components is updated in Force
// https://github.com/emotion-js/emotion/blob/b882bcba85132554992e4bd49e94c95939bbf810/packages/is-prop-valid/CHANGELOG.md#patch-changes
const Img = styled(Box).withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) || prop === "fetchPriority",
})``
