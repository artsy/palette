import { boxMixin } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"

export const Table = styled.table`
  width: 100%;
  border: 1px solid ${themeGet("colors.black10")};
  border-collapse: collapse;
  ${boxMixin}

  > thead > tr > th {
    text-align: left;
    font-weight: normal;
  }

  > thead > tr > th,
  > tbody > tr > td {
    border-bottom: 1px solid ${themeGet("colors.black10")};
    border-left: 1px solid ${themeGet("colors.black10")};
    padding: ${themeGet("space.1")};
  }
`
