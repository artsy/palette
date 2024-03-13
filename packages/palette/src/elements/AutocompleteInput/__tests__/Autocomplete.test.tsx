import { mount } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import { AutocompleteInput } from "../AutocompleteInput"

jest.useFakeTimers()

const OPTIONS = [
  {
    text: "Painting",
    value: "painting",
    subtitle: "An example subtitle",
  },
  { text: "Print", value: "print", subtitle: "An example subtitle" },
  { text: "Sculpture", value: "sculpture", subtitle: "An example subtitle" },
  {
    text: "Photography",
    value: "photography",
    subtitle: "An example subtitle",
  },
  {
    text: "Mixed Media",
    value: "mixed-media",
    subtitle: "An example subtitle",
  },
]

describe("Autocomplete", () => {
  const getWrapper = () => {
    return mount(
      <AutocompleteInput options={OPTIONS} placeholder="Example input" />
    )
  }

  const fillInput = (wrapper: ReturnType<typeof mount>, value: string) => {
    const input = wrapper.find("input")
    ;(input.getDOMNode() as HTMLInputElement).value = value
    input.simulate("change")
  }

  it("renders correctly", () => {
    const wrapper = getWrapper()
    const html = wrapper.html()

    expect(html).toContain("Example input")
    expect(html).not.toContain("Painting")
  })

  it("displays the options when there is a value in the input", () => {
    const wrapper = getWrapper()

    expect(wrapper.html()).toContain('aria-expanded="false"')

    fillInput(wrapper, "hello")

    const html = wrapper.html()

    expect(html).toContain('aria-expanded="true"')
    expect(html).toContain("Painting")
    expect(html).toContain("Print")
    expect(html).toContain("Sculpture")
    expect(html).toContain("Photography")
    expect(html).toContain("Mixed Media")
    expect(html).toContain("5 results are available")
  })

  it("clears the input when the clear button is clicked", () => {
    const wrapper = getWrapper()
    fillInput(wrapper, "hello")

    expect(wrapper.html()).toContain("hello")
    expect(wrapper.find("button").first().html()).toContain(
      'aria-label="Clear input"'
    )

    wrapper.find("button").first().simulate("click")

    expect(wrapper.html()).not.toContain("hello")
  })

  it("selects an option when navigated to", async () => {
    const wrapper = getWrapper()
    fillInput(wrapper, "hello")

    expect(wrapper.find("button").at(1).html()).toContain(
      'aria-selected="false"'
    )

    wrapper.find("button").at(1).simulate("mouseenter")

    expect(wrapper.find("button").at(1).html()).toContain(
      'aria-selected="true"'
    )
  })

  it("closes the options when one is selected", () => {
    const wrapper = getWrapper()
    fillInput(wrapper, "hello")

    expect(wrapper.html()).toContain('aria-expanded="true"')

    act(() => {
      wrapper.find("button").at(1).simulate("mousedown")
      jest.runAllTimers()
    })

    expect(wrapper.html()).toContain('aria-expanded="false"')
  })
})
