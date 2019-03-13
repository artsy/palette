import { themeProps } from "../src/Theme"

import tokens from "../tokens.json"

// if this test fails, get them back in sync like this:
// $ yarn generate-tokens
it("tokens file does not drift from the theme props", () => {
  expect(tokens).toEqual(themeProps)
})
