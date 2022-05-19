import { Box, Text } from "@artsy/palette"
import Slugger from "github-slugger"
import { deburr } from "lodash"
import React from "react"
import { useScrollSpy } from "utils/useScrollSpy"

export const TableOfContents = ({ headings }) => {
  if (!headings.length) {
    return null
  }

  const slugs = headings.map(({ value }) => {
    const makeSlug = new Slugger()
    const slug = makeSlug.slug(value)
    const id = deburr(slug)
    return id
  })

  const activeSlug = useScrollSpy(
    slugs.map((slug) => `[href="#${slug}"]`),
    {
      rootMargin: "0% 0% -10% 0%",
    }
  )

  return (
    <>
      <Text variant="xs" textTransform="uppercase" color="black80" my={1}>
        On this page
      </Text>
      {headings.map(({ value }, idx) => {
        const slug = `#${slugs[idx]}`
        const isActive = slug === activeSlug
        const color = isActive ? "brand" : "black60"

        return (
          <Box key={idx} mb={1}>
            {/* <a href={slug} style={{ textDecoration: "none" }}> */}
            <Text variant="sm-display" color={color}>
              {value}
            </Text>
            {/* </a> */}
          </Box>
        )
      })}
    </>
  )
}
