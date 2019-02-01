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

    /**
     * At the moment the NavTree will only ever have a depth of 2, so grab the
     * pathname and extract the first segment. This is so we can expand a nav
     * list if deep linking directly into a sub-nav item.
     *
     * `/foo` => 'foo'
     * `/foo/bar` => 'bar'
     *
     * TODO:
     * Figure out how to get `location.pathname` from the router rather
     * than the window. I think this will be problematic when we build the app
     * for prod due to SSR rendering.
     *
     * import { Location } from '@reach/router` will return it.
     */
    if (typeof window !== "undefined") {
      const expandedNavItems = ["/" + window.location.pathname.split("/")[1]]
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

    this.setState({
      expandedNavItems: updated,
    })
  }
}
