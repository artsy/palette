import React, { TextareaHTMLAttributes } from "react"
import { mount, ReactWrapper } from "enzyme"
import { FilterSelect, FilterSelectProps } from "./FilterSelect"

describe("FilterSelect", () => {
  const defaultProps: FilterSelectProps = {
    placeholder: "Filter by artist",
    initialItemsToShow: 3,
    items: [
      { label: "Item 1", value: "item-1" },
      { label: "Item 2", value: "item-2" },
      { label: "Item 3", value: "item-3" },
      { label: "Item 4", value: "item-4" },
      { label: "Item 5", value: "item-5" },
      { label: "Item 6", value: "item-6" },
    ],
  }

  const getWrapper = (props: FilterSelectProps = {}) => {
    return mount(<FilterSelect {...defaultProps} {...props} />)
  }

  const simulateTyping = (wrapper: ReactWrapper, text: string) => {
    const textArea = wrapper.find("input")
    const textAreaNode = textArea.getDOMNode() as TextareaHTMLAttributes<null>
    textAreaNode.value = text
    textArea.simulate("change")
  }

  it("renders correct items", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("FilterInput").length).toBe(1)
    expect(wrapper.find("Checkbox").length).toBe(3)
    expect(wrapper.find("ShowMore").length).toBe(1)

    const text = wrapper.text()
    expect(text).toContain("Item 1")
    expect(text).toContain("Item 2")
    expect(text).toContain("Item 3")
  })

  it("selects items and moves them to the top", () => {
    const wrapper = getWrapper()
    wrapper.find("Checkbox").at(1).simulate("click")
    wrapper.find("Checkbox").at(2).simulate("click")
    wrapper.update()

    const text = wrapper.text()
    expect(text).toContain("Item 2")
    expect(text).toContain("Item 3")
    expect(text).toContain("Item 1")
  })

  it("resorts items when deselected", () => {
    const wrapper = getWrapper()
    wrapper.find("Checkbox").at(1).simulate("click")
    wrapper.find("Checkbox").at(2).simulate("click")
    wrapper.update()

    let text = wrapper.text()
    expect(text).toContain("Item 2")
    expect(text).toContain("Item 3")
    expect(text).toContain("Item 1")

    wrapper.find("Checkbox").at(0).simulate("click")
    wrapper.find("Checkbox").at(1).simulate("click")
    wrapper.update()

    text = wrapper.text()
    expect(text).toContain("Item 1")
    expect(text).toContain("Item 2")
    expect(text).toContain("Item 3")
  })

  it("only selects one item if multiselect=false, and doesnt resort", () => {
    const wrapper = getWrapper({ multiselect: false })
    wrapper.find("Checkbox").at(1).simulate("click")
    wrapper.update()
    expect(wrapper.find("Checkbox").at(1).props().selected).toBe(true)

    let text = wrapper.text()
    expect(text).toContain("Item 1")
    expect(text).toContain("Item 2")
    expect(text).toContain("Item 3")

    wrapper.find("Checkbox").at(2).simulate("click")
    wrapper.update()
    expect(wrapper.find("Checkbox").at(1).props().selected).not.toBe(true)
    expect(wrapper.find("Checkbox").at(2).props().selected).toBe(true)

    text = wrapper.text()
    expect(text).toContain("Item 1")
    expect(text).toContain("Item 2")
    expect(text).toContain("Item 3")
  })

  it("filters items", () => {
    const wrapper = getWrapper({ query: "Item 3" })
    const text = wrapper.text()
    expect(text).toContain("Item 3")
    expect(text).not.toContain("Item 1")
    expect(text).not.toContain("Item 2")
  })

  it("clears filters items", () => {
    const wrapper = getWrapper({ query: "Item 3", initialItemsToShow: 3 })
    let text = wrapper.text()
    expect(text).toContain("Item 3")
    expect(text).not.toContain("Item 1")
    expect(text).not.toContain("Item 2")

    wrapper.find("FilterInput Clickable").simulate("click")
    wrapper.update()

    text = wrapper.text()
    expect(text).toContain("Item 1")
    expect(text).toContain("Item 2")
    expect(text).toContain("Item 3")
    expect(text).toContain("Show more")
  })

  it("filters selected items", () => {
    const wrapper = getWrapper({ query: "Item 3" })
    wrapper.find("Checkbox").at(0).simulate("click")
    wrapper.update()

    const text = wrapper.text()
    expect(text).toContain("Item 3")
    expect(text).not.toContain("Item 1")
    expect(text).not.toContain("Item 2")
  })

  it("hides items under the fold", () => {
    const wrapper = getWrapper({ initialItemsToShow: 1 })
    const text = wrapper.text()
    expect(text).toContain("Item 1")
    expect(text).toContain("Show more")
    expect(text).not.toContain("Item 2")
    expect(text).not.toContain("Item 3")
  })

  it("shows all items on show more click", () => {
    const wrapper = getWrapper({ initialItemsToShow: 1 })
    let text = wrapper.text()
    expect(text).toContain("Item 1")
    expect(text).toContain("Show more")
    expect(text).not.toContain("Item 2")
    expect(text).not.toContain("Item 3")

    wrapper.find("ShowMore Clickable").simulate("click")
    wrapper.update()

    text = wrapper.text()
    expect(text).toContain("Item 1")
    expect(text).toContain("Item 2")
    expect(text).toContain("Item 3")
    expect(text).toContain("Item 4")
    expect(text).toContain("Item 5")
    expect(text).toContain("Item 6")
  })

  it("renders custom labels for items", () => {
    const wrapper = getWrapper({
      items: [{ label: "Name", value: "value", age: 1 }],
      renderItemLabel: ({ label, age }) => label + "Hello" + age,
    })

    expect(wrapper.text()).toContain("NameHello1")
  })

  it("dispatches state on change", () => {
    const items = [
      { label: "Item1", value: "item-1" },
      { label: "Item2", value: "item-2" },
    ]
    const spy = jest.fn()
    const wrapper = getWrapper({
      onChange: spy,
      items,
    })

    simulateTyping(wrapper, "item1")
    wrapper.find("Checkbox").at(0).simulate("click")
    wrapper.update()

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        filteredItems: [{ label: "Item1", value: "item-1" }],
        items: [
          { label: "Item1", value: "item-1" },
          { label: "Item2", value: "item-2" },
        ],
        query: "item1",
        selectedItems: [{ label: "Item1", value: "item-1" }],
      })
    )
  })
})
