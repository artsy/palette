import React from "react"
import { States } from "storybook-states"
import { Card, CardProps } from "./Card"
import { TriptychCard, TriptychCardProps } from "./TriptychCard"

export default {
  title: "Components/Cards",
}

export const Single = () => {
  return (
    <States<Partial<CardProps>>
      states={[
        {},
        { title: "A Much Longer Exhibition Title With Possible Line Break" },
        { maxWidth: 400 },
        { image: undefined },
        { title: undefined, subtitle: undefined, status: undefined },
      ]}
    >
      <Card
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

Single.story = {
  parameters: { chromatic: { diffThreshold: 0.2 } },
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

export const Triptych = () => {
  return (
    <States<Partial<TriptychCardProps>>
      states={[
        {},
        { images: [LARGE_SQUARE_IMG, SMALL_SQUARE_IMG] },
        { images: [LARGE_SQUARE_IMG] },
        { maxWidth: "100%" },
        { title: undefined, subtitle: undefined, status: undefined },
      ]}
    >
      <TriptychCard
        maxWidth={600}
        images={[LARGE_SQUARE_IMG, SMALL_SQUARE_IMG, SMALL_SQUARE_IMG]}
        title="Example Exhibition Title"
        subtitle="Partner Gallery"
        status="4 days left"
      />
    </States>
  )
}

Triptych.story = {
  parameters: { chromatic: { diffThreshold: 0.2 } },
}
