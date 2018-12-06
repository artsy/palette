import { toMatchImageSnapshot } from "jest-image-snapshot"
expect.extend({ toMatchImageSnapshot })
import { readFileSync } from "fs"

import mdx from "@mdx-js/mdx"
import { render } from "jest-puppeteer-react"

import babel from "@babel/parser"

const BLOCKS_REGEX = "[a-z\\.]+(\\.){0,1}[a-z\\.]"

it("reads Tooltip.mdx", async () => {
  const contents = readFileSync("docs/Tooltip.mdx", "utf8")
  // const astCompiler = mdx.createMdxAstCompiler({
  //   footnotes: true,
  //   mdPlugins: [],
  //   hastPlugins: [],
  //   compilers: [],
  //   blocks: [BLOCKS_REGEX],
  // })
  // const output = astCompiler.processSync({ contents })

  // This is a JS file
  const jsVersionOfMDX: string = mdx.sync(contents)
  //
  const playgrounds = jsVersionOfMDX
    .split("<Playground>")
    .map(p => p.split("</Playground>")[0])

  // The head is the imports
  const imports = playgrounds[0].split("export")[0]
  // The tail is the playgrounds (this just removes the first item)
  playgrounds.splice(0, 1)

  const js = babel.parse(imports + playgrounds[0], {
    // parse in strict mode and allow module declarations
    sourceType: "module",

    plugins: [
      // enable jsx and flow syntax
      "jsx",
      "flow",
    ],
  })

  // console.log(imports)
  // console.log(playgrounds)
  console.log(js)
})
