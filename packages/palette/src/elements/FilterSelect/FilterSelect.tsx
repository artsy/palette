import { intersection, orderBy, uniqBy } from "lodash"
import * as React from "react"
import { ShowMore } from "../ShowMore"
import { Flex } from "../Flex"
import { FilterSelectResultItem } from "./Components/FilterSelectResultItem"
import {
  FilterSelectContextProvider,
  FilterSelectState,
  useFilterSelectContext,
} from "./Components/FilterSelectContext"
import { FilterInput } from "./Components/FilterInput"
import { VisuallyHidden } from "../VisuallyHidden"
import { Text } from "../Text"
import { INITIAL_ITEMS_TO_SHOW } from "../ShowMore"
import { useUpdateEffect } from "../../utils"

export type FilterSelectProps = Partial<FilterSelectState>

export const FilterSelect: React.FC<FilterSelectProps> = (props) => {
  return (
    <FilterSelectContextProvider {...props}>
      <_FilterSelect />
    </FilterSelectContextProvider>
  )
}

const _FilterSelect: React.FC = () => {
  const {
    filteredItems,
    initialItemsToShow,
    isFiltered,
    items,
    multiselect,
    onChange,
    order,
    query,
    selectedItems,
  } = useFilterSelectContext()

  // Dispatch change event
  useUpdateEffect(() => {
    if (onChange) {
      onChange({
        items,
        filteredItems,
        selectedItems,
        query,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange, selectedItems])

  if (items.length === 0) {
    return null
  }

  const orderItems = (items) => orderBy(items, order[0], order[1])
  const itemsOrdered = orderItems(items)
  const filterdItemsOrdered = orderItems(filteredItems)
  const itemsSorted = multiselect
    ? // Move selected items to the top
      uniqBy(selectedItems.concat(itemsOrdered), "value")
    : itemsOrdered
  const expanded = isBelowTheFoldSelected(selectedItems, itemsSorted)
  const showNoResults = filteredItems.length === 0 && query !== ""

  return (
    <Flex flexDirection="column">
      <FilterInput mb={1} />

      {query !== "" && (
        <VisuallyHidden aria-live="polite">
          {`${filteredItems.length} result${
            filteredItems.length === 1 ? "" : "s"
          }`}
        </VisuallyHidden>
      )}

      {showNoResults && <Text variant="sm">No results.</Text>}

      {isFiltered ? (
        filterdItemsOrdered.map((item) => (
          <FilterSelectResultItem key={item.value} {...item} />
        ))
      ) : (
        <ShowMore expanded={expanded} initial={initialItemsToShow}>
          {itemsSorted.map((item) => {
            return <FilterSelectResultItem key={item.value} {...item} />
          })}
        </ShowMore>
      )}
    </Flex>
  )
}

export const isBelowTheFoldSelected = (selectedItems, resultsSorted) => {
  const selected = selectedItems.map(({ value }) => value)
  const results = resultsSorted
    .slice(INITIAL_ITEMS_TO_SHOW)
    .map(({ value }) => value)
  const isSelected = intersection(selected, results).length > 0
  return isSelected
}
