import { Position, calculateMaxHeight } from "../usePosition"

describe("calculateMaxHeight", () => {
  let originalInnerHeight: number

  beforeEach(() => {
    // Store original window.innerHeight
    originalInnerHeight = window.innerHeight
    // Mock window.innerHeight
    Object.defineProperty(window, "innerHeight", {
      value: 800,
      writable: true,
    })
  })

  afterEach(() => {
    // Restore original window.innerHeight
    Object.defineProperty(window, "innerHeight", {
      value: originalInnerHeight,
    })
  })

  it("calculates max height for top placement", () => {
    const anchorRect = {
      top: 300,
      bottom: 400,
      left: 100,
      right: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 300,
    } as DOMRect

    const result = calculateMaxHeight({
      anchorRect,
      position: "top",
      offset: 10,
    })

    // For top placement: anchorRect.top - offset * 2
    // 300 - 10 * 2 = 280
    expect(result).toBe(280)
  })

  it("calculates max height for bottom placement", () => {
    const anchorRect = {
      top: 300,
      bottom: 400,
      left: 100,
      right: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 300,
    } as DOMRect

    const result = calculateMaxHeight({
      anchorRect,
      position: "bottom",
      offset: 10,
    })

    // For bottom placement: viewportHeight - anchorRect.bottom - offset * 2
    // 800 - 400 - 10 * 2 = 380
    expect(result).toBe(380)
  })

  it("calculates max height for side placements", () => {
    const anchorRect = {
      top: 300,
      bottom: 400,
      left: 100,
      right: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 300,
    } as DOMRect

    const result = calculateMaxHeight({
      anchorRect,
      position: "left",
      offset: 10,
    })

    // For side placements: viewportHeight - offset * 2
    // 800 - 10 * 2 = 780
    expect(result).toBe(780)
  })

  it("uses default offset of 0 when not provided", () => {
    const anchorRect = {
      top: 300,
      bottom: 400,
      left: 100,
      right: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 300,
    } as DOMRect

    const result = calculateMaxHeight({
      anchorRect,
      position: "top",
    })

    // For top placement with default offset: anchorRect.top - 0 * 2
    // 300 - 0 = 300
    expect(result).toBe(300)
  })

  it("handles all position variants correctly", () => {
    const anchorRect = {
      top: 300,
      bottom: 400,
      left: 100,
      right: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 300,
    } as DOMRect

    // Test all position variants
    const topPositions: Position[] = ["top-start", "top", "top-end"]
    const bottomPositions: Position[] = ["bottom-start", "bottom", "bottom-end"]
    const sidePositions: Position[] = [
      "left-start",
      "left",
      "left-end",
      "right-start",
      "right",
      "right-end",
    ]

    // All top positions should return the same value
    topPositions.forEach((position) => {
      expect(calculateMaxHeight({ anchorRect, position })).toBe(300)
    })

    // All bottom positions should return the same value
    bottomPositions.forEach((position) => {
      expect(calculateMaxHeight({ anchorRect, position })).toBe(400)
    })

    // All side positions should return the same value
    sidePositions.forEach((position) => {
      expect(calculateMaxHeight({ anchorRect, position })).toBe(800)
    })
  })
})
