import { Box, Text } from "@artsy/palette"
import { words } from "lodash"
import React from "react"
import { useScrollSpy } from "utils/useScrollSpy"

export const TOC = ({ headings }) => {
  if (!headings.length) {
    return null
  }

  const slugs = headings.map(({ value }) =>
    words(value).join("-").toLowerCase()
  )

  const activeSlug = useScrollSpy(
    slugs.map((slug) => `[href="#${slug}"]`),
    {
      // rootMargin: "0% 0% -80% 0%",
      // threshold: 0.1,
    }
  )

  return (
    <>
      <Text variant="xs" textTransform="uppercase" color="black60">
        On this page
      </Text>
      {headings.map(({ value }, idx) => {
        const slug = `#${slugs[idx]}`
        const color = slug === activeSlug ? "brand" : "black100"

        return (
          <Box key={idx}>
            <a href={slug} style={{ textDecoration: "none" }}>
              <Text variant="md" color={color}>
                {value}
              </Text>
            </a>
          </Box>
        )
      })}
    </>
  )
}
