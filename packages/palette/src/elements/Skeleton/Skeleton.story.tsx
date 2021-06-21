import React from "react"
import { States } from "storybook-states"
import { Join } from "../Join"
import { Shelf } from "../Shelf"
import { Spacer } from "../Spacer"
import {
  Skeleton,
  SkeletonBox,
  SkeletonBoxProps,
  SkeletonText,
  SkeletonTextProps,
} from "./Skeleton"

export default {
  title: "Components/Skeleton",
}

export const _SkeletonBox = () => {
  return (
    <States<SkeletonBoxProps> states={[{}, { borderRadius: "1em" }]}>
      <SkeletonBox width={400} height={300} />
    </States>
  )
}

export const _SkeletonText = () => {
  return (
    <States<SkeletonTextProps>
      states={[
        { variant: "xs" },
        { variant: "sm" },
        { variant: "md" },
        { variant: "lg" },
        { variant: "xl" },
        { variant: "xxl" },
        {
          variant: "md",
          maxWidth: 300,
          // @ts-ignore
          children:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ratione impedit commodi quo, dolorem id animi ipsa voluptas eius cum suscipit distinctio qui quae aliquam consequuntur officiis numquam iste deleniti.",
        },
        {
          variant: "xl",
          maxWidth: 300,
          // @ts-ignore
          children:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ratione impedit commodi quo, dolorem id animi ipsa voluptas eius cum suscipit distinctio qui quae aliquam consequuntur officiis numquam iste deleniti.",
        },
      ]}
    >
      <SkeletonText variant="md">loading</SkeletonText>
    </States>
  )
}

const ExampleArtworkSkeleton: React.FC<{ i: number }> = ({ i }) => {
  return (
    <>
      <SkeletonBox width={200} height={[200, 300, 250, 275][i % 4]} />
      <Spacer mt={1} />
      <SkeletonText variant="md">Artist Name</SkeletonText>
      <SkeletonText variant="md">Artwork Title</SkeletonText>
      <SkeletonText variant="xs">Partner</SkeletonText>
      <SkeletonText variant="xs">Price</SkeletonText>
    </>
  )
}

export const _ExampleArtworkSkeleton = () => {
  return (
    <Skeleton>
      <ExampleArtworkSkeleton i={0} />
    </Skeleton>
  )
}

export const StressTest = () => {
  return (
    <Join separator={<Spacer mt={6} />}>
      {[...new Array(12)].map((_, i) => {
        return (
          <Skeleton key={`a-${i}`} overflow="hidden">
            <Shelf>
              {[...new Array(12)].map((__, j) => {
                return <ExampleArtworkSkeleton key={`b-${j}`} i={j} />
              })}
            </Shelf>
          </Skeleton>
        )
      })}
    </Join>
  )
}
