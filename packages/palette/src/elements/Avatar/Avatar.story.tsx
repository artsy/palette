import React from "react"
import { States } from "storybook-states"
import { Avatar, AvatarProps } from "./Avatar"

export default {
  title: "Components/Avatar",
}

export const Sizes = () => {
  return (
    <States<AvatarProps>
      states={[
        { size: "xxs" },
        { size: "xs" },
        { size: "sm" },
        { size: "md" },
        { initials: "LONGER", size: "md" },
        { initials: "LONGER", size: "sm" },
        { initials: "LONGER", size: "xs" },
        { initials: "LONGER", size: "xxs" },
      ]}
    >
      <Avatar size="xs" initials="TK" />
    </States>
  )
}

export const WithImage = () => {
  return (
    <States<AvatarProps>
      states={[{ size: "xxs" }, { size: "xs" }, { size: "sm" }, { size: "md" }]}
    >
      <Avatar
        size="xs"
        src="https://picsum.photos/seed/example/110/110"
        srcSet="https://picsum.photos/seed/example/110/110 1x, https://picsum.photos/seed/example/220/220 2x"
        lazyLoad
        initials="TK"
      />
    </States>
  )
}
