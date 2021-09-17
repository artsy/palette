import React from "react"
import { States } from "storybook-states"
import { Image } from "../Image"

export default {
  title: "Components/Image",
}

export const Default = () => {
  return (
    <States states={[{}, { width: null, height: null }]}>
      <Image
        id="example"
        className="example"
        width="300px"
        height="200px"
        src="https://picsum.photos/seed/example/300/200"
      />
    </States>
  )
}

Default.story = {
  name: "Image",
}

export const ImageWSrcSet = () => {
  return (
    <Image
      width="300px"
      height="200px"
      src="https://picsum.photos/seed/example/300/200"
      srcSet="https://picsum.photos/seed/example/300/200 1x, https://picsum.photos/seed/example/600/400 2x"
    />
  )
}

ImageWSrcSet.story = {
  name: "Image + srcSet",
}

export const ImageLazyLoad = () => {
  return (
    <>
      {Array.from(Array(100)).map((_, i) => (
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
}

ImageLazyLoad.story = {
  name: "Image + lazyLoad",
}

export const ImageLazyLoadSrcSet = () => {
  return (
    <>
      {Array.from(Array(100)).map((_, i) => (
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
}

ImageLazyLoadSrcSet.story = {
  name: "Image + lazyLoad + srcSet",
}
