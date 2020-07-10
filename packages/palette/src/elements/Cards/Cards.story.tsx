import { storiesOf } from "@storybook/react"
import React from "react"
import { LargeCard } from "./LargeCard"
import { MediumCard } from "./MediumCard"
import { SmallCard } from "./SmallCard"

storiesOf("Components/Cards", module)
  .add("Small", () => {
    return (
      <SmallCard
        images={[
          "https://picsum.photos/seed/example/400/400",
          "https://picsum.photos/seed/example/200/200",
          "https://picsum.photos/seed/example/200/200",
        ]}
        title="Check this out"
        subtitle="It's good"
        tag={{
          color: "white100",
          borderColor: "purple100",
          text: "wowza!",
          textColor: "black100",
        }}
      />
    )
  })
  .add("Medium", () => {
    return (
      <MediumCard
        image="https://picsum.photos/seed/example/400/300"
        title="Check this out"
        subtitle="It's good"
        tag={{
          color: "white100",
          borderColor: "purple100",
          text: "wowza!",
          textColor: "black100",
        }}
      />
    )
  })
  .add("Large", () => {
    return (
      <LargeCard
        image="https://picsum.photos/seed/example/400/300"
        title="Check this out"
        subtitle="It's good"
        tag={{
          color: "white100",
          borderColor: "purple100",
          text: "wowza!",
          textColor: "black100",
        }}
      />
    )
  })
