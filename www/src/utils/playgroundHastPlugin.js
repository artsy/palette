// @ts-check

const prettier = require("prettier")
const path = require("path")

const prettierOptions = prettier.resolveConfig.sync(
  path.resolve(__dirname, "../", "package.json")
)

// FIXME: Dont hardcode this
const componentDisplayName = "Playground"
const removePlaygroundTag = new RegExp(
  `<[\/]{0,1}(${componentDisplayName})[^><]*>`,
  "g"
)

module.exports = () => tree => {
  tree.children
    .filter(child => child.type === "jsx")
    .forEach(child => {
      const hasPlayground = child.value.includes(`<${componentDisplayName}>`)
      if (hasPlayground) {
        const jsxChildren = child.value.replace(removePlaygroundTag, "")

        let formatted = prettier.format(jsxChildren, {
          parser: "babylon",
          ...prettierOptions,
        })

        // Remove leading ; inserted from Prettier
        if (formatted.substr(0, 1) === ";") {
          formatted = formatted.substring(1)
        }

        child.value = "<Playground code={`" + formatted + "`} />"
      }
    })

  return tree
}
