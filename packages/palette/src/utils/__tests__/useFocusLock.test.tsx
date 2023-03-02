import { mount } from "enzyme"
import React, { useRef } from "react"
import { act } from "react-dom/test-utils"
import { useFocusLock } from "../useFocusLock"

jest.mock("tabbable", () => {
  const tabbable = jest.requireActual("tabbable")

  return {
    ...tabbable,
    tabbable: (node, options) =>
      tabbable.tabbable(node, { ...options, displayCheck: "none" }),
    focusable: (node, options) =>
      tabbable.focusable(node, { ...options, displayCheck: "none" }),
    isFocusable: (node, options) =>
      tabbable.isFocusable(node, { ...options, displayCheck: "none" }),
    isTabbable: (node, options) =>
      tabbable.isTabbable(node, { ...options, displayCheck: "none" }),
  }
})

const flushPromiseQueue = () => new Promise((resolve) => setTimeout(resolve, 0))

const keydown = async (key: string, shift?: boolean) => {
  act(() => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key, shiftKey: shift })
    )
  })

  await flushPromiseQueue()
}

const Wrapper: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  useFocusLock({ ref })

  return (
    <>
      <input id="0" name="zero" />
      <div ref={ref}>
        <input id="1" name="one" />
        <input id="2" name="two" />
        <button id="3">three</button>
      </div>
      <input id="4" name="four" />
    </>
  )
}

describe("useFocusLock", () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it("cycles through the tabbable elements", async () => {
    mount(<Wrapper />, { attachTo: document.body })

    jest.runAllTimers()

    expect(document.activeElement?.id).toEqual("1")
    keydown("Tab")
    expect(document.activeElement?.id).toEqual("2")
    keydown("Tab")
    expect(document.activeElement?.id).toEqual("3")
    keydown("Tab")
    expect(document.activeElement?.id).toEqual("1")
  })

  it("can handle reverse with shift", async () => {
    mount(<Wrapper />, { attachTo: document.body })

    jest.runAllTimers()

    expect(document.activeElement?.id).toEqual("1")
    keydown("Tab", true)
    expect(document.activeElement?.id).toEqual("3")
    keydown("Tab", true)
    expect(document.activeElement?.id).toEqual("2")
    keydown("Tab", true)
    expect(document.activeElement?.id).toEqual("1")
  })
})
