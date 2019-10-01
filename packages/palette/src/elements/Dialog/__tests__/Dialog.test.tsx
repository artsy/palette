import { mount } from "enzyme"
import React from "react"
import { Dialog } from "../Dialog"

describe("Dialog", () => {
  it("displays custom title", () => {
    const primaryCtaAction = () => null
    const component = mount(
      <Dialog
        primaryCta={{
          action: () => ({ primaryCtaAction }),
          text: "Continue",
        }}
        title="Condimentum Ridiculus"
        show
      />
    )
    expect(component.html()).toContain("Condimentum Ridiculus")
  })
})
