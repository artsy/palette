import { action } from "@storybook/addon-actions"
import { storiesOf } from "@storybook/react"
import React from "react"
import styled from "styled-components"
import { LazyImage, LazyImageProps } from "./LazyImage"

const StyledLazyImage = styled(LazyImage)`
  border: 2px solid red;
`

const EXAMPLE_PROPS: LazyImageProps = {
  src: "https://picsum.photos/seed/example/900/600",
  srcSet:
    "https://picsum.photos/seed/example/900/600 1x, https://picsum.photos/seed/example/1800/1200 2x",
  width: 900,
  height: 600,
  my: 2,
  mx: "auto",
  alt: "An example alt",
  title: "An example title",
  preventRightClick: true,
  onContextMenu: action("onContextMenu"),
  onLoad: action("onLoad"),
}

storiesOf("Components/LazyImage", module)
  .add("Basic", () => <LazyImage {...EXAMPLE_PROPS} />)
  .add("Preloaded", () => <LazyImage preload {...EXAMPLE_PROPS} />)
  .add("Styled", () => (
    <StyledLazyImage borderRadius="1em" overflow="hidden" {...EXAMPLE_PROPS} />
  ))
  .add("Example", () => (
    <>
      {[...new Array(100)].map((_, i) => (
        <LazyImage
          display="block"
          key={i}
          src={`https://picsum.photos/seed/${i}/400/300`}
          width={400}
          height={300}
        />
      ))}
    </>
  ))
