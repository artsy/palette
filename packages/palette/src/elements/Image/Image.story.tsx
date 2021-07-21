import React from "react"
import { Image } from "../Image"

export default {
  title: "Components/Image",
}

export const _Image = () => {
  return (
    <Image
      id="example"
      className="example"
      width="300px"
      height="200px"
      src="https://picsum.photos/seed/example/300/200"
    />
  )
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
  name: "Image w/srcSet",
}

export const LazyImage = () => {
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

LazyImage.story = {
  name: "LazyImage",
}

export const LazyImageWSrcSet = () => {
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

LazyImageWSrcSet.story = {
  name: "LazyImage w/srcSet",
}
