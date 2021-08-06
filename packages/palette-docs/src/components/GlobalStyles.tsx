import { injectGlobalStyles } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"

export const { GlobalStyles } = injectGlobalStyles(`
  body: {
    margin: 0;
  }

  h1,h2,h3,h4 {
    position: relative;

    &:hover {
      .header-link-icon {
        visibility: visible;
      }
    }

  }

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

  .header-link-icon {
    position: absolute;
    top: 0;
    left: -25px;
    visibility: hidden;
    width: 100%;
  }
`)
