import { createContext, useContext, useReducer } from "react";

const HANDLERS = {
  ROW: 'ROW',
  PAGE: 'PAGE',
  SEARCH: 'SEARCH',
};

const initialState = {
  row: 10,
  page: 1,
  search: '',
};

const rowOptions = [5, 10, 25];

const handlers = {
  [HANDLERS.ROW]: (state, action) => {
    const { row } = action.payload;

    return {
      ...state,
      row,
    };
  },
  [HANDLERS.PAGE]: (state, action) => {
    const { page } = action.payload

    return {
      ...state,
      page,
    };
  },
  [HANDLERS.SEARCH]: (state, action) => {
    const { search } = action.payload

    return {
      ...state,
      search,
    };
  },
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const rowHandler = (row) => dispatch({ type: HANDLERS.ROW, payload: { row } })

  const pageHandler = (page) => dispatch({ type: HANDLERS.PAGE, payload: { page } })

  const searchHandler = (search) => dispatch({ type: HANDLERS.SEARCH, payload: { search } })

  return (
    <TableContext.Provider
      value={{
        query: state,
        rowOptions,
        rowHandler,
        pageHandler,
        searchHandler,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

export const useTableContext = () => {
  const context = useContext(TableContext)

  if (!context) {
    throw Error('context must be used in its place')
  }

  return context
}