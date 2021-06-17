import React from "react"
import { Join } from "../Join"
import { Shelf } from "../Shelf"
import { SkeletonBox, SkeletonText } from "../Skeleton"
import { Spacer } from "../Spacer"
import { Placeholder, PlaceholderBox, PlaceholderText } from "./Placeholder"

export default {
  title: "Components/Placeholder",
}

const ExampleArtworkPlaceholder: React.FC<{ i: number }> = ({ i }) => {
  return (
    <>
      <PlaceholderBox width={200} height={[200, 300, 250, 275][i % 4]} />
      <Spacer mt={1} />
      <PlaceholderText variant="md">Artist Name</PlaceholderText>
      <PlaceholderText variant="md">Artwork Title</PlaceholderText>
      <PlaceholderText variant="xs">Partner</PlaceholderText>
      <PlaceholderText variant="xs">Price</PlaceholderText>
    </>
  )
}

export const Default = () => {
  return (
    <Join separator={<Spacer mt={6} />}>
      {[...new Array(12)].map((_, i) => {
        return (
          <Placeholder key={`a-${i}`} overflow="hidden">
            <Shelf>
              {[...new Array(12)].map((__, j) => {
                return <ExampleArtworkPlaceholder key={`b-${j}`} i={j} />
              })}
            </Shelf>
          </Placeholder>
        )
      })}
    </Join>
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

export const SkeletonComparison = () => {
  return (
    <Join separator={<Spacer mt={6} />}>
      {[...new Array(12)].map((_, i) => {
        return (
          <Shelf key={`a-${i}`}>
            {[...new Array(12)].map((__, j) => {
              return <ExampleArtworkSkeleton key={`b-${j}`} i={j} />
            })}
          </Shelf>
        )
      })}
    </Join>
  )
}
