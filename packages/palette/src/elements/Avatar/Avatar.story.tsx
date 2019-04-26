import { storiesOf } from "@storybook/react"
import React from "react"
import { Avatar } from "./Avatar"

const imgURL = "https://randomuser.me/api/portraits/lego/2.jpg"

storiesOf("Components/Avatar", module)
  .add("xs", () => {
    return (
      <>
        <Avatar size="xs" src={imgURL} />
        <Avatar size="xs" initials="TK" />
      </>
    )
  })
  .add("sm", () => {
    return (
      <>
        <Avatar size="sm" src={imgURL} />
        <Avatar size="sm" initials="TK" />
      </>
    )
  })
  .add("md", () => {
    return (
      <>
        <Avatar size="md" src={imgURL} />
        <Avatar size="md" initials="TK" />
      </>
    )
  })
