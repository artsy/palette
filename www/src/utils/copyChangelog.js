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
order: 10
type: page
hideInNav: false
navSpacer:
  mt: 1
---

${changelog}
`.trim()

module.exports = function copyChangelog() {
  fs.writeFileSync("content/pages/CHANGELOG.mdx", changelogMarkdownPage, "utf8")
}
