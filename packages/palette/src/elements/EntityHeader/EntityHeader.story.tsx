import React from "react"
import { States } from "storybook-states"
import { EntityHeader, EntityHeaderProps } from "./EntityHeader"

export default {
  title: "Components/EntityHeader",
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
      ]}
    >
      {(props) => <EntityHeader {...props} />}
    </States>
  )
}
