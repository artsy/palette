import { mount } from "enzyme"
import React from "react"
import { Sup } from "../../Sup"
import { Tab, Tabs } from "../index"

describe("Tabs", () => {
  it("renders tabs by via name prop", () => {
    const wrapper = mount(
      <div>
        <Tabs>
          <Tab name="Overview" />
          <Tab name="CV" />
        </Tabs>
      </div>
    )

    expect(wrapper.html()).toContain("Overview")
    expect(wrapper.html()).toContain("CV")
    expect(wrapper.find("button")).toHaveLength(2)
  })

  it("sets a specific tab on mount", () => {
    const wrapper = mount(
      <div>
        <Tabs initialTabIndex={1}>
          <Tab name="Overview" />
          <Tab name="CV" />
        </Tabs>
      </div>
    )

    expect(wrapper.find("button").at(0).prop("aria-selected")).toBe(false)
    expect(wrapper.find("button").at(1).prop("aria-selected")).toBe(true)
  })

  it("ignores empty tab when selecting default selected tab on mount", () => {
    const wrapper = mount(
      <div>
        <Tabs>
          {null}
          {false as any}
          <Tab name="CV" />
        </Tabs>
      </div>
    )

    expect(wrapper.find("button")).toHaveLength(1)
    expect(wrapper.find("button").at(0).prop("aria-selected")).toBe(true)
  })

  it("toggles tab content on click", () => {
    const getWrapper = (tabIndex) =>
      mount(
        <div>
          <Tabs initialTabIndex={tabIndex}>
            <Tab name="Overview">Overview content</Tab>
            <Tab name="CV">CV content</Tab>
          </Tabs>
        </div>
      )

    expect(getWrapper(0).html()).not.toContain("CV content")
    expect(getWrapper(0).html()).toContain("Overview content")
    expect(getWrapper(1).html()).not.toContain("Overview content")
    expect(getWrapper(1).html()).toContain("CV content")
  })

  it("it triggers an onChange event on tab click", () => {
    const spy = jest.fn()
    const wrapper = mount(
      <div>
        <Tabs initialTabIndex={1} onChange={spy}>
          <Tab name="Overview" data={{ example: 0 }} />
          <Tab name="CV" data={{ example: 1 }} />
        </Tabs>
      </div>
    )

    expect(spy).not.toHaveBeenCalled()
    wrapper.find("button").at(1).simulate("click")
    expect(spy).not.toHaveBeenCalled() // Hasn't changed

    wrapper.find("button").at(0).simulate("click")
    expect(spy).toHaveBeenLastCalledWith({
      data: { example: 0 },
      name: "Overview",
      tabIndex: 0,
    })

    wrapper.find("button").at(1).simulate("click")
    expect(spy).toHaveBeenLastCalledWith({
      data: { example: 1 },
      name: "CV",
      tabIndex: 1,
    })
  })

  it("renders superscripts after tab text", () => {
    const wrapper = mount(
      <div>
        <Tabs justifyContent="center">
          <Tab
            name={
              <>
                Open
                <Sup>100</Sup>
              </>
            }
          />
          <Tab
            name={
              <>
                Ready to ship
                <Sup>4</Sup>
              </>
            }
          />
          <Tab name="Complete" />
        </Tabs>
      </div>
    )

    expect(wrapper.text()).toContain("Open100Ready to ship4Complete")
  })
})
