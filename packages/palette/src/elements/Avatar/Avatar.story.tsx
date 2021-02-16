import React from "react"
import { Avatar } from "./Avatar"

const imgURL = "https://randomuser.me/api/portraits/lego/2.jpg"

export default {
  title: "Components/Avatar",
}

export const Xs = () => {
  return (
    <>
      <Avatar size="xs" src={imgURL} />
      <Avatar size="xs" initials="TK" />
    </>
  )
}

Xs.story = {
  name: "xs",
}

export const Sm = () => {
  return (
    <>
      <Avatar size="sm" src={imgURL} />
      <Avatar size="sm" initials="TK" />
    </>
  )
}

Sm.story = {
  name: "sm",
}

export const Md = () => {
  return (
    <>
      <Avatar size="md" src={imgURL} />
      <Avatar size="md" initials="TK" />
    </>
  )
}

Md.story = {
  name: "md",
}
