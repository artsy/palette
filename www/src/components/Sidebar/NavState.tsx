import { compact, includes, without } from "lodash"
import { Container } from "unstated"

export interface State {
  expandedNavItems: string[]
}

export class NavState extends Container<State> {
  state = {
    expandedNavItems: [],
  }

  constructor() {
    super()

    // TODO: It would be nice to get this directly from the router rather
    // than the window which isn't available during SSR pass.
    if (typeof window !== "undefined") {
      const segments = compact(window.location.pathname.split("/"))
      const parent = segments.slice(0, segments.length - 1)
      const relativePaths = parent.map(item => "/" + item)
      const absolutePath = "/" + parent.join("/")
      const expandedNavItems = [...relativePaths, absolutePath]

      this.state = {
        expandedNavItems,
      }
    }
  }

  toggleNavItem = navItem => {
    const { expandedNavItems } = this.state
    const hasNavItem = includes(expandedNavItems, navItem)

    const updated = hasNavItem
      ? without(expandedNavItems, navItem)
      : expandedNavItems.concat([navItem])

    console.log(updated)
    this.setState({
      expandedNavItems: updated,
    })
  }
}
