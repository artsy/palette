import { css } from "styled-components/primitives"

// @ts-ignore - https://github.com/styled-components/styled-components/issues/1063#issuecomment-320344957
import { StyledComponentClass, Styles } from "styled-components"

import {
  color,
  fontSize,
  lineHeight,
  maxWidth,
  space,
  textAlign,
} from "styled-system"

const fontFamily = {
  unica: {
    regular: "'Unica77LL-Regular', 'Unica77LLWebRegular'",
    italic: "'Unica77LL-Italic', 'Unica77LLWebItalic'",
    medium: "'Unica77LL-Medium', 'Unica77LLWebMedium'",
    mediumItalic: "'Unica77LL-MediumItalic', 'Unica77LLWebMediumItalic'",
  },
  avantgarde: {
    regular:
      "'AvantGardeGothicITC', 'ITC Avant Garde Gothic W04','AvantGardeGothicITCW01D 731075', AvantGardeGothicITCW01Dm, Helvetica, sans-serif",
  },
  garamond: {
    regular:
      "'AGaramondPro-Regular', 'Adobe Garamond W08', 'adobe-garamond-pro', 'AGaramondPro-Regular', 'Times New Roman', Times, serif",
  },
}

// const sizes: {
//   sans: {

//   }
// }

export const Sans = css`
  font-family: ${fontFamily.unica.medium};
  ${color}
  ${fontSize}
  ${lineHeight}
  ${space}
  ${textAlign}
  ${maxWidth}
`

export const Serif = css`
  font-family: ${fontFamily.garamond.regular};
  ${color}
  ${fontSize}
  ${lineHeight}
  ${space}
  ${textAlign}
  ${maxWidth}
`

export const Display = css`
  font-family: ${fontFamily.avantgarde.regular};
  ${color}
  ${fontSize}
  ${lineHeight}
  ${space}
  ${textAlign}
  ${maxWidth}
`
