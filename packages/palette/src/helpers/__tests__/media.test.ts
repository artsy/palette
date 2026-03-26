import { media } from "../media"

describe("media", () => {
  it("returns the mediaQuery", () => {
    expect(media.xs``.join("")).toMatch(/@media \(max-width:\s*767px\)/)
    expect(media.sm``.join("")).toMatch(/@media \(max-width:\s*768px\)/)
    expect(media.md``.join("")).toMatch(/@media \(max-width:\s*1280px\)/)
    expect(media.lg``.join("")).toMatch(/@media \(max-width:\s*1920px\)/)
  })
})
