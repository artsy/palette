import { calculateGridColumn } from "../calculateGridColumn"

describe("calculateGridColumn", () => {
  it("returns the correct value for a single start", () => {
    expect(calculateGridColumn({ start: 4 })).toEqual(["1 / -1", "4 / -1"])
  })

  it("returns the correct value for a single span", () => {
    expect(calculateGridColumn({ span: 4 })).toEqual(["span 12", "span 4"])
  })

  it("returns the correct value for an array of starts", () => {
    expect(calculateGridColumn({ start: [1, 2, 3] })).toEqual([
      "1 / -1",
      "2 / -1",
      "3 / -1",
    ])
  })

  it("returns the correct value for an array of spans", () => {
    expect(calculateGridColumn({ span: [1, 2, 3] })).toEqual([
      "span 1",
      "span 2",
      "span 3",
    ])
  })

  it("returns the correct value for simple inputs of both", () => {
    expect(calculateGridColumn({ start: 1, span: 2 })).toEqual([
      "1 / span 12",
      "1 / span 2",
    ])
  })

  it("returns the correct value for an array of starts and a single span", () => {
    expect(calculateGridColumn({ start: [3, 4, 5], span: 2 })).toEqual([
      "3 / span 2",
      "4 / span 2",
      "5 / span 2",
    ])
  })

  it("returns the correct value for an array of spans and a single start", () => {
    expect(calculateGridColumn({ start: 2, span: [3, 4, 5] })).toEqual([
      "2 / span 3",
      "2 / span 4",
      "2 / span 5",
    ])
  })

  it("returns the correct value for an array of both starts and spans", () => {
    expect(calculateGridColumn({ start: [1, 2, 3], span: [4, 5, 6] })).toEqual([
      "1 / span 4",
      "2 / span 5",
      "3 / span 6",
    ])
  })

  it("returns the correct value for an array of uneven starts and spans (1)", () => {
    expect(calculateGridColumn({ start: [1, 2, 3], span: [4, 5] })).toEqual([
      "1 / span 4",
      "2 / span 5",
      "3 / span 5",
    ])
  })

  it("returns the correct value for an array of uneven starts and spans (2)", () => {
    expect(calculateGridColumn({ start: [1, 2], span: [4, 5, 6] })).toEqual([
      "1 / span 4",
      "2 / span 5",
      "2 / span 6",
    ])
  })

  it("prevents the user from overflowing the grid", () => {
    const err = "`span` and `start` must fit within the grid"

    expect(() => calculateGridColumn({ start: 12, span: 1 })).not.toThrow()
    expect(() => calculateGridColumn({ start: 1, span: 12 })).not.toThrow()
    expect(() => calculateGridColumn({ start: 12, span: 2 })).toThrowError(err)
    expect(() => calculateGridColumn({ start: 2, span: 12 })).toThrowError(err)
    expect(() => calculateGridColumn({ start: [1, 2], span: 12 })).toThrowError(
      err
    )
    expect(() =>
      calculateGridColumn({ start: [12], span: [1, 2] })
    ).toThrowError(err)
  })
})
