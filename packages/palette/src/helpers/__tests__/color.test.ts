import { color } from "../color"

describe("color", () => {
  it("returns the correct color", () => {
    expect(color("mono10")).toEqual("#E7E7E7")
    expect(color("mono30")).toEqual("#C2C2C2")
  })
})
