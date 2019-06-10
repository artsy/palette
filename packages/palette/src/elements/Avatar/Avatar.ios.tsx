import React, { FunctionComponent } from "react"
import { Image } from "react-native"
import { AvatarProps, BaseAvatar } from "./Avatar.shared"

/** Avatar */
export const Avatar: FunctionComponent<AvatarProps> = ({ ...props }) => {
  return (
    <BaseAvatar
      renderAvatar={() => (
        <Image
          style={{ width: props.width, height: props.height }}
          source={{
            uri: props.src,
          }}
        />
      )}
      {...props}
    />
  )
}
