import React from "react"
import { isText } from "../isText"

describe("isText", () => {
  it("checks if children are a string", () => {
    expect(isText("hello")).toBe(true)
  })

  it("checks if children are a number", () => {
    expect(isText(4)).toBe(true)
  })

  it("checks if children are an array of simple elements", () => {
    expect(isText(["2 + 2 is ", 4, "!"])).toBe(true)
  })

  it("checks if children are a string wrapped in a fragment", () => {
    expect(isText(<>hello</>)).toBe(true)
  })

  it("checks if children are a number wrapped in a fragment", () => {
    expect(isText(<>{1}</>)).toBe(true)
  })

  it("checks if children are an array of simple elements wrapped in a fragment", () => {
    expect(isText(<>hello {2 + 2}</>)).toBe(true)
  })

  it("checks if children are ultimately simple but with nested fragments", () => {
    expect(
      isText(
        <>
          hello{" "}
          <>
            {2 + 2}
            <>!</>
          </>
        </>
      )
    ).toBe(true)
  })

  it("checks nulls", () => {
    expect(isText(null)).toBe(false)
  })

  it("checks undefineds", () => {
    expect(isText(undefined)).toBe(false)
  })

  it("checks if children are not simple", () => {
    expect(isText(<div>hello</div>)).toBe(false)
    expect(
      isText(
        <h1>
          hello <div>— world</div>
        </h1>
      )
    ).toBe(false)
  })
})
