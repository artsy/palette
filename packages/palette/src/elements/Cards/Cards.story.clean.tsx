import React from "react"
import { Card } from "./Card"
import { TriptychCard } from "./TriptychCard"

export default {
  title: "Components/Cards",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Card components display information in a structured card format with optional images, titles, subtitles, and status information. Includes both single cards and triptych layouts.",
      },
    },
    controls: {
      include: [
        "title",
        "subtitle",
        "status",
        "image",
        "maxWidth",
        "href",
        "onClick",
      ],
    },
  },
}

export const Default = {
  args: {
    title: "Example Exhibition Title",
    subtitle: "Partner Gallery",
    status: "4 days left",
    image: {
      lazyLoad: true,
      src: "https://picsum.photos/seed/example/400/300",
      srcSet:
        "https://picsum.photos/seed/example/400/300 1x, https://picsum.photos/seed/example/800/600 2x",
    },
  },
}

export const LongTitle = {
  args: {
    title: "A Much Longer Exhibition Title With Possible Line Break",
    subtitle: "Partner Gallery",
    status: "4 days left",
    image: {
      lazyLoad: true,
      src: "https://picsum.photos/seed/example/400/300",
      srcSet:
        "https://picsum.photos/seed/example/400/300 1x, https://picsum.photos/seed/example/800/600 2x",
    },
  },
}

export const WithMaxWidth = {
  args: {
    title: "Example Exhibition Title",
    subtitle: "Partner Gallery",
    status: "4 days left",
    maxWidth: 400,
    image: {
      lazyLoad: true,
      src: "https://picsum.photos/seed/example/400/300",
      srcSet:
        "https://picsum.photos/seed/example/400/300 1x, https://picsum.photos/seed/example/800/600 2x",
    },
  },
}

export const NoImage = {
  args: {
    title: "Example Exhibition Title",
    subtitle: "Partner Gallery",
    status: "4 days left",
  },
}

export const MinimalCard = {
  args: {},
}

export const TriptychCardExample = {
  render: () => (
    <TriptychCard
      title="Example Triptych"
      subtitle="Multiple Artworks"
      status="Available"
      images={[
        {
          lazyLoad: true,
          src: "https://picsum.photos/seed/example/400/400",
          srcSet:
            "https://picsum.photos/seed/example/400/400 1x, https://picsum.photos/seed/example/800/800 2x",
        },
        {
          lazyLoad: true,
          src: "https://picsum.photos/seed/example2/200/200",
          srcSet:
            "https://picsum.photos/seed/example2/200/200 1x, https://picsum.photos/seed/example2/400/400 2x",
        },
        {
          lazyLoad: true,
          src: "https://picsum.photos/seed/example3/200/200",
          srcSet:
            "https://picsum.photos/seed/example3/200/200 1x, https://picsum.photos/seed/example3/400/400 2x",
        },
      ]}
    />
  ),
}
