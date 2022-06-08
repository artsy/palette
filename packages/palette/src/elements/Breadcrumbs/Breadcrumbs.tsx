import { themeGet } from "@styled-system/theme-get"
import React from "react"
import styled from "styled-components"
import { flattenChildren } from "../../helpers/flattenChildren"
import { Box, BoxProps } from "../Box"
import { Flex } from "../Flex"
import { Join } from "../Join"
import { Text } from "../Text"

const Li = styled(Text)`
  > a {
    color: ${themeGet("colors.black60")};
    text-decoration: none;

    &:hover {
      color: ${themeGet("colors.blue100")};
      text-decoration: underline;
    }
  }

  &:last-of-type {
    > a {
      color: ${themeGet("colors.black100")};

      &:hover {
        color: ${themeGet("colors.black100")};
        text-decoration: none;
      }
    }
  }
`

/** Breadcrumbs extends Box */
export type BreadcrumbsProps = BoxProps

/**
 * A breadcrumb trail consists of a list of links to the parent pages of the
 * current page in hierarchical order. It helps users find their place within
 * a website or web application. Breadcrumbs are often placed horizontally
 * before a page's main content.
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  children,
  ...rest
}) => {
  const cells = flattenChildren(children)

  return (
    <Box as="nav" aria-label="Breadcrumb" {...rest}>
      <Flex as="ol">
        <Join
          separator={
            <Text as="span" size="xs" color="black60" mx={1} aria-hidden="true">
              /
            </Text>
          }
        >
          {cells.map((cell: React.ReactElement<any>, i) => {
            return (
              <Li as="li" size="xs" key={i}>
                {i === cells.length - 1
                  ? React.cloneElement(cell, { "aria-current": "page" })
                  : cell}
              </Li>
            )
          })}
        </Join>
      </Flex>
    </Box>
  )
}
