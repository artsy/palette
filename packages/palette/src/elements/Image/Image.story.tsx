import { storiesOf } from "@storybook/react"
import React from "react"
import { Image } from "../Image"

storiesOf("Components/Image", module)
  .add("Default", () => {
    return (
      <Image
        width={300}
        height={200}
        src="https://picsum.photos/seed/example/300/200"
      />
    )
  })
  .add("Without Dimensions", () => {
    return <Image src="https://picsum.photos/seed/example/300/200" />
  })
  .add("Lazy", () => {
    return (
      <>
        {[...new Array(100)].map((_, i) => (
          <Image
            key={i}
            lazyLoad
            width={300}
            height={200}
            src={`https://picsum.photos/seed/${i}/300/200`}
          />
        ))}
      </>
    )
  })
