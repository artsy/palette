import { mount, ReactWrapper } from "enzyme"
import React from "react"
import { TextArea, TextAreaProps } from "../TextArea"

describe("TextArea", () => {
  const onChange = jest.fn(({ value }) => {
    process.stdout.write(value + "\n")
  })
  const ref = React.createRef<any>()
  beforeEach(() => {
    onChange.mockReset()
  })

  const simulateTyping = (wrapper: ReactWrapper, text: string) => {
    const textArea = wrapper.find("textarea")
    // @ts-expect-error  MIGRATE_STRICT_MODE
    textArea.getDOMNode().value = text
    textArea.simulate("change")
  }

  const getWrapper = (props: Partial<TextAreaProps> = {}) => {
    return mount(
      <TextArea
        onChange={onChange}
        ref={ref}
        title="Title"
        description="Description"
        {...props}
      />
    )
  }

  it("shows the title", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toContain("Title")
  })

  it("doesn't show a title if you don't supply a title", () => {
    const wrapper = getWrapper({ title: null })
    expect(wrapper.html()).not.toContain("Title")
  })

  it("shows the description", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).toContain("Description")
  })

  it("doesn't show a description if you don't supply a description", () => {
    const wrapper = getWrapper({ description: null })
    expect(wrapper.html()).not.toContain("Description")
  })

  it("doesn't show an error if you don't supply an error", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).not.toContain("Error message")
  })

  it("shows an error if you supply an error", () => {
    const wrapper = getWrapper({ error: "Error message" })
    expect(wrapper.html()).toContain("Error message")
  })

  it("doesn't show a required * if you don't require it", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).not.toContain("*")
  })

  it("shows a required * if you require it", () => {
    const wrapper = getWrapper({ required: true })
    expect(wrapper.html()).toContain("*")
  })

  it("triggers onChange when you type characters", () => {
    const wrapper = getWrapper()
    expect(onChange).not.toHaveBeenCalled()
    simulateTyping(wrapper, "these are words")
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({
      value: "these are words",
      exceedsCharacterLimit: false,
    })
    simulateTyping(wrapper, "these are more words")
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith({
      value: "these are more words",
      exceedsCharacterLimit: false,
    })
  })

  it("doesn't show a character limit label if you don't specify one", () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).not.toContain("max")
  })

  it("shows a character limit label if you specify one", () => {
    const wrapper = getWrapper({ characterLimit: 300 })
    expect(wrapper.text()).toContain("300 characters remaining")
  })

  it("shows the correct amount in the limit label if you supply a default value", () => {
    const wrapper = getWrapper({ characterLimit: 300, defaultValue: "banana" })
    expect(wrapper.text()).toContain("294 characters remaining")
  })

  it("updates the limit label as you type", () => {
    const wrapper = getWrapper({ characterLimit: 20 })
    expect(wrapper.text()).toContain("20 characters remaining")

    simulateTyping(wrapper, "hello")
    expect(wrapper.text()).toContain("15 characters remaining")

    simulateTyping(wrapper, "hello there")
    expect(wrapper.text()).toContain("9 characters remaining")

    simulateTyping(wrapper, "hello there chris")
    expect(wrapper.text()).toContain("3 characters remaining")

    simulateTyping(wrapper, "hello there christopher")
    expect(wrapper.text()).toContain("-3 characters remaining")

    simulateTyping(wrapper, "")
    expect(wrapper.text()).toContain("20 characters remaining")
  })

  it("calls onChange with correct values for exceedsCharacterLimit", () => {
    const wrapper = getWrapper({ characterLimit: 20 })
    expect(wrapper.text()).toContain("20 characters remaining")

    simulateTyping(wrapper, "hello")
    expect(onChange).toHaveBeenLastCalledWith({
      value: "hello",
      exceedsCharacterLimit: false,
    })

    simulateTyping(wrapper, "hello there")
    expect(onChange).toHaveBeenLastCalledWith({
      value: "hello there",
      exceedsCharacterLimit: false,
    })

    simulateTyping(wrapper, "hello there chris")
    expect(onChange).toHaveBeenLastCalledWith({
      value: "hello there chris",
      exceedsCharacterLimit: false,
    })

    simulateTyping(wrapper, "hello there christopher")
    expect(onChange).toHaveBeenLastCalledWith({
      value: "hello there christopher",
      exceedsCharacterLimit: true,
    })

    // exactly at the limit
    simulateTyping(wrapper, "hello there christop")
    expect(onChange).toHaveBeenLastCalledWith({
      value: "hello there christop",
      exceedsCharacterLimit: false,
    })
  })

  it("renders the name if supplied", () => {
    const wrapper = getWrapper({ name: "my-input" })
    expect(wrapper.find("textarea[name='my-input']")).toHaveLength(1)
  })
})
