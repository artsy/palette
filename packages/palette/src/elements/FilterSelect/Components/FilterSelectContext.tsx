import { reject } from "lodash"
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useReducer,
} from "react"
import { useUpdateEffect } from "../../../utils"
import { INITIAL_ITEMS_TO_SHOW } from "../../ShowMore"

export interface Item {
  label: string
  value: string
  [key: string]: string | number | boolean
}

// In order to satisfy the Relay compilers readonly list types. This is in
// support for passing different kinds of item types as props, like aggregations
export type Items = ReadonlyArray<Item>

export interface FilterSelectChangeState {
  items: FilterSelectContextProps["items"]
  filteredItems: FilterSelectContextProps["filteredItems"]
  selectedItems: FilterSelectContextProps["selectedItems"]
  query: FilterSelectContextProps["query"]
}

interface FilterSelectContextProps {
  items: Items
  filteredItems: Items
  initialItemsToShow: number
  isFiltered: boolean
  multiselect: boolean
  onChange: (state: FilterSelectChangeState) => void
  order: [string[], Array<"asc" | "desc">] // See: https://lodash.com/docs/4.17.15#orderBy
  placeholder: string
  query: string
  renderItemLabel?: (item: any) => string
  selectedItems: Items
  toggleSelectedItem: (item: Item) => void
  setQuery: (query: string) => void
  setSelectedItems: (items: Items) => void
}

export type FilterSelectState = Pick<
  FilterSelectContextProps,
  | "filteredItems"
  | "initialItemsToShow"
  | "items"
  | "isFiltered"
  | "multiselect"
  | "onChange"
  | "order"
  | "placeholder"
  | "renderItemLabel"
  | "query"
  | "selectedItems"
>

type Action =
  | { type: "SET_QUERY"; payload: { query: string } }
  | { type: "TOGGLE_SELECTED_ITEM"; payload: { item: Item } }
  | { type: "SET_SELECTED_ITEMS"; payload: { items: Items } }

const filterSelectReducer = (state: FilterSelectState, action: Action) => {
  switch (action.type) {
    case "SET_QUERY": {
      const { query } = action.payload

      if (query === "") {
        return {
          ...state,
          query,
          isFiltered: false,
          filteredItems: [],
        }
      }

      const filteredItems = state.items.filter(({ label: name }) => {
        return name.toLowerCase().includes(query.toLowerCase())
      })

      return {
        ...state,
        query,
        isFiltered: true,
        filteredItems,
      }
    }

    case "TOGGLE_SELECTED_ITEM": {
      const isFound = !!state.selectedItems.find(
        (item) => item.value === action.payload.item.value
      )

      let selectedItems
      if (isFound) {
        selectedItems = reject(state.selectedItems, {
          value: action.payload.item.value,
        })
      } else {
        selectedItems = state.multiselect
          ? [...state.selectedItems, action.payload.item]
          : [action.payload.item]
      }

      return {
        ...state,
        selectedItems,
      }
    }

    case "SET_SELECTED_ITEMS": {
      const { items } = action.payload

      return {
        ...state,
        selectedItems: items,
      }
    }
  }
}

const initialState: FilterSelectState = {
  filteredItems: [],
  initialItemsToShow: INITIAL_ITEMS_TO_SHOW,
  isFiltered: false,
  items: [],
  multiselect: true,
  onChange: (x) => x,
  order: [["label"], ["asc"]],
  placeholder: "",
  query: "",
  renderItemLabel: undefined,
  selectedItems: [],
}

const FilterSelectContext = createContext<FilterSelectContextProps>({} as any)

export const FilterSelectContextProvider: React.FC<
  Partial<FilterSelectState>
> = ({ children, ...props }) => {
  const [state, dispatch] = useReducer(filterSelectReducer, {
    ...initialState,
    ...props,
  })

  const contextValue = {
    ...state,

    toggleSelectedItem: (item) => {
      dispatch({
        type: "TOGGLE_SELECTED_ITEM",
        payload: { item },
      })
    },
    setQuery: (query) => {
      dispatch({
        type: "SET_QUERY",
        payload: { query },
      })
    },
    setSelectedItems: (items) => {
      dispatch({
        type: "SET_SELECTED_ITEMS",
        payload: {
          items,
        },
      })
    },
  }

  useUpdateEffect(() => {
    if (props.selectedItems) {
      contextValue.setSelectedItems(props.selectedItems)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedItems?.length])

  useLayoutEffect(() => {
    if (props.query?.length) {
      contextValue.setQuery(props.query)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FilterSelectContext.Provider value={contextValue}>
      {children}
    </FilterSelectContext.Provider>
  )
}

export const useFilterSelectContext = () => {
  return useContext(FilterSelectContext)
}
