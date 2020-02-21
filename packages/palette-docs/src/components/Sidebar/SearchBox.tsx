import { Input } from "@artsy/palette"
import React, { useEffect } from "react"

export function SearchBox() {
  useEffect(() => {
    console.log("doing the thing with ", window.docsearchSettings)
    docsearch({
      apiKey: window.docsearchSettings.apiKey,
      indexName: window.docsearchSettings.indexName,
      inputSelector: "#search",
      debug: "false",
    })
  }, [])
  return <Input id="search" placeholder="Search docs" />
}
