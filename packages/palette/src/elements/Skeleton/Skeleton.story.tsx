import React from "react"
import { Box } from "../Box"
import { SkeletonBox, SkeletonText } from "./Skeleton"

export default {
  title: "Components/Skeleton",
}

export const _SkeletonBox = () => {
  return (
    <>
      <SkeletonBox m={2} width={400} height={300} />
      <SkeletonBox m={2} width={400} height={300} done />
      <SkeletonBox m={2} width={400} height={300} borderRadius="1em" />
    </>
  )
}

_SkeletonBox.story = {
  name: "SkeletonBox",
}

export const _SkeletonText = () => {
  return (
    <Box m={1}>
      <SkeletonText variant="text" borderRadius={4}>
        loading
      </SkeletonText>

      <SkeletonText variant="mediumText" borderRadius={4}>
        still waiting...
      </SkeletonText>

      <SkeletonText variant="title" borderRadius={4}>
        please wait
      </SkeletonText>

      <SkeletonText variant="largeTitle" borderRadius={4}>
        hold
      </SkeletonText>

      <SkeletonText variant="text" borderRadius={4} done>
        done
      </SkeletonText>

      <SkeletonText my={2} maxWidth={300}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ratione
        impedit commodi quo, dolorem id animi ipsa voluptas eius cum suscipit
        distinctio qui quae aliquam consequuntur officiis numquam iste deleniti.
      </SkeletonText>

      <SkeletonText variant="largeTitle" my={2} maxWidth={300}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ratione
        impedit commodi quo, dolorem id animi ipsa voluptas eius cum suscipit
        distinctio qui quae aliquam consequuntur officiis numquam iste deleniti.
      </SkeletonText>
    </Box>
  )
}

_SkeletonText.story = {
  name: "SkeletonText",
}

export const ExamplePlaceholder = () => {
  return (
    <Box display="flex" alignItems="center" px={2} py={1}>
      <SkeletonBox width={40} height={40} mr={1} />

      <Box>
        <SkeletonText variant="small" borderRadius={2}>
          Pending Artwork Title
        </SkeletonText>

        <SkeletonText variant="small" borderRadius={2}>
          Pending Artist
        </SkeletonText>
      </Box>
    </Box>
  )
}

ExamplePlaceholder.story = {
  name: "Example placeholder",
}
