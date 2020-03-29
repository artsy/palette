import React, { useState } from "react"
import { LazyImage } from "../Image/LazyImage"
import { AvatarProps, BaseAvatar, sizeValue } from "./Avatar.shared"

interface AvatarWebProps extends AvatarProps {
  renderFallback?: (props: { diameter: string }) => JSX.Element
  lazyLoad?: boolean
}

/** An circular Avatar component containing an image or initials */
export const Avatar = ({
  src,
  initials,
  lazyLoad = false,
  size = "md",
  renderFallback,
  onError,
}: AvatarWebProps) => {
  const { diameter } = sizeValue(size)
  const [useFallback, setUseFallback] = useState(false)

  return (
    <BaseAvatar
      src={src}
      initials={initials}
      size={size}
      renderAvatar={() =>
        renderFallback && useFallback ? (
          renderFallback({ diameter })
        ) : (
          <LazyImage
            onError={e => {
              onError ? onError(e) : setUseFallback(true)
            }}
            preload={!lazyLoad}
            width={diameter}
            height={diameter}
            borderRadius={diameter}
            src={src}
          />
        )
      }
    />
  )
}
