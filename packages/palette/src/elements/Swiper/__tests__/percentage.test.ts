import { percentage } from "../percentage"

describe("percentage", () => {
  it("calculates the amount of progress made (1)", () => {
    expect(percentage({ viewport: 1000, total: 10000, left: 0 })).toBe(0)
  })

  it("calculates the amount of progress made (2)", () => {
    expect(
      percentage({
        viewport: 1000,
        total: 10000,
        left: 10000 - 1000,
      })
    ).toBe(100)
  })

  it("calculates the amount of progress made (3)", () => {
    expect(
      percentage({
        viewport: 1000,
        total: 10000,
        left: (10000 - 1000) / 2,
      })
    ).toBe(50)
  })

  it("calculates the amount of progress made (4)", () => {
    expect(
      percentage({
        viewport: 1000,
        total: 10000,
        left: (10000 - 1000) / 2 + 100,
      })
    ).toBe(51)
  })
})
