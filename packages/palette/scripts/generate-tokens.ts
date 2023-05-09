import { THEME } from "../src/Theme"

import * as fs from "fs"

const data = JSON.stringify(THEME, null, 2)
const path = "dist/tokens.json"

fs.writeFileSync(path, data, "utf8")
