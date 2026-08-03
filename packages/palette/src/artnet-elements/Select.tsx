import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled from "styled-components"
import { Box } from "../elements/Box"
import { Select as BaseSelect, SelectProps } from "../elements/Select"

/**
 * The real Price Database's dropdown-style fields use the same
 * underline-only treatment as its text inputs (confirmed via computed
 * styles on the live site) — no left/right/top border, no box, unlike
 * the base Select's full bordered box. A plain `select` descendant
 * selector reaches the nested native element regardless of the base
 * component's internal DOM structure or generated class names.
 */
const Container = styled(Box)`
  select {
    border-width: 0 0 1px 0;
    border-color: ${themeGet("colors.mono30")};

    &:focus {
      border-color: ${themeGet("colors.mono100")};
    }
  }
`

export const Select: React.FC<SelectProps> = (props) => (
  <Container>
    <BaseSelect {...props} />
  </Container>
)
