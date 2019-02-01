import { includes, without } from "lodash"
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

    if (typeof window !== "undefined") {
      this.state = {
        // TODO: It would be nice to get this directly from the router rather
        // than the window which isn't available during SSR pass.
        expandedNavItems: [window.location.pathname],
      }
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
