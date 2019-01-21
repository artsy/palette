// @ts-check

const path = require("path")
const prettier = require("prettier")
const { jsx } = require("docz-utils")

/**
 * This traverses the .mdx AST searching for a <Playground> component and if
 * found, take its contents and inject them in as stringified code. This is so
 * we can avoid needing to use markdown code blocks in order to render an
 * interactive editor.
 *
 * NOTE: When working in this file a cache builds up in gatsby. Changes require
 * a boot using `yarn clean`.
 *
 * TODO:
 *  - Don't hardcode component name
 *  - Write test
 */

const COMPONENT_NAME = "Playground"

// Matches the compnoent tag
const tagRegex = new RegExp(`<[\/]{0,1}(${COMPONENT_NAME})[^><]*>`, "g")

// Matches JSX attributes
const attributesRegex = /([\w\-.:]+)\s*=\s*("[^"]*"|{[^]*}|'[^']*')/g

module.exports = () => {
  return tree => {
    const jsxNodes = tree.children.filter(child => child.type === "jsx")

    jsxNodes.forEach(node => {
      // Iterate over JSX children looking for `<Playground>` node
      const isPlayground = node.value.includes(`<${COMPONENT_NAME}`)
      if (!isPlayground) {
        return
      }

      // Get the playground tag
      const tag = node.value.match(tagRegex)[0]
      // Capture the props
      let props = tag.match(attributesRegex)
      props = props ? props.join("") : ""
      // Remove outer playground tag and capture contents
      const codeContents = node.value.replace(tagRegex, "")
      const code = prettifyCode(codeContents).substring(1) // remove leading ;
      const sanitized = jsx.sanitizeCode(code)
      node.value = "<CodeEditor " + props + " code={`" + sanitized + "`} />"
    })

    return tree
  }
}

// Helpers

const packagePath = path.resolve(__dirname, "../", "package.json")
const prettierOptions = prettier.resolveConfig.sync(packagePath)
const prettifyCode = code => {
  return prettier.format(code, {
    parser: "babylon",
    ...prettierOptions,
  })
}
