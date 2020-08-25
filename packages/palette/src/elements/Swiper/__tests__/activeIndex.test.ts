import { activeIndex } from "../activeIndex"

describe("activeIndex", () => {
  it("calculates the active index given the progress (1)", () => {
    expect(activeIndex({ progress: 0, length: 100 })).toBe(0)
  })

  it("calculates the active index given the progress (2)", () => {
    expect(activeIndex({ progress: 50, length: 50 })).toBe(24)
  })

  it("calculates the active index given the progress (3)", () => {
    expect(activeIndex({ progress: 100, length: 50 })).toBe(49)
  })
})
