import { globalHistory } from "@reach/router"
import { compact, includes, without } from "lodash"
import { Container } from "unstated"

export interface State {
  expandedNavItems: string[]
}

export class NavState extends Container<State> {
  state = {
    expandedNavItems: [],
  }

  constructor(path) {
    super()

    const pathname = path || globalHistory.location.pathname
    const segments = compact(pathname.split("/"))
    const parent = segments.slice(0, segments.length - 1)
    const relativePaths = parent.map(item => "/" + item)
    const absolutePath = "/" + parent.join("/")
    const expandedNavItems = [...relativePaths, absolutePath]

    this.state = {
      expandedNavItems,
    }
  }

  toggleNavItem = navItem => {
    const { expandedNavItems } = this.state
    const hasNavItem = includes(expandedNavItems, navItem)

    const updated = hasNavItem
      ? without(expandedNavItems, navItem)
      : expandedNavItems.concat([navItem])

    this.setState({
      expandedNavItems: updated,
    })
  }
}
