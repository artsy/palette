import { intersection, orderBy, uniqBy } from "es-toolkit"
import * as React from "react"
import { ShowMore } from "../ShowMore"
import { Flex } from "../Flex"
import { FilterSelectResultItem } from "./Components/FilterSelectResultItem"
import {
  FilterSelectContextProvider,
  FilterSelectState,
  Items,
  useFilterSelectContext,
} from "./Components/FilterSelectContext"
import { FilterInput } from "./Components/FilterInput"
import { VisuallyHidden } from "../VisuallyHidden"
import { Text } from "../Text"
import { INITIAL_ITEMS_TO_SHOW } from "../ShowMore"
import { useUpdateEffect } from "../../utils"
import { Box } from "../Box"
import { Clickable } from "../Clickable"
import { Stack } from "../Stack"

export type FilterSelectProps = Partial<FilterSelectState>

export const FilterSelect: React.FC<
  React.PropsWithChildren<FilterSelectProps>
> = (props) => {
  return (
    <FilterSelectContextProvider {...props}>
      <_FilterSelect />
    </FilterSelectContextProvider>
  )
}

const _FilterSelect: React.FC<React.PropsWithChildren<unknown>> = () => {
  const {
    enableSelectAll,
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

  if (!multiselect && enableSelectAll) {
    console.error(
      "FilterSelect: enableSelectAll is only available with multiselect mode."
    )
  }

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

  const orderItems = (items: Items) => orderBy([...items], order[0], order[1])
  const itemsOrdered = orderItems(items)
  const filteredItemsOrdered = orderItems(filteredItems)
  const itemsSorted = multiselect
    ? // Move selected items to the top
      uniqBy(selectedItems.concat(itemsOrdered), (x) => x.value)
    : itemsOrdered
  const expanded = isBelowTheFoldSelected(selectedItems, itemsSorted)
  const showNoResults = filteredItems.length === 0 && query !== ""
  const showSelectAll = multiselect && enableSelectAll && !showNoResults

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
        <>
          {showSelectAll && <SelectAll />}
          {filteredItemsOrdered.map((item) => (
            <FilterSelectResultItem key={item.value} {...item} />
          ))}
        </>
      ) : (
        <ShowMore
          expanded={expanded}
          initial={initialItemsToShow}
          variant={"xs"}
          textDecoration="underline"
          mt={1}
          textAlign="left"
        >
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

const SelectAll: React.FC = () => {
  const {
    items,
    filteredItems,
    onSelectAll,
    query,
    selectedItems,
    setSelectedItems,
  } = useFilterSelectContext()

  const isClearDisabled = selectedItems.length === 0

  return (
    <Box my={1}>
      <Stack gap={2} flexDirection={"row"}>
        <Clickable
          data-testid="filterSelect-selectAll"
          className="selectAll"
          onClick={() => {
            setSelectedItems(filteredItems)
            onSelectAll?.({
              items,
              filteredItems,
              selectedItems: filteredItems,
              query,
            })
          }}
          textDecoration="underline"
        >
          <Text variant="xs">Select all</Text>
        </Clickable>

        <Clickable
          data-testid="filterSelect-clear"
          className="clear"
          onClick={() => setSelectedItems([])}
          textDecoration="underline"
          disabled={isClearDisabled}
          color={isClearDisabled ? "mono60" : "mono100"}
        >
          <Text variant="xs">Clear</Text>
        </Clickable>
      </Stack>
    </Box>
  )
}
