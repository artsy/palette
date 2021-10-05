import React from "react"
import { States } from "storybook-states"
import { MediumCard, MediumCardProps } from "./MediumCard/MediumCard"
import { SmallCard, SmallCardProps } from "./SmallCard/SmallCard"

export default {
  title: "Components/Cards",
}

const LARGE_SQUARE_IMG = {
  lazyLoad: true,
  src: "https://picsum.photos/seed/example/400/400",
  srcSet:
    "https://picsum.photos/seed/example/400/400 1x, https://picsum.photos/seed/example/800/800 2x",
}

const SMALL_SQUARE_IMG = {
  lazyLoad: true,
  src: "https://picsum.photos/seed/example/200/200",
  srcSet:
    "https://picsum.photos/seed/example/200/200 1x, https://picsum.photos/seed/example/400/400 2x",
}

export const Small = () => {
  return (
    <States<Partial<SmallCardProps>>
      states={[
        {},
        { images: [LARGE_SQUARE_IMG, SMALL_SQUARE_IMG] },
        { images: [LARGE_SQUARE_IMG] },
        { maxWidth: "100%" },
        { title: undefined, subtitle: undefined, status: undefined },
      ]}
    >
      <SmallCard
        maxWidth={600}
        images={[LARGE_SQUARE_IMG, SMALL_SQUARE_IMG, SMALL_SQUARE_IMG]}
        title="Example Exhibition Title"
        subtitle="Partner Gallery"
        status="4 days left"
      />
    </States>
  )
}

Small.story = {
  parameters: { chromatic: { diffThreshold: 0.2 } },
}

export const Medium = () => {
  return (
    <States<Partial<MediumCardProps>>
      states={[
        {},
        { title: "A Much Longer Exhibition Title With Possible Line Break" },
        { maxWidth: 400 },
        { image: undefined },
        { title: undefined, subtitle: undefined, status: undefined },
      ]}
    >
      <MediumCard
        title="Example Exhibition Title"
        subtitle="Partner Gallery"
        status="4 days left"
        image={{
          lazyLoad: true,
          src: "https://picsum.photos/seed/example/400/300",
          srcSet:
            "https://picsum.photos/seed/example/400/300 1x, https://picsum.photos/seed/example/800/600 2x",
        }}
      />
    </States>
  )
}

Medium.story = {
  parameters: { chromatic: { diffThreshold: 0.2 } },
}
