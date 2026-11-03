import React from "react"
import { mount } from "enzyme"
import { Separator } from "../Separator"
import { separator } from "../Separator.css"
import { dynamicClasses } from "../../../styles/dynamic.css"
import { tokenClasses } from "../../../styles/sprinkles.css"

const renderNode = (element: React.ReactElement) => {
  return mount(element).getDOMNode() as HTMLElement
}

describe("Separator", () => {
  it("renders a div with the base class, 100% width and the mono10 color", () => {
    const wrapper = mount(<Separator />)
    const node = wrapper.getDOMNode() as HTMLElement

    expect(wrapper.find("div")).toHaveLength(1)
    expect(node.tagName).toBe("DIV")
    expect(node.className).toContain(separator)
    expect(node.className).toContain(dynamicClasses.base.width)
    expect(node.style.getPropertyValue("--w-base")).toBe("100%")
    expect(node.className).toContain(tokenClasses.base.color.mono10)
  })

  it("renders an hr with as=\"hr\"", () => {
    const node = renderNode(<Separator as="hr" />)

    expect(node.tagName).toBe("HR")
    expect(node.className).toContain(separator)
  })

  it("forwards a ref to the DOM node", () => {
    const ref = React.createRef<HTMLElement>()
    mount(<Separator ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("forwards a ref to the hr", () => {
    const ref = React.createRef<HTMLElement>()
    mount(<Separator as="hr" ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLHRElement)
  })

  it("merges a consumer className after the resolver classes", () => {
    const node = renderNode(<Separator className="x" />)
    const classes = node.className.split(" ")

    expect(classes).toContain(separator)
    expect(classes[classes.length - 1]).toBe("x")
  })

  it("merges a consumer style with the inline variables", () => {
    const node = renderNode(<Separator style={{ opacity: 0.5 }} />)

    expect(node.style.getPropertyValue("--w-base")).toBe("100%")
    expect(node.style.opacity).toBe("0.5")
  })

  it("resolves space and border color props to their classes", () => {
    const node = renderNode(<Separator my={2} borderColor="mono30" />)

    expect(node.className).toContain(tokenClasses.base["margin-top"]["2"])
    expect(node.className).toContain(tokenClasses.base["margin-bottom"]["2"])
    expect(node.className).toContain(tokenClasses.base["border-color"].mono30)
  })

  it("resolves responsive props to breakpoint classes", () => {
    const node = renderNode(<Separator my={[1, 2]} width={["50%", "75%"]} />)

    expect(node.className).toContain(tokenClasses.base["margin-top"]["1"])
    expect(node.className).toContain(tokenClasses.sm["margin-top"]["2"])
    expect(node.style.getPropertyValue("--w-base")).toBe("50%")
    expect(node.style.getPropertyValue("--w-sm")).toBe("75%")
  })

  it("lets a caller override the default width and color", () => {
    const node = renderNode(<Separator width="50%" color="mono30" />)

    expect(node.style.getPropertyValue("--w-base")).toBe("50%")
    expect(node.className).toContain(tokenClasses.base.color.mono30)
    expect(node.className).not.toContain(tokenClasses.base.color.mono10)
  })

  it("falls back to the defaults for null width and color", () => {
    const node = renderNode(
      <Separator width={null as never} color={null as never} />
    )

    expect(node.style.getPropertyValue("--w-base")).toBe("100%")
    expect(node.className).toContain(tokenClasses.base.color.mono10)
  })

  it("passes other props through", () => {
    const node = renderNode(<Separator data-testid="s" />)

    expect(node.getAttribute("data-testid")).toBe("s")
  })

  it("does not leak style props to the DOM", () => {
    const node = renderNode(
      <Separator my={2} width="50%" color="mono30" borderColor="mono30" />
    )

    ;["my", "width", "color", "borderColor", "bordercolor"].forEach((name) => {
      expect(node.hasAttribute(name)).toBe(false)
    })
  })

  it("keeps its display name", () => {
    expect(Separator.displayName).toBe("Separator")
  })
})
