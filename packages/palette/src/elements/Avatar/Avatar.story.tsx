import React from "react"
import { States } from "storybook-states"
import { Avatar, AvatarProps } from "./Avatar"

// export default {
//   title: "Components/Avatar",
// }

export const Sizes = () => {
  return (
    <States<AvatarProps>
      states={[
        { size: "xxs" },
        { size: "xs" },
        { size: "sm" },
        { size: "md" },
        { initials: "LONG" },
      ]}
    >
      <Avatar size="xs" initials="TK" />
    </States>
  )
}

export const WithSrc = () => {
  return (
    <States<AvatarProps>
      states={[{ size: "xxs" }, { size: "xs" }, { size: "sm" }, { size: "md" }]}
    >
      <Avatar
        size="xs"
        src="https://randomuser.me/api/portraits/lego/2.jpg"
        initials="TK"
      />
    </States>
  )
}

WithSrc.story = {
  name: "With `src`",
}
