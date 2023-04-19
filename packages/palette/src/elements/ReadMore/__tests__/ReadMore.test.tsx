import { mount, render } from "enzyme"
import React from "react"
import { ReadMore } from "../ReadMore"

describe("ReadMore", () => {
  const copy =
    "Donald Judd regarded as one of the most significant American artists of the post-war period, is perhaps best-known for the large-scale outdoor installations and long, spacious interiors he designed in Marfa. Donald Judd, widely regarded as one of the most significant American artists of the post-war period, is perhaps best-known for the large-scale outdoor installations and long, spacious interiors he designed in Marfa."

  const htmlCopy =
    "<p>Donald Judd <a>regarded as one of the most</a> significant American artists</p>"

  it("returns null if no content provided", () => {
    const wrapper = render(<ReadMore content={null as any} />)
    expect(wrapper.html()).toBe(null)
  })

  it("it truncates text", () => {
    const wrapper = (cap) => render(<ReadMore maxChars={cap} content={copy} />)
    expect(wrapper(20).html()).toContain(">Donald Judd …<")
    expect(wrapper(Infinity).html()).toContain(copy)
    expect(wrapper(undefined).html()).toContain(copy)
  })

  it("handles html including nested tags", () => {
    const wrapper = (cap) =>
      render(<ReadMore maxChars={cap} content={htmlCopy} />)
    expect(wrapper(30).html()).toContain(
      "<p>Donald Judd <a>regarded as one …</a></p>"
    )
    expect(wrapper(Infinity).html()).toContain(htmlCopy)
    expect(wrapper(undefined).html()).toContain(htmlCopy)
  })

  it("Auto expands text that is less than max char count", () => {
    const wrapper = mount(<ReadMore maxChars={100} content={htmlCopy} />)
    expect(wrapper.find("button").length).toEqual(0)
  })

  it("changes the button text on click", () => {
    const wrapper = mount(<ReadMore maxChars={20} content={copy} />)
    expect(wrapper.find("button").text()).toContain("Read more")
    wrapper.find("button").simulate("click")
    expect(wrapper.find("button").text()).toEqual("Read less")
    wrapper.find("button").simulate("click")
    expect(wrapper.find("button").text()).toContain("Read more")
  })

  it("does not expand if disabled", () => {
    const wrapper = mount(<ReadMore maxChars={20} content={copy} disabled />)
    expect(wrapper.find("button").length).toBe(1)
    wrapper.find("button").simulate("click")
    expect(wrapper.find("button").length).toBe(1)
  })

  it("calls the click callback when clicked", () => {
    const callback = jest.fn()
    const wrapper = mount(
      <ReadMore maxChars={20} content={copy} onReadMoreClicked={callback} />
    )
    expect(callback).not.toBeCalled()
    wrapper.find("button").simulate("click")
    expect(callback).toBeCalled()
  })
})
