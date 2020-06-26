import { storiesOf } from "@storybook/react"
import React from "react"
import { LargeCard } from "./LargeCard"
import { MediumCard } from "./MediumCard"
import { SmallCard } from "./SmallCard"

storiesOf("Components/Avatar", module)
  .add("Small", () => {
    return (
      <SmallCard
        images={[
          "https://www.fillmurray.com/400/400",
          "https://www.fillmurray.com/200/200",
          "https://www.fillmurray.com/200/200",
        ]}
        title="Check this out"
        subtitle="It's good"
        tag={{
          color: "white",
          borderColor: "magenta",
          text: "wowza!",
          textColor: "black",
        }}
      />
    )
  })
  .add("Medium", () => {
    return (
      <MediumCard
        image="https://www.fillmurray.com/400/300"
        title="Check this out"
        subtitle="It's good"
        tag={{
          color: "white",
          borderColor: "magenta",
          text: "wowza!",
          textColor: "black",
        }}
      />
    )
  })
  .add("Large", () => {
    return (
      <LargeCard
        image="https://www.fillmurray.com/400/300"
        title="Check this out"
        subtitle="It's good"
        tag={{
          color: "white",
          borderColor: "magenta",
          text: "wowza!",
          textColor: "black",
        }}
      />
    )
  })
