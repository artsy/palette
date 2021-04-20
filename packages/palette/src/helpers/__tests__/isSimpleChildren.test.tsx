import React from "react"
import { isSimpleChildren } from "../isSimpleChildren"

describe("isSimpleChildren", () => {
  it("checks if children are a string", () => {
    expect(isSimpleChildren("hello")).toBe(true)
  })

  it("checks if children are a number", () => {
    expect(isSimpleChildren(4)).toBe(true)
  })

  it("checks if children are an array of simple elements", () => {
    expect(isSimpleChildren(["2 + 2 is ", 4, "!"])).toBe(true)
  })

  it("checks if children are a string wrapped in a fragment", () => {
    expect(isSimpleChildren(<>hello</>)).toBe(true)
  })

  it("checks if children are a number wrapped in a fragment", () => {
    expect(isSimpleChildren(<>{1}</>)).toBe(true)
  })

  it("checks if children are an array of simple elements wrapped in a fragment", () => {
    expect(isSimpleChildren(<>hello {2 + 2}</>)).toBe(true)
  })

  it("checks if children are ultimately simple but with nested fragments", () => {
    expect(
      isSimpleChildren(
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
    expect(isSimpleChildren(null)).toBe(false)
  })

  it("checks undefineds", () => {
    expect(isSimpleChildren(undefined)).toBe(false)
  })

  it("checks if children are not simple", () => {
    expect(isSimpleChildren(<div>hello</div>)).toBe(false)
    expect(
      isSimpleChildren(
        <h1>
          hello <div>— world</div>
        </h1>
      )
    ).toBe(false)
  })
})
