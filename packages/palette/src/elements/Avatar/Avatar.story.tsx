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

export const WithBrokenImage = () => {
  return (
    <States<AvatarProps>
      states={[{ size: "md" }, { size: "md", lazyLoad: true }]}
    >
      <Avatar
        size="xs"
        src="https://example.com/broken.jpg"
        srcSet="https://example.com/broken.jpg 1x, https://example.com/broken.jpg 2x"
        initials="TK"
      />
    </States>
  )
}
