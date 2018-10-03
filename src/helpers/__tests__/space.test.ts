import { space } from "helpers/space"

describe("space", () => {
  it("returns the correct space", () => {
    expect(space(1)).toEqual(10)
    expect(space(2)).toEqual(20)
    expect(space(3)).toEqual(30)
  })
})
