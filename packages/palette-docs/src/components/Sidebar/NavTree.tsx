import { Box, ChevronIcon, Spacer, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { StatusBadge } from "components/StatusBadge"
import { graphql, Link, useStaticQuery } from "gatsby"
import { includes, reject, sortBy } from "lodash"
import React, { Fragment } from "react"
import { useLayoutEffect } from "react"
import scrollIntoView from "scroll-into-view-if-needed"
import styled from "styled-components"
import { Subscribe } from "unstated"
import { pathListToTree, TreeNode } from "utils/pathListToTree"
import { NavState } from "./NavState"

export const NavTree = (_props) => {
  const data = useStaticQuery(
    graphql`
      query NavTreeQuery {
        allMdx {
          edges {
            node {
              fields {
                route
              }
              frontmatter {
                expandSubNav
                hideInNav
                navSpacer {
                  mt
                }
                name
                order
                subNavOrder
                status
              }
            }
          }
        }
      }
    `
  )

  useLayoutEffect(() => {
    const activeNavLinkRef = document.querySelector(".isActive")
    if (!activeNavLinkRef) {
      return
    }

    scrollIntoView(activeNavLinkRef, {
      scrollMode: "if-needed",
      block: "center",
      inline: "nearest",
    })
  }, [])

  const navTree = renderNavTree(buildNavTree(data))
  return navTree
}

function renderNavTree(tree: TreeNode[], treeDepth: number = 0) {
  const getTreeLayout = () => {
    if (treeDepth > 0) {
      return {
        ml: 2,
        py: 0.5,
        variant: "md",
      }
    } else {
      return {
        ml: 0,
        py: "10px",
        variant: "lg",
        color: "black60",
      }
    }
  }

  const { ml, py, variant } = getTreeLayout()

  return (
    <Subscribe to={[NavState]}>
      {(navState: NavState) => (
        <Box ml={ml}>
          {tree.map(({ data, children, path }: TreeNode) => {
            const hasChildren = Boolean(children.length)
            const { status, navSpacer = {}, expandSubNav, name } = data

            switch (hasChildren) {
              case true: {
                treeDepth++

                // Top level sorting is by `order`; subnav ordering is by `subNavOrder`
                const orderedChildren = sortBy(
                  children,
                  (child) => child.data.subNavOrder
                ) as TreeNode[]

                const expanded =
                  expandSubNav ||
                  isExpanded(navState.state.expandedNavItems, path)

                return (
                  <Fragment key={path}>
                    <Text variant={variant} py={py} {...navSpacer}>
                      {/*
                        Don't navigate, just toggle subnav open and closed
                      */}
                      <NavLink
                        disableNavigation
                        expandSubNav={expandSubNav}
                        to={path}
                        onClick={() => {
                          navState.toggleNavItem(path)

                          // Recompute tree since subnav could be open or closed
                          treeDepth = 0
                        }}
                      >
                        {name}

                        {!expandSubNav && (
                          <Box position="relative" top="-15px" mr={1}>
                            <ChevronIcon
                              width="10px"
                              height="10px"
                              direction={expanded ? "up" : "down"}
                              fill="black60"
                              style={{
                                float: "right",
                              }}
                            />
                          </Box>
                        )}
                      </NavLink>
                    </Text>
                    {expanded && (
                      <>
                        {renderNavTree(orderedChildren, treeDepth)}
                        <Spacer mb={0.5} />
                      </>
                    )}
                  </Fragment>
                )
              }
              case false: {
                return (
                  <Fragment key={path}>
                    <NavLink to={path}>
                      <Text variant={variant} py={py} {...navSpacer}>
                        {name} {status && <StatusBadge status={status} />}
                      </Text>
                    </NavLink>
                  </Fragment>
                )
              }
            }
          })}
        </Box>
      )}
    </Subscribe>
  )
}

// TODO: Add type once Apollo generator is fixed
function buildNavTree(data) {
  const routes = data.allMdx.edges.reduce((acc, { node }) => {
    const { route } = node.fields
    if (route.length) {
      return [
        ...acc,
        {
          path: route,
          data: node.frontmatter,
        },
      ]
    } else {
      return acc
    }
  }, [])

  // Perform various operations depending on frontmatter
  const sorted = sortBy(routes, (route) => route.path)
  const ordered = sortBy(sorted, (route) => route.data.order)
  const visible = reject(ordered, (route) => route.data.hideInNav)
  const navTree = pathListToTree(visible).map((path) => path.children)[0]
  return navTree
}

function isExpanded(expandedNavItems, currPath) {
  return includes(expandedNavItems, currPath)
}

const NavLinkWrapper = ({
  className,
  children,
  disableNavigation,
  to,
  ...props
}) => {
  /**
   * If a nav item is disabled and has children it will toggle its children
   * open and closed, but not navigate. If we want parent nav items to show
   * their own page *and* toggle, set this prop to false.
   */
  if (disableNavigation) {
    return (
      <Box className={className} {...props}>
        {children}
      </Box>
    )
  } else {
    return (
      <Link
        to={to + "/"} // FIXME: Resolve issue with trailing slashes -- make consistent
        activeClassName="isActive"
        className={className + " noUnderline"}
        style={{ textDecoration: "none" }}
        {...props}
      >
        {children}
      </Link>
    )
  }
}

const NavLink = styled(NavLinkWrapper)<{ expandSubNav?: boolean }>`
  display: flex;
  ${({ expandSubNav }) => {
    const cursor = expandSubNav ? "initial" : "pointer"
    return `
      cursor: ${cursor};
    `
  }}
  &:hover {
    text-decoration: none;
  }
  &&.isActive {
    color: ${themeGet("colors.brand")};
    &:before {
      content: " \u2014 ";
      position: relative;
      top: 3px;
      padding-right: 4px;
    }
  }
`
