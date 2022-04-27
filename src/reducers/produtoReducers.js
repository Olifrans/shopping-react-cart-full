import { FETCH_PRODUTOS } from "../types";

export const produtosReducers = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRODUTOS:
      return { itens: action.payload };
    default:
      return state;
  }
};
