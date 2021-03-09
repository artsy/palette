import React from "react"

export interface TabProps {
  /** Display name of the Tab */
  name: string | JSX.Element
  /**
   * Arbitrary data that can be associated with a Tab.
   * Will be passed to the parent <Tabs>'s onChange handler.
   */
  data?: any
}

/**
 * An individual tab.
 * Does nothing on its own; props are deal with inside of Tabs.
 */
export const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>
