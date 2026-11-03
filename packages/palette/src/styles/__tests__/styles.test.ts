describe("vanilla-extract styles in jsdom", () => {
  it("load through the jest transform without runtime style errors", async () => {
    const consoleError = jest.spyOn(console, "error")

    const { layers } = await import("../layers.css")
    const { boxSizingReset } = await import("../reset.css")

    expect(layers.reset).toBe("palette.reset")
    expect(boxSizingReset).toEqual(expect.any(String))
    expect(boxSizingReset).not.toBe("")
    expect(consoleError).not.toHaveBeenCalled()

    consoleError.mockRestore()
  })
})
