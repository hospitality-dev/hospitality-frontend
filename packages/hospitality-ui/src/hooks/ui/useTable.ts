import { useReducer } from "react";

import { TableActionType, TableStateType } from "../../types";

const defaultState: TableStateType<unknown> = {
  page: null,
  sort: null,
};

function reducer<T>(state: TableStateType<T>, action: TableActionType<T>): TableStateType<T> {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.page };
    case "SET_SORT":
      return { ...state, sort: action.sort };
    case "RESET":
      return defaultState;
    default:
      return state;
  }
}

export function useTable<T>(initialState: TableStateType<T> = defaultState) {
  return useReducer(reducer<T>, initialState);
}
