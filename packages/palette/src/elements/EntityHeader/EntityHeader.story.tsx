import React from "react"
import { States } from "storybook-states"
import { Button } from "../Button"
import { EntityHeader, EntityHeaderProps } from "./EntityHeader"
import { STORYBOOK_PROPS_BLACKLIST } from "../../utils/storybookBlacklist"

export default {
  component: EntityHeader,
  title: "Components/EntityHeader",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A header component for displaying entity information including name, image, metadata, and action buttons.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLACKLIST,
      },
  },
}

const FollowButton = () => {
  return (
    <Button
      size="small"
      variant="secondaryBlack"
      onClick={() => alert("Follow")}
    >
      Follow
    </Button>
  )
}

const imageProps = {
  src: "https://picsum.photos/seed/example/110/110",
  srcSet:
    "https://picsum.photos/seed/example/110/110 1x, https://picsum.photos/seed/example/220/220 2x",
  lazyLoad: true,
}

export const Default = {
  args: {
    name: "Francesca DiMattio",
    initials: "FD",
    image: imageProps,
    meta: "American, b. 1979",
    href: "http://www.artsy.net/artist/francesca-dimattio",
    FollowButton: <FollowButton />,
    maxWidth: 350,
  },
}

export const WithStates = {
  render: () => {
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
  },
}
