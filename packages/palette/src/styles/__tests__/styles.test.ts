describe("vanilla-extract styles in jsdom", () => {
  it("load through the jest transform without runtime style errors", async () => {
    const consoleError = jest.spyOn(console, "error")

    const { layers } = await import("../layers.css")
    const { dynamicClasses } = await import("../dynamic.css")
    const { tokenClasses } = await import("../sprinkles.css")

    expect(layers.reset).toBe("palette.reset")
    expect(dynamicClasses.sm["margin-top"]).toEqual(expect.any(String))
    expect(dynamicClasses.sm["margin-top"]).not.toBe("")
    expect(tokenClasses.sm["margin-top"]["2"]).toEqual(expect.any(String))
    expect(tokenClasses.sm["margin-top"]["2"]).not.toBe("")
    expect(consoleError).not.toHaveBeenCalled()

    consoleError.mockRestore()
  })
})
