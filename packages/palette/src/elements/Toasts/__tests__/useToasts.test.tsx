import React, { useState } from "react"
import { mount } from "enzyme"
import { Toasts } from "../Toasts"
import { ToastsProvider, useToasts } from "../useToasts"

describe("useToasts", () => {
  const Example = () => {
    const { sendToast, retractToast } = useToasts()
    const [activeToasts, setActiveToasts] = useState<string[]>([])

    return (
      <div>
        <button
          id="send"
          onClick={() => {
            const { id } = sendToast({ message: "Hello world" })
            setActiveToasts([...activeToasts, id])
          }}
        >
          Send
        </button>

        {activeToasts.map((id) => (
          <button
            className="retract"
            key={id}
            onClick={() => {
              retractToast(id)
            }}
          >
            Retract {id}
          </button>
        ))}
      </div>
    )
  }

  const getWrapper = () =>
    mount(
      <div>
        <ToastsProvider>
          <Toasts />
          <Example />
        </ToastsProvider>
      </div>
    )

  it("sends the toast", () => {
    const wrapper = getWrapper()
    expect(wrapper.text()).not.toContain("Hello world")
    wrapper.find("#send").simulate("click")
    expect(wrapper.text()).toContain("Hello world")
  })

  it("retracts the toast when the toast is clicked", () => {
    const wrapper = getWrapper()
    wrapper.find("#send").simulate("click")
    expect(wrapper.text()).toContain("Hello world")
    wrapper.find('div[children="Hello world"]').simulate("click")
    expect(wrapper.text()).not.toContain("Hello world")
  })

  it("retracts the toast when `retractToast` is called with the id of the toast", () => {
    const wrapper = getWrapper()
    wrapper.find("#send").simulate("click")
    expect(wrapper.text()).toContain("Hello world")
    const button = wrapper.find(".retract").first()
    expect(button.text()).toContain("Retract")
    button.simulate("click")
    expect(wrapper.text()).not.toContain("Hello world")
  })
})
