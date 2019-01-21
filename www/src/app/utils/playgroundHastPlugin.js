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
 *  - Add ability to pass in props, eg <Playground editable={false} />
 */

module.exports = () => {
  const COMPONENT_NAME = "Playground"
  const playgroundTagRe = new RegExp(
    `<[\/]{0,1}(${COMPONENT_NAME})[^><]*>`,
    "g"
  )

  return tree => {
    const jsxNodes = tree.children.filter(child => child.type === "jsx")

    // Iterate over JSX children looking for `<Playground>` node
    jsxNodes.forEach(async node => {
      const foundPlayground = node.value.includes(`<${COMPONENT_NAME}>`)

      if (foundPlayground) {
        const newNode = node.value.replace(playgroundTagRe, "")
        const wrap = children => children //`<Playground>${children}</Playground>`
        let code = prettifyCode(wrap(newNode))

        // Remove leading ; inserted from Prettier
        if (code.substr(0, 1) === ";") {
          code = code.substring(1)
        }

        const sanitized = jsx.sanitizeCode(code)
        node.value = "<CodeEditor code={`" + sanitized + "`} />"
      }
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
