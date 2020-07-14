import React, { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import styled, { css } from "styled-components"
import { boxMixin, BoxProps, splitBoxProps } from "../Box"
import { Skeleton, SkeletonProps } from "../Skeleton"

enum Mode {
  Pending,
  Error,
  Loaded,
}

/** LazyImageProps */
export type LazyImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "width" | "height"
> &
  SkeletonProps & {
    preload?: boolean
    preventRightClick?: boolean
  }

const Img = styled.img<{ mode: Mode } & BoxProps>`
  transition: opacity 0.25s;
  ${boxMixin}

  ${({ mode }) =>
    ({
      [Mode.Pending]: css`
        opacity: 0;
      `,
      [Mode.Loaded]: css`
        opacity: 1;
      `,
      [Mode.Error]: css`
        opacity: 0;
      `,
    }[mode])};
`

/** LazyImage */
export const LazyImage: React.FC<LazyImageProps> = props => {
  const {
    className,
    preload = false,
    width,
    height,
    preventRightClick = false,
    onError,
    onLoad,
    onContextMenu,
    ...rest
  } = props
  const [skeletonProps, imgProps] = splitBoxProps(rest)

  const imgRef = useRef<HTMLImageElement | null>(null)

  const [containerRef, inView] = useInView({ triggerOnce: true })

  const [mode, setMode] = useState(Mode.Pending)

  const handleLoad = (
    event?: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setMode(Mode.Loaded)
    onLoad && onLoad(event)
  }

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setMode(Mode.Error)
    onError && onError(event)
  }

  const handleContextMenu = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    preventRightClick && event.preventDefault()
    onContextMenu && onContextMenu(event)
  }

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      handleLoad()
    }
  }, [handleLoad])

  if (preload) {
    return (
      <Img
        ref={imgRef as any}
        className={className}
        display="inline-block"
        width={width as any}
        height={height as any}
        mode={mode}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
    )
  }

  return (
    <Skeleton
      ref={containerRef as any}
      display="inline-block"
      className={className}
      done={mode !== Mode.Pending}
      width={width}
      height={height}
      onContextMenu={handleContextMenu}
      {...skeletonProps}
    >
      {inView && (
        <Img
          ref={imgRef as any}
          display="block"
          width="100%"
          height="100%"
          mode={mode}
          onLoad={handleLoad}
          onError={handleError}
          {...imgProps}
        />
      )}

      <noscript>
        <Img
          display="block"
          width="100%"
          height="100%"
          mode={Mode.Loaded}
          {...imgProps}
        />
      </noscript>
    </Skeleton>
  )
}
