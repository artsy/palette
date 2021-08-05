import { injectGlobalStyles } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"

export const { GlobalStyles } = injectGlobalStyles(`
  a {
    &:hover {
      text-decoration: none;
    }
  }

  code {
    font-size: 14px;
    background: #f3f3f3;
    padding: 2px;
    padding-left: 5px;
    padding-right: 5px;
    color: ${themeGet("colors.black60")};
    border-radius: 3px;
  }

  div {
    &.contentDiv {
      a {
        text-decoration: underline;

        &:hover {
          color: ${themeGet("colors.brand")};
        }
      }

      margin-bottom: ${themeGet("space.2")}px;
    }
  }

  ol {
    list-style-type: auto;
    padding-left: ${themeGet("space.2")}px;
  }
`)
