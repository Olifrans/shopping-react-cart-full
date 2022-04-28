import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const carrinhoReducers = (
  state = {
    carrinhoDeItens: JSON.parse(
      localStorage.getItem("carrinhoDeItens") || "[]"
    ),
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { carrinhoDeItens: action.payload.carrinhoDeItens };

    case REMOVE_FROM_CART:
      return { carrinhoDeItens: action.payload.carrinhoDeItens };

    default:
      return state;
  }
};
