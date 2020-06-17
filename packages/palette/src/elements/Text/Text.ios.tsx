import {
  TEXT_FONT_SIZES,
  TEXT_LETTER_SPACING,
  TEXT_LINE_HEIGHTS,
  TextFontSize,
  TextLetterSpacing,
  TextLineHeight,
} from "./tokens"

/**
 * em-units don't exist on React Native so we convert it to a number
 * which will be evaluated as px based on the given font-size.
 */
export const calculateLetterSpacing = (
  fontSize: TextFontSize,
  letterSpacing: TextLetterSpacing
): number => {
  const tracking = parseFloat(TEXT_LETTER_SPACING[letterSpacing])
  const size = parseInt(TEXT_FONT_SIZES[fontSize], 10)
  return size * tracking
}

/**
 * unitless line-heights don't exist on React Native so we convert it
 * to a px string. Since unitless line-heights are valid/normal, styled-system
 * won't convert it to px.
 */
export const calculateLineHeight = (
  fontSize: TextFontSize,
  lineHeight: TextLineHeight
): string => {
  const size = parseInt(TEXT_FONT_SIZES[fontSize], 10)
  return `${size * TEXT_LINE_HEIGHTS[lineHeight]}px`
}
