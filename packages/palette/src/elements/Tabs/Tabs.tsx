import React, { useCallback, useState } from "react"
import styled from "styled-components"
import { flattenChildren } from "../../helpers/flattenChildren"
import { useUpdateEffect } from "../../utils/useUpdateEffect"
import { BaseTabs, BaseTabsProps } from "../BaseTabs"
import { BaseTab } from "../BaseTabs"
import { Clickable } from "../Clickable"
import { Sans } from "../Typography"

export interface TabLike extends JSX.Element {
  props: TabProps
}

export interface TabInfo extends TabProps {
  /** Index of the newly selected Tab */
  tabIndex: number
  /**
   * Arbitrary data that can be associated with a Tab.
   * Will be passed to the parent <Tabs>'s onChange handler.
   */
  data: any
}

export interface TabsProps extends BaseTabsProps {
  children: TabLike[]
  /** Space or visual divider between tabs */
  separator?: JSX.Element
  /** Index of the Tab that should be pre-selected */
  initialTabIndex?: number
  /** @deprecated */
  autoScroll?: boolean
  /** Function that will be called when a new Tab is selected */
  onChange?: (tabInfo?: TabInfo) => void
}

/** Tabs functionality */
export const useTabs = ({
  children,
  initialTabIndex = 0,
  onChange,
}: TabsProps) => {
  const tabs = flattenChildren<TabLike>(children)

  const [activeTabIndex, setActiveTabIndex] = useState<number>(initialTabIndex)
  const activeTab = tabs[activeTabIndex]

  // If the `initialTabIndex` changes; update the active one
  useUpdateEffect(() => {
    setActiveTabIndex(initialTabIndex)
  }, [initialTabIndex])

  const handleClick = useCallback(
    (index: number) => {
      return () => {
        if (index === activeTabIndex) return

        setActiveTabIndex(index)

        if (!onChange) return

        onChange({
          tabIndex: index,
          name: tabs[index].props.name,
          data: tabs[index].props.data ?? {},
        })
      }
    },
    [tabs, onChange, activeTabIndex]
  )

  return {
    tabs,
    activeTab,
    activeTabIndex,
    handleClick,
  }
}

/** A tab bar navigation component */
export const Tabs: React.FC<TabsProps> = ({
  children,
  initialTabIndex = 0,
  onChange,
  ...rest
}) => {
  const { tabs, activeTab, activeTabIndex, handleClick } = useTabs({
    children,
    initialTabIndex,
    onChange,
  })

  return (
    <>
      <BaseTabs {...rest}>
        {tabs.map((cell, i) => {
          return (
            <Clickable
              key={i}
              aria-selected={i === activeTabIndex}
              onClick={handleClick(i)}
            >
              <BaseTab active={i === activeTabIndex}>{cell.props.name}</BaseTab>
            </Clickable>
          )
        })}
      </BaseTabs>

      {activeTab}
    </>
  )
}

Tabs.defaultProps = {
  mb: 2,
}

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
 * Does nothing on its own; props are dealt with inside of Tabs.
 */
export const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>

// TODO: Support count directly
const SupWrapper = styled.sup`
  margin-left: 2px;
`

/** Embeddable sup container */
export const Sup: React.FC = ({ children }) => (
  <SupWrapper>
    <Sans size="1" weight="medium" display="inline">
      {children}
    </Sans>
  </SupWrapper>
)
