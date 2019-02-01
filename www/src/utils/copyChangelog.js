const fs = require("fs")
const path = require("path")

// FIXME: Find a better way to do this...

const changelog = fs.readFileSync(
  path.resolve(__dirname, "../../../", "CHANGELOG.md"),
  {
    encoding: "utf8",
  }
)

const changelogMarkdownPage = `
---
name: Change log
type: page
hideInNav: false
navSpacer:
  mt: 0
---

${changelog}
`.trim()

module.exports = function copyChangelog() {
  fs.writeFileSync(
    "content/docs/home/changelog.mdx",
    changelogMarkdownPage,
    "utf8"
  )
}
