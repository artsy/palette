import { mount } from "enzyme"
import React from "react"
import { Step, Stepper } from "../Stepper"

describe("Stepper", () => {
  const getWrapper = (props = {}) => {
    return mount(
      <Stepper
        initialTabIndex={0}
        currentStepIndex={0}
        disableNavigation={false}
        {...props}
      >
        <Step name="Review" />
        <Step name="Confirm" />
        <Step name="Pay" />
      </Stepper>
    )
  }

  it("shows no checkmarks initially", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("CheckIcon").length).toBe(0)
  })

  it("shows checkmarks after selected", () => {
    const wrapper = getWrapper({
      currentStepIndex: 2,
    })
    expect(wrapper.find("CheckIcon").length).toBe(2)
  })

  it("disables stepper", () => {
    const wrapper = getWrapper({
      disableNavigation: true,
    })

    expect(
      wrapper.find("button").map((button) => button.prop("disabled"))
    ).toStrictEqual([true, true, true])
  })
})
