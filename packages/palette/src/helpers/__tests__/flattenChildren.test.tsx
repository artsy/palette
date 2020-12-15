import React from "react"
import { flattenChildren } from "../flattenChildren"

describe("flattenChildren", () => {
  it("flattens the children", () => {
    const flattened = flattenChildren(
      <>
        <div>one</div>
        <div>two</div>
        <>
          <div>three</div>
          <>
            <div>four</div>
          </>
        </>
      </>
    )

    expect(flattened).toHaveLength(4)
  })
})
