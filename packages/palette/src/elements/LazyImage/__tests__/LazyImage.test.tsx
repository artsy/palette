import { mount } from "enzyme"
import React from "react"
import { LazyImage } from "../LazyImage"

describe("LazyImage", () => {
  it("renders a LazyImage", () => {
    const wrapper = mount(
      <LazyImage src="example.jpg" srcSet="example.jpg 1x, example.jpg 2x" />
    )

    expect(wrapper.html()).toContain(
      'src="example.jpg" srcset="example.jpg 1x, example.jpg 2x"'
    )

    expect(wrapper.html()).toContain("LazyImage__StyledLazyLoadImage")
  })

  it("supports all the props a normal image would support", () => {
    const wrapper = mount(
      <LazyImage
        srcSet="large.jpg 1024w, medium.jpg 640w, small.jpg 320w"
        sizes="(min-width: 36em) 33.3vw, 100vw"
        src="small.jpg"
        alt="A rad wolf"
        title="For example"
      />
    )

    expect(wrapper.html()).toContain(
      'srcset="large.jpg 1024w, medium.jpg 640w, small.jpg 320w" sizes="(min-width: 36em) 33.3vw, 100vw" src="small.jpg" alt="A rad wolf" title="For example"'
    )
  })

  it("accepts a preload prop which returns a normal image tag", () => {
    const wrapper = mount(
      <LazyImage
        preload
        src="example.jpg"
        srcSet="example.jpg 1x, example.jpg 2x"
      />
    )

    expect(wrapper.html()).toContain("LazyImage__Img")
  })
})
