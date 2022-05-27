import { LabeledInput, MagnifyingGlassIcon } from "@artsy/palette"
import { navigate } from "gatsby"
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
      handleSelected: (_input, _context, suggestion) => {
        const { pathname, hash } = new URL(suggestion.url)
        navigate(`${pathname}${hash}`)
      },
    })
  }, [])

  return (
    <LabeledInput
      label={<MagnifyingGlassIcon fill="black60" />}
      width="100%"
      id="search"
      placeholder="Search docs"
    />
  )
}
