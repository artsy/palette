import React from "react"
import { mount } from "enzyme"
import { Spacer } from "../Spacer"
import { tokenClasses } from "../../../styles/sprinkles.css"

const renderDiv = (element: React.ReactElement) => {
  const wrapper = mount(element)
  return wrapper.getDOMNode() as HTMLElement
}

describe("Spacer", () => {
  it("renders one div with the token class and no inline style", () => {
    const wrapper = mount(<Spacer y={2} />)
    const div = wrapper.getDOMNode() as HTMLElement

    expect(wrapper.find("div")).toHaveLength(1)
    expect(div.tagName).toBe("DIV")
    expect(div.className).toContain(tokenClasses.base["margin-top"]["2"])
    expect(div.hasAttribute("style")).toBe(false)
  })

  it("renders a responsive array as base and sm classes", () => {
    const div = renderDiv(<Spacer x={[1, 2]} />)

    expect(div.className).toContain(tokenClasses.base["margin-left"]["1"])
    expect(div.className).toContain(tokenClasses.sm["margin-left"]["2"])
  })

  it("sets an inline variable for a value outside the scale", () => {
    const div = renderDiv(<Spacer y="31px" />)

    expect(div.style.getPropertyValue("--mt-base")).toBe("31px")
  })

  it("passes other props through", () => {
    const div = renderDiv(<Spacer data-testid="s" y={2} />)

    expect(div.getAttribute("data-testid")).toBe("s")
  })

  it("does not leak x, y or mt to the DOM", () => {
    const div = renderDiv(<Spacer x={1} y={2} />)

    expect(div.hasAttribute("x")).toBe(false)
    expect(div.hasAttribute("y")).toBe(false)
    expect(div.hasAttribute("mt")).toBe(false)
  })

  it("merges a consumer className after the resolver classes", () => {
    const div = renderDiv(<Spacer y={2} className="custom" />)
    const classes = div.className.split(" ")

    expect(classes).toContain(tokenClasses.base["margin-top"]["2"])
    expect(classes[classes.length - 1]).toBe("custom")
  })

  it("merges a consumer style with the inline variables", () => {
    const div = renderDiv(<Spacer y="31px" style={{ opacity: 0.5 }} />)

    expect(div.style.getPropertyValue("--mt-base")).toBe("31px")
    expect(div.style.opacity).toBe("0.5")
  })

  it("forwards a ref to the div", () => {
    const ref = React.createRef<HTMLDivElement>()
    mount(<Spacer ref={ref} y={2} />)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("keeps its display name", () => {
    expect(Spacer.displayName).toBe("Spacer")
  })
})
