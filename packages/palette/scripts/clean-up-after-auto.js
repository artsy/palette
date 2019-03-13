// auto uses `npm version` to bump a version and add a commit with that change.
// however, `npm version` only adds a commit if the package.json is at the repo
// root, and you can't tell it to ignore that check.

// so now after auto is finished, the version has been bumped but the change
// to package.json has not been comitted. This file is a temporary workaround
// to make that happen.

// @ts-check

const { execSync } = require("child_process")

console.log("🙈 Cleaning up after auto")
// first check that there is an unstaged change to the package.json
console.log(" - Getting changed files")
const changedFiles = execSync("git diff --name-only")
  .toString()
  .trim()
if (changedFiles !== "packages/palette/package.json") {
  console.error("ERROR in clean-up-after-auto.js")
  if (!changedFiles) {
    console.error(
      "No unstaged changes. Has auto been updated? Then you can delete this file!"
    )
  } else {
    console.error("Unexpected changed files")
    console.log(changedFiles)
  }
  process.exit(1)
}

// then commit the change
// @ts-ignore
const version = require("../package.json").version
console.log(" - comitting change to package.json")
execSync(`git commit -am 'Bump version to: ${version} [skip ci]'`)
// then puuuush
console.log(" - pushing version bump commit")
execSync(`git push --follow-tags`)
// all done
console.log("✨ All clean")
