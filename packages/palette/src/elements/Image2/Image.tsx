import composeRefs from "@seznam/compose-react-refs"
import React, { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import styled from "styled-components"
import { Box, boxMixin, BoxProps, splitBoxProps } from "../Box"

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "width" | "height">,
    BoxProps {
  preventRightClick?: boolean
  lazyLoad?: boolean
  onError?(): void
  onLoad?(): void
}

enum Mode {
  Pending,
  Error,
  Loaded,
}

export const Image = React.forwardRef(
  (
    {
      onError,
      onLoad,
      lazyLoad = false,
      preventRightClick = false,
      onContextMenu,
      ...rest
    }: ImageProps,
    forwardedRef: React.Ref<HTMLDivElement | HTMLImageElement>
  ) => {
    const { ref: inViewRef, inView } = useInView({
      triggerOnce: true,
      skip: !lazyLoad,
    })

    const [mode, setMode] = useState(Mode.Pending)

    const ref = React.useRef<HTMLImageElement>(null)

    const [boxProps, imgProps] = splitBoxProps(rest)

    const handleError = useCallback(() => {
      setMode(Mode.Error)
      onError && onError()
    }, [onError])

    const handleLoad = useCallback(() => {
      setMode(Mode.Loaded)
      onLoad && onLoad()
    }, [onLoad])

    const handleContextMenu = (
      event: React.MouseEvent<HTMLImageElement, globalThis.MouseEvent>
    ) => {
      if (preventRightClick) {
        event.preventDefault()
      }

      onContextMenu && onContextMenu(event)
    }

    useEffect(() => {
      if (ref.current?.complete) {
        handleLoad()
      }
    }, [handleLoad, ref])

    if (lazyLoad && !inView && mode !== Mode.Loaded) {
      return (
        <Box
          ref={composeRefs(inViewRef, forwardedRef) as any}
          display="inline-block"
          verticalAlign="bottom"
          bg="black10"
          {...boxProps}
        />
      )
    }

    return (
      <Box
        display="inline-block"
        verticalAlign="bottom"
        bg="black10"
        {...boxProps}
      >
        <Img
          ref={composeRefs(ref, inViewRef, forwardedRef) as any}
          onError={handleError}
          onLoad={handleLoad}
          onContextMenu={handleContextMenu}
          opacity={mode === Mode.Loaded ? 1 : 0}
          width="100%"
          height="100%"
          {...imgProps}
        />
      </Box>
    )
  }
)

const Img = styled.img<BoxProps>`
  display: block;
  transition: opacity 250ms;
  ${boxMixin}
`

Image.displayName = "Image"
