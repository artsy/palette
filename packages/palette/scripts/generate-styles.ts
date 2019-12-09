import * as prettier from "prettier"
import { themeProps } from "../src/Theme"

import * as fs from "fs"

const spaceMapping = {
  m: v => `margin: ${v};`,
  mt: v => `margin-top: ${v};`,
  mb: v => `margin-bottom: ${v};`,
  ml: v => `margin-left: ${v};`,
  mr: v => `margin-right: ${v};`,
  mx: v => `margin-right: ${v}; margin-left: ${v};`,
  my: v => `margin-top: ${v}; margin-bottom: ${v};`,
  p: v => `padding: ${v};`,
  pt: v => `padding-top: ${v};`,
  pb: v => `padding-bottom: ${v};`,
  pl: v => `padding-left: ${v};`,
  pr: v => `padding-right: ${v};`,
  px: v => `padding-right: ${v}; padding-left: ${v};`,
  py: v => `padding-top: ${v}; padding-bottom: ${v};`,
}

const bg = v => `background: ${v};`
const color = v => `color: ${v};`

interface Font {
  fontStyle?: any
  fontVariant?: any
  fontWeight?: any
  fontSize?: any
  lineHeight?: any
  fontFamily?: any
}

const font = ({
  fontStyle = "",
  fontVariant = "",
  fontWeight = "",
  fontSize = "",
  lineHeight = "",
  fontFamily,
}: Font) =>
  `font: ${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}${
    fontSize && lineHeight ? "px/" + lineHeight : lineHeight
  }px ${fontFamily};`

let styles: string = ""
let variables: string = ""

Object.entries(themeProps.space).forEach(([unit, value]) => {
  variables += `--space-${unit.replace(".", "_")}: ${value}px;`
  Object.entries(spaceMapping).forEach(([classPrefix, cssGenerator]) => {
    styles += `.${classPrefix}-${unit.replace(".", "_")} { ${cssGenerator(
      value + "px"
    )} }`
  })
})

Object.entries(themeProps.colors).forEach(([name, value]) => {
  variables += `--color-${name}: ${value};`

  styles += `
  .color-${name} { ${color(value)} }
  .bg-color-${name} { ${bg(value)} }
`
})

Object.keys(themeProps.fontFamily).forEach(
  (family: keyof typeof themeProps.fontFamily) => {
    Object.entries(themeProps.fontFamily[family]).forEach(
      ([type, properties]) => {
        Object.entries(themeProps.typeSizes[family]).forEach(
          ([size, sizeProps]) => {
            // Ensure all props are objects
            const normalizedProps =
              typeof properties === "string"
                ? {
                    fontFamily: properties,
                  }
                : properties

            const formattedType =
              type === "regular"
                ? ""
                : "-" + type.replace(/([A-Z])/, "-$1").toLowerCase()

            styles += `
            .${family}-${size}${formattedType} {
              ${font({ ...normalizedProps, ...sizeProps })}
            }
          `
          }
        )
      }
    )
  }
)

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
