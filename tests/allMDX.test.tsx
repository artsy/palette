import { toMatchImageSnapshot } from "jest-image-snapshot"
expect.extend({ toMatchImageSnapshot })
import { readFileSync } from "fs"

import * as babel from "@babel/core"
import mdx from "@mdx-js/mdx"
import { render } from "jest-puppeteer-react"
import requireFromString from "require-from-string"

require("ts-node").register({})
//
const BLOCKS_REGEX = "[a-z\\.]+(\\.){0,1}[a-z\\.]"

declare const page: any

declare global {
  namespace jest {
    interface Matchers<R> {
      /** Checks and sets up SVG rendering for React Components. */
      toMatchImageSnapshot(): void
    }
  }
}

// it("reads Tooltip.mdx", async () => {
//   const contents = readFileSync("docs/Tooltip.mdx", "utf8")
//   // const astCompiler = mdx.createMdxAstCompiler({
//   //   footnotes: true,
//   //   mdPlugins: [],
//   //   hastPlugins: [],
//   //   compilers: [],
//   //   blocks: [BLOCKS_REGEX],
//   // })
//   // const output = astCompiler.processSync({ contents })

//   // This is a JS file
//   const jsVersionOfMDX: string = mdx.sync(contents)
//   //
//   const playgrounds = jsVersionOfMDX
//     .split("<Playground>")
//     .map(p => p.split("</Playground>")[0])

//   // The head is the imports
//   const originalImports = playgrounds[0].split("export")[0]
//   const imports = originalImports.replace(/src/, "dist")

//   // The tail is the playgrounds (this just removes the first item)
//   playgrounds.splice(0, 1)

//   const options = babel.loadOptions ? babel.loadOptions({}) : { plugins: [] }
//   const filename = "docs/Tooltip.mdx"
//   const fileOpts = {
//     filename,
//     filenameRelative: filename,
//     sourceMap: false,
//     sourceFileName: undefined,
//     sourceType: "module",
//     plugins: options.plugins,
//   }

//   // console.log(imports)
//   // console.log(playgrounds)

//   const js = `
//   ${imports}

//   export default () => ${playgrounds[0]}
//   `

//   const result = babel.transform(js, fileOpts)
//   const component = requireFromString(result.code, filename).default
//   console.log("----")
//   // console.log(component())
//   console.log("----")
//   // const component = requireFromString(
//   //   "console.log(__dirname); console.log('HI')",
//   //   filename
//   // )

//   await render(() => component, { viewport: { width: 800, height: 600 } })

//   // console.log("-------------------------")
//   const screenshot = await page.screenshot()
//   expect(screenshot).toMatchImageSnapshot()
//   //
//   // console.log(result)
// })

// // test('should render a button', async () => {
// //     await render(
// //         <Button>Button</Button>,
// //         { viewport: { width: 100, height: 100 } }
// //     );
// //     const screenshot = await page.screenshot();
// //     expect(screenshot).toMatchImageSnapshot();

// // });

import { Box } from "../src"

it("reads Tooltip.mdx", async () => {
  await render(() => <p>Hi</p>, { viewport: { width: 800, height: 600 } })

  // console.log("-------------------------")
  const screenshot = await page.screenshot()

  expect(screenshot).toMatchImageSnapshot()
})

// // test('should render a button', async () => {
// //     await render(
// //         <Button>Button</Button>,
// //         { viewport: { width: 100, height: 100 } }
// //     );
// //     const screenshot = await page.screenshot();
// //     expect(screenshot).toMatchImageSnapshot();

// // });
