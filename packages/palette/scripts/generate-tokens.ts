import { themeProps } from "../src/Theme"

import * as fs from "fs"

const data = JSON.stringify(themeProps, null, 2)
const path = "tokens.json"

fs.writeFileSync(path, data, "utf8")
