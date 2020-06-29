import React, { FunctionComponent } from "react"
import { Image } from "react-native"
import { AvatarProps, BaseAvatar } from "./Avatar.shared"

const IOSDiameters = {
  xs: 45,
  sm: 70,
  md: 100,
}
/** Avatar */
export const Avatar: FunctionComponent<AvatarProps> = ({ ...props }) => {
  const diameter = IOSDiameters[props.size || "md"]

  return (
    <BaseAvatar
      size={props.size}
      renderAvatar={() => (
        <Image
          resizeMode="stretch"
          style={{
            width: diameter,
            height: diameter,
            borderRadius: diameter / 2,
          }}
          source={{
            uri: props.src,
          }}
        />
      )}
      {...props}
    />
  )
}
