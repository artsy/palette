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

const imageProps = {
  src: "https://picsum.photos/seed/example/110/110",
  srcSet:
    "https://picsum.photos/seed/example/110/110 1x, https://picsum.photos/seed/example/220/220 2x",
  lazyLoad: true,
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
          image: imageProps,
        },
        {
          name: "Francesca DiMattio",
          image: imageProps,
        },
        {
          initials: "FD",
          name: "Francesca DiMattio",
          image: imageProps,
          meta: "American, b. 1979",
          href: "http://www.artsy.net/artist/francesca-dimattio",
        },
        {
          smallVariant: true,
          name: "Francesca DiMattio",
          image: imageProps,
          FollowButton: <FollowButton />,
        },
        {
          initials: "FD",
          name: "Francesca DiMattio",
          image: imageProps,
          meta: "American, b. 1979",
          href: "http://www.artsy.net/artist/francesca-dimattio",
          FollowButton: <FollowButton />,
        },
        {
          initials: "FLD",
          name: "Francesca Longer DiMattio",
          image: imageProps,
          meta: "American, b. Founded 1979",
          href: "http://www.artsy.net/artist/francesca-dimattio",
          FollowButton: <FollowButton />,
        },
        {
          initials: "FLD",
          name: "Francesca Much Longer DiMattio",
          image: imageProps,
          meta: "American, b. Founded 1979",
          href: "http://www.artsy.net/artist/francesca-dimattio",
          FollowButton: <FollowButton />,
          labels: [{ children: "Black Owned" }],
        },
        {
          initials: "FLD",
          name: "Francesca Much Longer DiMattio",
          image: imageProps,
          meta: "American, b. Founded 1979",
          href: "http://www.artsy.net/artist/francesca-dimattio",
          FollowButton: <FollowButton />,
          labels: [
            { children: "Black Owned" },
            { children: "Women Owned", variant: "brand" },
          ],
        },
      ]}
    >
      {(props) => <EntityHeader {...props} maxWidth={350} />}
    </States>
  )
}
