import CMS, { init } from "netlify-cms"

const isClient = typeof window !== "undefined"
const isDevelopment = process.env.NODE_ENV === "development"

if (isClient) {
  window.CMS_MANUAL_INIT = true
}

if (isDevelopment) {
  const { FileSystemBackend } = require("netlify-cms-backend-fs")
  CMS.registerBackend("file-system", FileSystemBackend)
}

init()
