import styled from "styled-components"
import { Text, TextProps } from "../Text"

export type SupProps = TextProps

export const Sup = styled(Text)`
  display: inline;
  vertical-align: super;
  font-size: 75% !important;
  line-height: 0 !important; // Avoids shifting the line-height
  font-weight: inherit !important;
`
