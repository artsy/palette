import { themeGet } from "@styled-system/theme-get"
import { createGlobalStyle, css } from "styled-components"

/**
 * Injects globally relevant styles, including helper classes for our Typography.
 * Apps that use palette should mount this component at the root of their tree.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function injectGlobalStyles<P extends object>(
  additionalStyles?: string | ReturnType<typeof css>
) {
  const GlobalStyles = createGlobalStyle<P>`
    html {
      box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }

    &:focus {
      outline: 0;
    }

    &:focus-visible {
      outline: 1px solid ${themeGet("colors.blue100")};
    }

    ::selection {
      background-color: ${themeGet("colors.blue15")};
      color: ${themeGet("colors.mono100")};
    }

    html,
    body,
    #root {
      -webkit-tap-highlight-color: transparent;
      height: 100%;
    }

    body {
      margin: 0;
      padding: 0;
    }

    html, body {
      font-family: ${themeGet("fonts.sans")};
      font-size: ${themeGet("textVariants.sm.fontSize")};
      line-height: ${themeGet("textVariants.sm.lineHeight")};
      background-color: ${themeGet("colors.mono0")};
      color: ${themeGet("colors.mono100")};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }

    a {
      cursor: pointer;
      color: inherit;
      transition: color 0.25s;
      text-decoration: underline;

      &:hover {
        color: ${themeGet("colors.mono100")};
      }

      &:active {
        color: ${themeGet("colors.mono100")};
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-style: inherit;
      font-family: inherit;
      font-weight: inherit;
      font-size: inherit;
      margin: 0;
    }

    dl,
    dt,
    dd {
      margin: 0;
    }

    ol,
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    ${additionalStyles};
  `

  GlobalStyles.displayName = "GlobalStyles"

  return {
    GlobalStyles,
  }
}
