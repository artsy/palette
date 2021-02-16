import React from "react"
import { MediumCard } from "./MediumCard"
import { SmallCard } from "./SmallCard"

export default {
  title: "Components/Cards",
}

export const Small = () => {
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
}

Small.story = {
  parameters: { chromatic: { diffThreshold: 0.2 } },
}

export const SmallWithSrcSet = () => {
  return (
    <SmallCard
      maxWidth={600}
      images={[
        {
          lazyLoad: true,
          src: "https://picsum.photos/seed/example/400/400",
          srcSet:
            "https://picsum.photos/seed/example/400/400 1x, https://picsum.photos/seed/example/800/800 2x",
        },
        {
          lazyLoad: true,
          src: "https://picsum.photos/seed/example/200/200",
          srcSet:
            "https://picsum.photos/seed/example/200/200 1x, https://picsum.photos/seed/example/400/400 2x",
        },
        {
          lazyLoad: true,
          src: "https://picsum.photos/seed/example/200/200",
          srcSet:
            "https://picsum.photos/seed/example/200/200 1x, https://picsum.photos/seed/example/400/400 2x",
        },
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
}

SmallWithSrcSet.story = {
  name: "Small with srcSet",
  parameters: { chromatic: { diffThreshold: 0.2 } },
}

export const Medium = () => {
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
}

Medium.story = {
  parameters: { chromatic: { diffThreshold: 0.2 } },
}
