import { storiesOf } from "@storybook/react"
import React from "react"
import { Text } from "../Text"
import { EntityHeader } from "./EntityHeader"

storiesOf("Components/EntityHeader", module)
  .add("Default", () => {
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
  })
  .add("Without imageUrl", () => {
    return (
      <EntityHeader
        initials="FD"
        name="Francesca DiMattio"
        meta="American, b. 1979"
        href="http://www.artsy.net/artist/francesca-dimattio"
        FollowButton={<>Follow</>}
      />
    )
  })
  .add("smallVariant", () => {
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
  })
  .add("with less info", () => {
    return (
      <EntityHeader
        imageUrl="https://picsum.photos/seed/example/110/110"
        name="Francesca DiMattio"
      />
    )
  })
  .add("with only name", () => {
    return <EntityHeader name="Francesca DiMattio" />
  })
