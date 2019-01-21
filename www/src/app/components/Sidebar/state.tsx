import { includes, without } from "lodash"
import { Container } from "unstated"

export interface State {
  expandedNavItems: string[]
}

export class NavState extends Container<State> {
  state = {
    expandedNavItems: [],
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
