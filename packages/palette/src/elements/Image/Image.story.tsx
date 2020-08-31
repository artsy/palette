import { storiesOf } from "@storybook/react"
import React from "react"
import { Image } from "../Image"

storiesOf("Components/Image", module)
  .add("Image", () => {
    return (
      <Image
        width="300px"
        height="200px"
        src="https://picsum.photos/seed/example/300/200"
      />
    )
  })
  .add("Image w/srcSet", () => {
    return (
      <Image
        width="300px"
        height="200px"
        src="https://picsum.photos/seed/example/300/200"
        srcSet="https://picsum.photos/seed/example/300/200 1x, https://picsum.photos/seed/example/600/400 2x"
      />
    )
  })
  .add("LazyImage", () => {
    return (
      <>
        {[...new Array(100)].map((_, i) => (
          <Image
            key={i}
            lazyLoad
            width="300px"
            height="200px"
            src={`https://picsum.photos/seed/${i}/300/200`}
          />
        ))}
      </>
    )
  })
  .add("LazyImage w/srcSet", () => {
    return (
      <>
        {[...new Array(100)].map((_, i) => (
          <Image
            key={i}
            lazyLoad
            width="300px"
            height="200px"
            src={`https://picsum.photos/seed/${i}/300/200`}
            srcSet={`https://picsum.photos/seed/${i}/300/200 1x, https://picsum.photos/seed/${i}/600/400 2x`}
          />
        ))}
      </>
    )
  })
