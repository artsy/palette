import React from "react"
import { States } from "storybook-states"
import { Image, ImageProps } from "./Image"

export default {
  title: "Components/Image2",
}

export const Default = () => {
  return (
    <States<ImageProps>
      states={[
        {},
        { preventRightClick: true },
        { width: [300, 600], height: [200, 400] },
        { width: undefined, height: undefined },
      ]}
    >
      <Image
        width={300}
        height={200}
        src="https://picsum.photos/seed/example/300/200"
      />
    </States>
  )
}

export const WithPictureTag = () => {
  const sm = {
    src: "https://picsum.photos/seed/small/300/200",
    srcSet:
      "https://picsum.photos/seed/small/300/200 1x, https://picsum.photos/seed/small/600/400 2x",
  }

  const md = {
    src: "https://picsum.photos/seed/medium/300/200",
    srcSet:
      "https://picsum.photos/seed/medium/300/200 1x, https://picsum.photos/seed/medium/600/400 2x",
  }

  const lg = {
    src: "https://picsum.photos/seed/large/300/200",
    srcSet:
      "https://picsum.photos/seed/large/300/200 1x, https://picsum.photos/seed/large/600/400 2x",
  }

  // TODO:
  return (
    <picture>
      <source srcSet={lg.srcSet} media="(min-width: 1000px)" />
      <source srcSet={md.srcSet} media="(min-width: 800px)" />
      <source srcSet={sm.srcSet} media="(max-width: 600px)" />

      <Image src={sm.src} width={300} height={200} lazyLoad />
    </picture>
  )
}

export const ImageWSrcSet = () => {
  return (
    <Image
      width={300}
      height={200}
      src="https://picsum.photos/seed/example/300/200"
      srcSet="https://picsum.photos/seed/example/300/200 1x, https://picsum.photos/seed/example/600/400 2x"
    />
  )
}

ImageWSrcSet.story = {
  name: "Image w/srcSet",
}

export const LazyImage = () => {
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
}

LazyImage.story = {
  name: "LazyImage",
}

export const LazyImageWSrcSet = () => {
  return (
    <>
      {[...new Array(100)].map((_, i) => (
        <Image
          key={i}
          lazyLoad
          width={300}
          height={200}
          src={`https://picsum.photos/seed/${i}/300/200`}
          srcSet={`https://picsum.photos/seed/${i}/300/200 1x, https://picsum.photos/seed/${i}/600/400 2x`}
        />
      ))}
    </>
  )
}

LazyImageWSrcSet.story = {
  name: "LazyImage w/srcSet",
}
