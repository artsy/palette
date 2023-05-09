import * as prettier from "prettier"
import { THEME } from "../src/Theme"

import * as fs from "fs"

const spaceMapping = {
  m: (v) => `margin: ${v};`,
  mt: (v) => `margin-top: ${v};`,
  mb: (v) => `margin-bottom: ${v};`,
  ml: (v) => `margin-left: ${v};`,
  mr: (v) => `margin-right: ${v};`,
  mx: (v) => `margin-right: ${v}; margin-left: ${v};`,
  my: (v) => `margin-top: ${v}; margin-bottom: ${v};`,
  p: (v) => `padding: ${v};`,
  pt: (v) => `padding-top: ${v};`,
  pb: (v) => `padding-bottom: ${v};`,
  pl: (v) => `padding-left: ${v};`,
  pr: (v) => `padding-right: ${v};`,
  px: (v) => `padding-right: ${v}; padding-left: ${v};`,
  py: (v) => `padding-top: ${v}; padding-bottom: ${v};`,
}

const bg = (v) => `background: ${v};`
const color = (v) => `color: ${v};`

let styles = ""
let variables = ""

Object.entries(THEME.space).forEach(([unit, value]) => {
  variables += `--space-${unit.replace(".", "_")}: ${value};`
  Object.entries(spaceMapping).forEach(([classPrefix, cssGenerator]) => {
    styles += `.${classPrefix}-${unit.replace(".", "_")} { ${cssGenerator(
      value
    )} }`
  })
})

Object.entries(THEME.colors).forEach(([name, value]) => {
  variables += `--color-${name}: ${value};`

  styles += `
  .color-${name} { ${color(value)} }
  .bg-color-${name} { ${bg(value)} }
`
})

Object.entries(THEME.fonts).forEach(([fontName, fontFamily]) => {
  Object.entries(THEME.textVariants).forEach(([size, textTreatment]) => {
    styles += `
      .${fontName}-${size} {
        font-family: ${fontFamily};
        line-height: ${textTreatment.lineHeight};
        ${textTreatment.fontSize ? `font-size: ${textTreatment.fontSize};` : ""}
        ${
          textTreatment.fontWeight
            ? `font-weight: ${textTreatment.fontWeight};`
            : ""
        }
        ${
          textTreatment.letterSpacing
            ? `letter-spacing: ${textTreatment.letterSpacing};`
            : ""
        }
      }`
  })
})

const stylesheet = `
  :root {
    ${variables}
  }
  ${styles}
`
const formattedStylesheet = prettier.format(stylesheet, {
  parser: "css",
  printWidth: 120,
})

fs.writeFileSync("dist/styles.css", formattedStylesheet, "utf8")
