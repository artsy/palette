import { storiesOf } from "@storybook/react"
import React from "react"
import { Box } from "../Box"
import { ResponsiveImage } from "./ResponsiveImage"

storiesOf("Components/ResponsiveImage", module)
  .add("Basic", () => (
    <Box border="1px dotted" borderColor="purple100" maxWidth={600}>
      <ResponsiveImage
        my={2}
        aspectWidth={900}
        aspectHeight={600}
        maxWidth={900}
        maxHeight={600}
        bg="purple100"
        src="https://picsum.photos/seed/example/900/600"
        srcSet="https://picsum.photos/seed/example/900/600 1x, https://picsum.photos/seed/example/1800/1200 2x"
        alt="An example alt"
        title="An example title"
      />
      <ResponsiveImage
        my={2}
        aspectWidth={400}
        aspectHeight={500}
        maxWidth={400}
        maxHeight={500}
        bg="purple100"
        src="https://picsum.photos/seed/another/400/500"
        srcSet="https://picsum.photos/seed/another/400/500 1x, https://picsum.photos/seed/another/800/1000 2x"
        alt="An example alt"
        title="An example title"
      />
    </Box>
  ))
  .add("Lazy", () => (
    <Box border="1px dotted" borderColor="purple100" width={200}>
      {[...new Array(100)].map((_, i) => (
        <ResponsiveImage
          key={i}
          lazyLoad
          aspectWidth={400}
          aspectHeight={300}
          maxWidth={400}
          maxHeight={300}
          src={`https://picsum.photos/seed/${i}/400/300`}
        />
      ))}
    </Box>
  ))
  .add("Error", () => {
    return (
      <ResponsiveImage
        my={2}
        mx="auto"
        aspectWidth={900}
        aspectHeight={600}
        maxWidth={900}
        maxHeight={600}
        bg="purple100"
        src="nope"
        alt="An example alt"
        title="An example title"
      />
    )
  })
