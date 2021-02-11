import React from "react"
import { Text } from "../Text"
import { EntityHeader } from "./EntityHeader"

export default {
  title: "Components/EntityHeader",
}

export const Default = () => {
  return (
    <EntityHeader
      imageUrl="https://picsum.photos/seed/example/110/110"
      initials="FD"
      name="Francesca DiMattio"
      meta="American, b. 1979"
      href="http://www.artsy.net/artist/francesca-dimattio"
      FollowButton={<>Follow</>}
    />
  )
}

export const WithoutImageUrl = () => {
  return (
    <EntityHeader
      initials="FD"
      name="Francesca DiMattio"
      meta="American, b. 1979"
      href="http://www.artsy.net/artist/francesca-dimattio"
      FollowButton={<>Follow</>}
    />
  )
}

WithoutImageUrl.story = {
  name: "Without imageUrl",
}

export const SmallVariant = () => {
  return (
    <EntityHeader
      smallVariant
      initials="FD"
      name="Francesca DiMattio"
      imageUrl="https://picsum.photos/seed/example/110/110"
      href="http://www.artsy.net/artist/francesca-dimattio"
      FollowButton={
        <Text style={{ textDecoration: "underline" }}>Following</Text>
      }
    />
  )
}

SmallVariant.story = {
  name: "smallVariant",
}

export const WithLessInfo = () => {
  return (
    <EntityHeader
      imageUrl="https://picsum.photos/seed/example/110/110"
      name="Francesca DiMattio"
    />
  )
}

WithLessInfo.story = {
  name: "with less info",
}

export const WithOnlyName = () => {
  return <EntityHeader name="Francesca DiMattio" />
}

WithOnlyName.story = {
  name: "with only name",
}
