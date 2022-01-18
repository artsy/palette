import reject from "lodash.reject"
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useReducer,
} from "react"
import { INITIAL_ITEMS_TO_SHOW } from "../../ShowMore"

export interface Item {
  label: string
  value: string
  [key: string]: string | number | boolean
}

interface FilterSelectContextProps {
  items: Item[]
  filteredItems: Item[]
  initialItemsToShow: number
  isFiltered: boolean
  onChange: (state: {
    items: FilterSelectContextProps["items"]
    filteredItems: FilterSelectContextProps["filteredItems"]
    selectedItems: FilterSelectContextProps["selectedItems"]
    query: FilterSelectContextProps["query"]
  }) => void
  order: [string[], Array<"asc" | "desc">] // See: https://lodash.com/docs/4.17.15#orderBy
  placeholder: string
  query: string
  renderItemLabel?: (item: any) => string
  selectedItems: Item[]
  setSelectedItems: (item: Item) => void
  setQuery: (query: string) => void
}

export type FilterSelectState = Pick<
  FilterSelectContextProps,
  | "filteredItems"
  | "initialItemsToShow"
  | "items"
  | "isFiltered"
  | "onChange"
  | "order"
  | "placeholder"
  | "renderItemLabel"
  | "query"
  | "selectedItems"
>

type Action =
  | { type: "SET_QUERY"; payload: { query: string } }
  | { type: "SET_SELECTED_ITEMS"; payload: { item: Item } }

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

    case "SET_SELECTED_ITEMS": {
      const isFound = !!state.selectedItems.find(
        (item) => item.value === action.payload.item.value
      )

      const selectedItems = isFound
        ? reject(state.selectedItems, { value: action.payload.item.value })
        : [...state.selectedItems, action.payload.item]

      return {
        ...state,
        selectedItems,
      }
    }
  }
}

const initialState: FilterSelectState = {
  filteredItems: [],
  initialItemsToShow: INITIAL_ITEMS_TO_SHOW,
  isFiltered: false,
  items: [],
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

    setSelectedItems: (item) => {
      dispatch({
        type: "SET_SELECTED_ITEMS",
        payload: { item },
      })
    },
    setQuery: (query) => {
      dispatch({
        type: "SET_QUERY",
        payload: { query },
      })
    },
  }

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
