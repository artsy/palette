/**
 * @jest-environment node
 */
import fs from "fs"
import { createRequire } from "module"
import path from "path"
import postcss, { AtRule, Container, Root } from "postcss"

// Runs against the output of `yarn compile` (see the `pretest:build` script).

const DIST = path.resolve(__dirname, "../../../dist")
const PALETTE_CSS = path.join(DIST, "palette.css")
const JS_OUTPUT_DIRS = [path.join(DIST, "esm"), path.join(DIST, "cjs")]

const LAYER_ORDER =
  "@layer palette.reset, palette.components, palette.utilities.base, palette.utilities.xs, palette.utilities.sm, palette.utilities.md, palette.utilities.lg;"

const ALLOWED_VANILLA_EXTRACT_IMPORTS = [
  "@vanilla-extract/sprinkles/createRuntimeSprinkles",
]

const listFiles = (dir: string): string[] => {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath]
  })
}

const jsOutputFiles = () => {
  return JS_OUTPUT_DIRS.flatMap(listFiles).filter((file) => {
    return file.endsWith(".js") || file.endsWith(".d.ts")
  })
}

const isInsidePaletteLayer = (node: { parent?: Container | Root }) => {
  let parent = node.parent
  while (parent) {
    if (
      parent.type === "atrule" &&
      (parent as AtRule).name === "layer" &&
      (parent as AtRule).params.startsWith("palette.")
    ) {
      return true
    }
    parent = (parent as { parent?: Container | Root }).parent
  }
  return false
}

const collectStrings = (value: unknown): string[] => {
  if (typeof value === "string") return [value]
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings)
  }
  return []
}

const readPaletteCss = () => {
  return fs.readFileSync(PALETTE_CSS, "utf8")
}

// Node's own require for CJS: Jest's module registry ignores dist/. The ESM
// modules only declare string constants, so their literals are read directly.
const nodeRequire = createRequire(__filename)
const EXPORTED_STRINGS = {
  cjs: (file: string) => collectStrings(nodeRequire(file)),
  esm: (file: string) => {
    const literals = fs.readFileSync(file, "utf8").match(/'[^']*'|"[^"]*"/g)
    return (literals || []).map((literal) => literal.slice(1, -1))
  },
}

describe("compiled vanilla-extract output", () => {
  it("writes dist/palette.css, starting with the layer order", () => {
    expect(fs.existsSync(PALETTE_CSS)).toBe(true)
    expect(readPaletteCss().split("\n")[0]).toBe(LAYER_ORDER)
  })

  it("puts every rule inside a palette layer", () => {
    const root = postcss.parse(readPaletteCss())
    const unlayered: string[] = []

    root.walkRules((rule) => {
      if (!isInsidePaletteLayer(rule)) unlayered.push(rule.selector)
    })

    expect(unlayered).toEqual([])
  })

  it("never imports CSS from JS", () => {
    const files = jsOutputFiles()
    expect(files.length).toBeGreaterThan(0)

    const offenders = files.filter((file) => {
      return /\.css["']/.test(fs.readFileSync(file, "utf8"))
    })

    expect(offenders).toEqual([])
  })

  it("never calls vanilla-extract at runtime", () => {
    const offenders = jsOutputFiles()
      .filter((file) => file.endsWith(".js"))
      .flatMap((file) => {
        const source = fs.readFileSync(file, "utf8")
        const specifiers = source.match(/["']@vanilla-extract\/[^"']+["']/g)
        return (specifiers || [])
          .map((specifier) => specifier.slice(1, -1))
          .filter((specifier) => {
            return !ALLOWED_VANILLA_EXTRACT_IMPORTS.includes(specifier)
          })
          .map((specifier) => `${path.relative(DIST, file)}: ${specifier}`)
      })

    expect(offenders).toEqual([])
  })

  it.each(["cjs", "esm"] as const)(
    "exports only class names that exist in dist/palette.css (%s)",
    (format) => {
      const root = postcss.parse(readPaletteCss())
      const classNames = new Set<string>()
      const layerNames = new Set<string>()

      root.walkRules((rule) => {
        ;(rule.selector.match(/\.[A-Za-z_-][\w-]*/g) || []).forEach((match) => {
          classNames.add(match.slice(1))
        })
      })
      root.walkAtRules("layer", (atRule) => {
        atRule.params.split(",").forEach((name) => layerNames.add(name.trim()))
      })

      const cssModules = listFiles(path.join(DIST, format)).filter((file) => {
        return file.endsWith(".css.js")
      })
      expect(cssModules.length).toBeGreaterThan(0)

      const tokens = cssModules
        .flatMap(EXPORTED_STRINGS[format])
        .flatMap((value) => value.split(/\s+/).filter(Boolean))

      const exportedClassNames = tokens.filter((token) => {
        return /^[A-Za-z_-][\w-]*$/.test(token)
      })
      const exportedLayerNames = tokens.filter((token) => {
        return token.startsWith("palette.")
      })

      expect(exportedClassNames.length).toBeGreaterThan(0)
      expect(
        exportedClassNames.filter((name) => !classNames.has(name))
      ).toEqual([])
      expect(
        exportedLayerNames.filter((name) => !layerNames.has(name))
      ).toEqual([])
    }
  )
})
