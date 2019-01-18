import { StatusBadge } from "components/StatusBadge"
import { graphql, Link, StaticQuery } from "gatsby"
import { get, includes } from "lodash"
import React, { Component, Fragment } from "react"
import styled from "styled-components"
import { pathListToTree, TreeNode } from "utils/pathListToTree"

import {
  ArtsyMarkIcon,
  Box,
  color,
  Sans,
  SansSize,
  Serif,
} from "@artsy/palette"

// TODO: Add `showInNav` frontmatter
const NAV_BLACKLIST = ["dev-404-page", "404", "404.html"]

export class Sidebar extends Component {
  treeDepth: number = 0

  renderNavTree(tree: TreeNode[]) {
    const getTreeLayout = () => {
      switch (this.treeDepth) {
        case 1: {
          return {
            ml: 2,
            size: "2" as SansSize,
          }
        }
        default: {
          return {
            ml: 0,
            size: "3" as SansSize,
          }
        }
      }
    }

    const { ml, size } = getTreeLayout()

    return (
      <Box ml={ml}>
        {tree.map(({ data, children, formattedName, path }: TreeNode) => {
          const isWIP = get(data, "frontmatter.wip")
          const hasChildren = Boolean(children.length)

          if (hasChildren) {
            this.treeDepth++
          }

          // prettier-ignore
          const label = hasChildren
            ? formattedName
            : <Link to={path}>{formattedName}</Link>

          return (
            <Fragment key={path}>
              <Sans size={size} py={0.2}>
                {label} {isWIP && !hasChildren && <StatusBadge status="WIP" />}
              </Sans>

              {hasChildren && this.renderNavTree(children)}
            </Fragment>
          )
        })}
      </Box>
    )
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query SidebarNavItemsQuery {
            allSitePage {
              edges {
                node {
                  path
                  context {
                    frontmatter {
                      name
                      wip
                    }
                  }
                }
              }
            }
          }
        `}
        render={queryData => {
          const navTree = buildNavTree(queryData)

          return (
            <Container pl={2}>
              <Link to="/">
                <Serif size="4">Palette</Serif>
              </Link>

              <Box mt={2} mb={4}>
                {this.renderNavTree(navTree)}
              </Box>

              <Box>
                <ArtsyMarkIcon width="30px" height="30px" mr={2} />
                <Sans size="1" color="black60">
                  Updated: Sept 3, 2018
                </Sans>
              </Box>
            </Container>
          )
        }}
      />
    )
  }
}

function buildNavTree(data) {
  const paths = data.allSitePage.edges.reduce((acc, { node }) => {
    const path = node.path.replace(/\/$/, "") // remove trailing slash
    if (path.length) {
      return [
        ...acc,
        {
          path,
          data: node.context,
        },
      ]
    } else {
      return acc
    }
  }, [])

  const navTree = pathListToTree(paths)
    .map(path => path.children)[0]
    .filter(path => !includes(NAV_BLACKLIST, path.name))

  return navTree
}

const Container = styled(Box)`
  border-right: 1px solid ${color("black10")};
  flex: 0 0 180px;
`
