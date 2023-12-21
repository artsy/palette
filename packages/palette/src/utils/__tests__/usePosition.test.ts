import {
  getPosition,
  placeTooltip,
  Position,
  POSITION,
  shouldFlip,
  translateWithOffset,
} from "../usePosition"

const positions = Object.keys(POSITION) as Position[]

describe("placeTooltip", () => {
  it("works", () => {
    const anchor = {
      getBoundingClientRect: () => ({
        top: 100,
        right: 100,
        bottom: 100,
        left: 100,
        width: 200,
        height: 100,
      }),
    } as HTMLElement

    const tooltip = {
      getBoundingClientRect: () => ({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 100,
        height: 100,
      }),
      style: {},
    } as HTMLElement

    const boundaryRect = {
      top: 0,
      right: 500,
      bottom: 600,
      left: 0,
    } as DOMRect

    placeTooltip({
      anchor,
      tooltip,
      position: "top",
      offset: 0,
      boundaryRect,
    })

    expect(tooltip.style.display).toEqual("block")
    expect(tooltip.style.transform).toEqual("translate(150px, 0px)")
  })
})

describe("getPosition", () => {
  it("returns the correct position", () => {
    const elementRect = {
      width: 100,
      height: 100,
      top: 0,
      right: 500,
      bottom: 250,
      left: 0,
    }

    const tooltipRect = {
      width: 200,
      height: 200,
    }

    expect(
      positions.map((position) =>
        getPosition(elementRect, tooltipRect, position)
      )
    ).toEqual([
      { x: 0, y: -200 }, // top-start
      { x: -50, y: -200 }, // top
      { x: 300, y: -200 }, // top-end
      { x: 0, y: 250 }, // bottom-start
      { x: -50, y: 250 }, // bottom
      { x: 300, y: 250 }, // bottom-end
      { x: -200, y: 0 }, // left-start
      { x: -200, y: -50 }, // left
      { x: -200, y: 50 }, // left-end
      { x: 500, y: 0 }, // right-start
      { x: 500, y: -50 }, // right
      { x: 500, y: 50 }, // right-end
    ])
  })
})

describe("translateWithOffset", () => {
  it("adds the offset to the correct axis", () => {
    expect(
      positions.map((position) =>
        translateWithOffset({ x: 0, y: 0 }, position, 10)
      )
    ).toEqual([
      "translate(0px, -10px)", // top-start
      "translate(0px, -10px)", // top
      "translate(0px, -10px)", // top-end
      "translate(0px, 10px)", // bottom-start
      "translate(0px, 10px)", // bottom
      "translate(0px, 10px)", // bottom-end
      "translate(-10px, 0px)", // left-start
      "translate(-10px, 0px)", // left
      "translate(-10px, 0px)", // left-end
      "translate(10px, 0px)", // right-start
      "translate(10px, 0px)", // right
      "translate(10px, 0px)", // right-end
    ])
  })
})

describe("shouldFlip", () => {
  it("returns false when safe", () => {
    expect(
      positions.map((position) =>
        shouldFlip({
          targetPosition: { x: 0, y: 0 },
          position,
          boundaryRect: { top: 0, right: 500, bottom: 600, left: 0 },
          tooltipRect: { width: 100, height: 100 },
        })
      )
    ).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ])
  })

  it("returns true when at page boundaries", () => {
    expect(
      positions.map((position) =>
        shouldFlip({
          targetPosition: { x: 401, y: 501 },
          position,
          boundaryRect: { top: 0, right: 500, bottom: 600, left: 0 },
          tooltipRect: { width: 100, height: 100 },
        })
      )
    ).toEqual([
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
    ])
  })
})
