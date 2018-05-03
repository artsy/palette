import React from "react"
import styled from "styled-components/native"
import { color, fontSize, lineHeight, maxWidth, space, textAlign } from "styled-system"



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


const Sans = styled.Text`
  font-family: ${fontFamily.unica.medium};
  ${color}
  ${fontSize}
  ${lineHeight}
  ${space}
  ${textAlign}
  ${maxWidth}
`

const Serif = styled.Text`
  font-family: ${fontFamily.garamond.regular};
  ${color}
  ${fontSize}
  ${lineHeight}
  ${space}
  ${textAlign}
  ${maxWidth}
`

const Display = styled.Text`
  font-family: ${fontFamily.avantgarde.regular};
  ${color}
  ${fontSize}
  ${lineHeight}
  ${space}
  ${textAlign}
  ${maxWidth}
`

export const Sans1 = props => <Sans {...props} fontSize={10} lineHeight={16} />
export const Sans2 = props => <Sans {...props} fontSize={12} lineHeight={18} />
export const Sans3 = props => <Sans {...props} fontSize={14} lineHeight={24} />
export const Sans3t = props => <Sans {...props} fontSize={14} lineHeight={20} />
export const Sans4 = props => <Sans {...props} fontSize={16} lineHeight={26} />
export const Sans4t = props => <Sans {...props} fontSize={16} lineHeight={22} />
export const Sans5 = props => <Sans {...props} fontSize={18} lineHeight={30} />
export const Sans5t = props => <Sans {...props} fontSize={18} lineHeight={26} />
export const Sans6 = props => <Sans {...props} fontSize={22} lineHeight={30} />
export const Sans8 = props => <Sans {...props} fontSize={28} lineHeight={36} />
export const Sans10 = props => <Sans {...props} fontSize={42} lineHeight={50} />
export const Sans12 = props => <Sans {...props} fontSize={60} lineHeight={66} />

export const Serif1 = props => <Serif {...props} fontSize={12} lineHeight={16} />
export const Serif2 = props => <Serif {...props} fontSize={14} lineHeight={18} />
export const Serif3 = props => <Serif {...props} fontSize={16} lineHeight={24} />
export const Serif3t = props => <Serif {...props} fontSize={16} lineHeight={20} />
export const Serif4 = props => <Serif {...props} fontSize={18} lineHeight={26} />
export const Serif4t = props => <Serif {...props} fontSize={18} lineHeight={22} />
export const Serif5 = props => <Serif {...props} fontSize={22} lineHeight={32} />
export const Serif5t = props => <Serif {...props} fontSize={22} lineHeight={28} />
export const Serif6 = props => <Serif {...props} fontSize={26} lineHeight={32} />
export const Serif8 = props => <Serif {...props} fontSize={32} lineHeight={38} />
export const Serif10 = props => <Serif {...props} fontSize={44} lineHeight={50} />
export const Serif12 = props => <Serif {...props} fontSize={66} lineHeight={70} />

export const Display2 = props => <Display {...props} fontSize={10} lineHeight={12} />
export const Display3t = props => <Display {...props} fontSize={12} lineHeight={16} />
export const Display4t = props => <Display {...props} fontSize={14} lineHeight={18} />
export const Display5t = props => <Display {...props} fontSize={16} lineHeight={20} />
export const Display6 = props => <Display {...props} fontSize={18} lineHeight={22} />
export const Display8 = props => <Display {...props} fontSize={22} lineHeight={24} />
