import { storiesOf } from "@storybook/react"
import React from "react"
import { Skeleton } from "./Skeleton"

storiesOf("Components/Skeleton", module).add("Basic", () => {
  return (
    <>
      <Skeleton m={2} width={400} height={300} />
      <Skeleton m={2} width={400} height={300} done />
      <Skeleton m={2} width={400} height={300} borderRadius="1em" />
    </>
  )
})
