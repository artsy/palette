import { Input } from "@artsy/palette"
import React, { useEffect } from "react"

export function SearchBox() {
  useEffect(() => {
    if (window.docsearchSettings === undefined) {
      return
    }
    console.log("doing the thing with ", window.docsearchSettings)
    docsearch({
      apiKey: window.docsearchSettings.apiKey,
      indexName: window.docsearchSettings.indexName,
      inputSelector: "#search",
      debug: window.docsearchSettings.indexName,
    })
  }, [])
  return <Input id="search" placeholder="Search docs" />
}
