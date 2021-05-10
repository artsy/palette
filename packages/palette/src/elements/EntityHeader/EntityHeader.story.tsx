import React from "react"
import { States } from "storybook-states"
import { useThemeConfig } from "../../Theme"
import { Button } from "../Button"
import { Clickable } from "../Clickable"
import { Text } from "../Text"
import { EntityHeader, EntityHeaderProps } from "./EntityHeader"

export default {
  title: "Components/EntityHeader",
}

const FollowButton = () => {
  return useThemeConfig({
    v2: (
      <Clickable textDecoration="underline" onClick={() => alert("Follow")}>
        <Text variant="text">Follow</Text>
      </Clickable>
    ),

    v3: (
      <Button
        size="small"
        variant="secondaryOutline"
        onClick={() => alert("Follow")}
      >
        Follow
      </Button>
    ),
  })
}

export const Default = () => {
  return (
    <States<EntityHeaderProps>
      states={[
        { name: "Francesca DiMattio" },
        { smallVariant: true, name: "Francesca DiMattio", initials: "FD" },
        { name: "Francesca DiMattio", initials: "FD" },
        {
          smallVariant: true,
          name: "Francesca DiMattio",
          imageUrl: "https://picsum.photos/seed/example/110/110",
        },
        {
          name: "Francesca DiMattio",
          imageUrl: "https://picsum.photos/seed/example/110/110",
        },
        {
          initials: "FD",
          name: "Francesca DiMattio",
          imageUrl: "https://picsum.photos/seed/example/110/110",
          meta: "American, b. 1979",
          href: "http://www.artsy.net/artist/francesca-dimattio",
        },
        {
          smallVariant: true,
          name: "Francesca DiMattio",
          imageUrl: "https://picsum.photos/seed/example/110/110",
          FollowButton: <FollowButton />,
        },
        {
          initials: "FD",
          name: "Francesca DiMattio",
          imageUrl: "https://picsum.photos/seed/example/110/110",
          meta: "American, b. 1979",
          href: "http://www.artsy.net/artist/francesca-dimattio",
          FollowButton: <FollowButton />,
        },
      ]}
    >
      {(props) => <EntityHeader {...props} maxWidth={300} />}
    </States>
  )
}
