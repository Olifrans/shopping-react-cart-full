import {
  FETCH_PRODUTOS,
  FILTER_PRODUTOS_BY_SIZE,
  ORDER_PRODUTOS_BY_PRICE,
} from "../types";

export const produtosReducers = (state = {}, action) => {
  switch (action.type) {
    case FILTER_PRODUTOS_BY_SIZE:
      return {
        ...state,
        size: action.payload.size,
        filteredItens: action.payload.itens,
      };

    case ORDER_PRODUTOS_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItens: action.payload.itens,
      };

    case FETCH_PRODUTOS:
      return { itens: action.payload, filteredItens: action.payload };
    default:
      return state;
  }
};
