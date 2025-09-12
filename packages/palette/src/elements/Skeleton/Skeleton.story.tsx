import React from "react"
import { Join } from "../Join"
import { Spacer } from "../Spacer"
import { Skeleton, SkeletonBox, SkeletonText } from "./Skeleton"
import { STORYBOOK_PROPS_BLOCKLIST } from "../../utils/storybookBlocklist"

export default {
  component: SkeletonBox,
  title: "Components/Skeleton",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Loading state components including SkeletonBox and SkeletonText for creating placeholder content.",
      },
    },
    controls: {
        exclude: STORYBOOK_PROPS_BLOCKLIST,
      },
  },
}

export const SkeletonBoxDefault = {
  args: {
    width: 400,
    height: 300,
  },
  render: (args) => <SkeletonBox {...args} />,
  parameters: {
    docs: {
      description: {
        story: "Basic SkeletonBox with width and height.",
      },
    },
  },
}

export const SkeletonBoxRounded = {
  args: {
    width: 400,
    height: 300,
    borderRadius: "1em",
  },
  render: (args) => <SkeletonBox {...args} />,
  parameters: {
    docs: {
      description: {
        story: "SkeletonBox with rounded corners.",
      },
    },
  },
}

export const SkeletonTextVariants = {
  args: {
    variant: "sm-display",
    children: "Loading text...",
  },
  render: () => (
    <Join separator={<Spacer y={1} />}>
      <SkeletonText variant="xs">Extra Small Text</SkeletonText>
      <SkeletonText variant="sm">Small Text</SkeletonText>
      <SkeletonText variant="md">Medium Text</SkeletonText>
      <SkeletonText variant="lg">Large Text</SkeletonText>
      <SkeletonText variant="xl">Extra Large Text</SkeletonText>
      <SkeletonText variant="xxl">Double Extra Large Text</SkeletonText>
    </Join>
  ),
  parameters: {
    docs: {
      description: {
        story: "SkeletonText showing all text variant sizes.",
      },
    },
  },
}

const ExampleArtworkSkeleton: React.FC<{ i: number }> = ({ i }) => (
  <>
    <SkeletonBox width={200} height={[200, 300, 250, 275][i % 4]} />
    <Spacer y={1} />
    <SkeletonText variant="sm-display">Artist Name</SkeletonText>
    <SkeletonText variant="sm-display">Artwork Title</SkeletonText>
    <SkeletonText variant="xs">Partner</SkeletonText>
    <SkeletonText variant="xs">Price</SkeletonText>
  </>
)

export const ArtworkExample = {
  args: {},
  render: () => (
    <Skeleton>
      <ExampleArtworkSkeleton i={0} />
    </Skeleton>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of a skeleton for an artwork card layout.",
      },
    },
  },
}
