import React, { useState } from "react"
import { flattenChildren } from "../../helpers/flattenChildren"
import { useUpdateEffect } from "../../utils/useUpdateEffect"
import { BaseTabs, BaseTabsProps } from "../BaseTabs"
import { TabProps } from "./Tab"
import { TabsTab, TabsTabProps } from "./TabsTab"

export interface TabLike extends JSX.Element {
  props: TabProps
}

export interface TabInfo extends TabProps {
  /** Index of the newly selected Tab */
  tabIndex: number
}

export interface TabsProps extends BaseTabsProps {
  children: TabLike[]
  /** Space or visual divider between tabs */
  separator?: JSX.Element
  /** Index of the Tab that should be pre-selected */
  initialTabIndex?: number
  /** @deprecated */
  autoScroll?: boolean
  /** Pass a custom Tab button */
  Tab?: typeof TabsTab | React.FC<TabsTabProps>
  /** Function that will be called when a new Tab is selected */
  onChange?: (tabInfo?: TabInfo) => void
}

/** A tab bar navigation component */
export const Tabs: React.FC<TabsProps> = ({
  children,
  initialTabIndex = 0,
  Tab = TabsTab,
  onChange,
  ...rest
}) => {
  const tabs = flattenChildren<TabLike>(children)

  const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex)
  const activeTab = tabs[activeTabIndex]

  // If the `initialTabIndex` changes; update the active one
  useUpdateEffect(() => {
    setActiveTabIndex(initialTabIndex)
  }, [initialTabIndex])

  // Call `onChange` when `activeTabIndex` updates
  useUpdateEffect(() => {
    if (!onChange) return

    onChange({
      ...activeTab.props,
      tabIndex: activeTabIndex,
    })
  }, [onChange, activeTab, activeTabIndex])

  return (
    <>
      <BaseTabs {...rest}>
        {tabs.map((cell, i) => {
          return (
            <Tab
              key={i}
              index={i}
              active={i === activeTabIndex}
              aria-selected={i === activeTabIndex}
              onClick={() => {
                setActiveTabIndex(i)
              }}
            >
              {cell.props.name}
            </Tab>
          )
        })}
      </BaseTabs>

      {activeTab}
    </>
  )
}

Tabs.defaultProps = {
  justifyContent: "left",
  mb: 2,
}
