import React from "react"
import { LazyImage } from "../Image/LazyImage"
import { AvatarProps, BaseAvatar, sizeValue } from "./Avatar.shared"

interface AvatarWebProps extends AvatarProps {
  lazyLoad?: boolean
}

/** An circular Avatar component containing an image or initials */
export const Avatar = ({
  src,
  initials,
  lazyLoad = false,
  size = "md",
}: AvatarWebProps) => {
  const { diameter } = sizeValue(size)

  return (
    <BaseAvatar
      src={src}
      initials={initials}
      size={size}
      renderAvatar={() => (
        <LazyImage
          preload={!lazyLoad}
          width={diameter}
          height={diameter}
          borderRadius={diameter}
          src={src}
        />
      )}
    />
  )
}
