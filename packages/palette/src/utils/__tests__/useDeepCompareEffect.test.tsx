import { mount } from "enzyme"
import React, { FC, useState } from "react"
import { useDeepCompareEffect, DependencyList } from "../useDeepCompareEffect"

interface Props {
  callback: () => void
  dependencies: DependencyList
}

const Wrapper: FC<Props> = ({ dependencies, callback }) => {
  useDeepCompareEffect(callback, dependencies)

  return null
}

describe("useDeepCompareEffect", () => {
  it("handles changing values as expected", () => {
    const callback = jest.fn()
    const wrapper = mount(
      <Wrapper dependencies={[1, { a: "b" }, true]} callback={callback} />
    )

    expect(callback).toHaveBeenCalledTimes(1)
    callback.mockClear()

    // no change
    wrapper.update()
    expect(callback).toHaveBeenCalledTimes(0)
    callback.mockClear()

    // no-change (new object with same properties)
    wrapper.setProps({ dependencies: [1, { a: "b" }, true] })
    expect(callback).toHaveBeenCalledTimes(0)
    callback.mockClear()

    // change (new primitive value)
    wrapper.setProps({ dependencies: [2, { a: "b" }, true] })
    expect(callback).toHaveBeenCalledTimes(1)
    callback.mockClear()

    // no-change
    wrapper.update()
    expect(callback).toHaveBeenCalledTimes(0)
    callback.mockClear()

    // change (new primitive value)
    wrapper.setProps({ dependencies: [1, { a: "b" }, false] })
    expect(callback).toHaveBeenCalledTimes(1)
    callback.mockClear()

    // change (new properties on object)
    wrapper.setProps({ dependencies: [1, { a: "c" }, false] })
    expect(callback).toHaveBeenCalledTimes(1)
    callback.mockClear()
  })

  it("does NOT work with manipulation", () => {
    const callback = jest.fn()
    const dependencies = [{ a: "b" }]
    const wrapper = mount(
      <Wrapper dependencies={dependencies} callback={callback} />
    )

    expect(callback).toHaveBeenCalledTimes(1)
    callback.mockClear()

    dependencies[0].a = "c"
    wrapper.update()
    expect(callback).toHaveBeenCalledTimes(0)
  })

  it("works with deep object similarities/differences", () => {
    const callback = jest.fn()
    const wrapper = mount(
      <Wrapper dependencies={[{ a: { b: { c: "d" } } }]} callback={callback} />
    )

    expect(callback).toHaveBeenCalledTimes(1)
    callback.mockClear()

    // change primitive value
    wrapper.setProps({ dependencies: [{ a: { b: { c: "e" } } }] })
    expect(callback).toHaveBeenCalledTimes(1)
    callback.mockClear()

    // no-change
    wrapper.setProps({ dependencies: [{ a: { b: { c: "e" } } }] })
    expect(callback).toHaveBeenCalledTimes(0)
    callback.mockClear()

    // add property
    wrapper.setProps({ dependencies: [{ a: { b: { c: "e" }, f: "g" } }] })
    expect(callback).toHaveBeenCalledTimes(1)
    callback.mockClear()
  })

  it("works with dynamic dependencies", () => {
    const callback = jest.fn()
    const Component = ({ a }: { a: number }) => {
      const [lastA, setLastA] = useState(a)
      const [c, setC] = useState(5)

      if (lastA !== a) {
        setLastA(a)
        setC(1)
      }

      useDeepCompareEffect(callback, [{ a, c }])

      return null
    }

    const wrapper = mount(<Component a={1} />)

    expect(callback).toHaveBeenCalledTimes(1)
    callback.mockClear()

    // change a, and reset c
    wrapper.setProps({ a: 2 })
    expect(callback).toHaveBeenCalledTimes(1)
    callback.mockClear()
  })
})
