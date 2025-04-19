import { useReducer } from "react";

import { TableActionType, TableStateType } from "../../types";

const initialState: TableStateType = {
  page: null,
  sort: null,
};

function reducer(state: TableStateType, action: TableActionType): TableStateType {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.page };
    case "SET_SORT":
      return { ...state, sort: action.sort };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function useTable() {
  return useReducer(reducer, initialState);
}
