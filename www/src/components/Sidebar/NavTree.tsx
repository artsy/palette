import { Box, ChevronIcon, color, Sans, SansSize, Spacer } from "@artsy/palette"
import { StatusBadge } from "components/StatusBadge"
import { graphql, Link, StaticQuery } from "gatsby"
import { includes, reject, sortBy } from "lodash"
import React, { Fragment } from "react"
import styled from "styled-components"
import { Subscribe } from "unstated"
import { pathListToTree, TreeNode } from "utils/pathListToTree"
import { NavState } from "./NavState"

export const NavTree = _props => {
  return (
    <StaticQuery
      query={graphql`
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
                  wip
                }
              }
            }
          }
        }
      `}
      render={data => {
        return renderNavTree(buildNavTree(data))
      }}
    />
  )
}

function renderNavTree(tree: TreeNode[], treeDepth: number = 0) {
  const getTreeLayout = () => {
    if (treeDepth > 0) {
      return {
        ml: 2,
        py: 0.3,
        size: "2" as SansSize,
      }
    } else {
      return {
        ml: 0,
        py: 0.2,
        size: "3" as SansSize,
      }
    }
  }

  const { ml, py, size } = getTreeLayout()

  return (
    <Subscribe to={[NavState]}>
      {(navState: NavState) => (
        <Box ml={ml}>
          {tree.map(({ data, children, path }: TreeNode) => {
            const hasChildren = Boolean(children.length)
            const { wip, navSpacer = {}, expandSubNav, name } = data

            switch (hasChildren) {
              case true: {
                treeDepth++

                // Top level sorting is by `order`; subnav ordering is by `subNavOrder`
                const orderedChildren = sortBy(
                  children,
                  child => child.data.subNavOrder
                )

                const expanded =
                  expandSubNav ||
                  isExpanded(navState.state.expandedNavItems, path)

                return (
                  <Fragment key={path}>
                    <Sans size={size} py={py} {...navSpacer}>
                      {/*
                        Don't navigate, just toggle subnav open and closed
                      */}
                      <NavLink
                        disableNavigation
                        to={path}
                        onClick={() => {
                          navState.toggleNavItem(path)

                          // Recompute tree since subnav could be open or closed
                          treeDepth = 0
                        }}
                      >
                        {name}

                        <ChevronIcon
                          direction={expanded ? "down" : "right"}
                          fill={color("black30")}
                          top={-1}
                          mr={1}
                          style={{
                            float: "right",
                          }}
                        />
                      </NavLink>
                    </Sans>
                    {expandSubNav ||
                      (expanded && (
                        <>
                          {renderNavTree(orderedChildren, treeDepth)}
                          <Spacer mb={0.5} />
                        </>
                      ))}
                  </Fragment>
                )
              }
              case false: {
                return (
                  <Fragment key={path}>
                    <Sans size={size} py={py} {...navSpacer}>
                      <NavLink to={path}>
                        {name} {wip && <StatusBadge status="WIP" />}
                      </NavLink>
                    </Sans>
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
  const sorted = sortBy(routes, route => route.path)
  const ordered = sortBy(sorted, route => route.data.order)
  const visible = reject(ordered, route => route.data.hideInNav)
  const navTree = pathListToTree(visible).map(path => path.children)[0]
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
        {...props}
      >
        {children}
      </Link>
    )
  }
}

const NavLink = styled(NavLinkWrapper)`
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }

  &&.isActive {
    &:before {
      content: " – ";
    }
  }
`
