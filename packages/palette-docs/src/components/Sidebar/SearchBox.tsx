import { Input } from "@artsy/palette"
import React, { useEffect } from "react"
import "./algolia.css"

declare global {
  interface Window {
    docsearch: any
    docsearchSettings: any
  }
}

export function SearchBox() {
  useEffect(() => {
    if (window.docsearchSettings === undefined) {
      return
    }
    window.docsearch({
      apiKey: window.docsearchSettings.apiKey,
      indexName: window.docsearchSettings.indexName,
      inputSelector: "#search",
      debug: window.docsearchSettings.indexName,
    })
  }, [])
  return <Input id="search" placeholder="Search docs" />
}
