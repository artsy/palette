import { takeRight } from "lodash"

const BASE_EDIT_URL =
  "https://github.com/artsy/palette/edit/main/packages/palette-docs/content/"

export function getEditUrl(fileAbsolutePath) {
  const pathParts = fileAbsolutePath.split("/")
  const startIndex = pathParts.findIndex((p) => p === "docs")
  const fileName = takeRight(pathParts, pathParts.length - startIndex).join("/")
  const editUrl = BASE_EDIT_URL + fileName
  return editUrl
}
