import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const addToCarrinho = (produto) => (dispatch, getState) => {
  const carrinhoDeItens = getState().carrinho.carrinhoDeItens.slice();
  let alreadyExiste = false;

  carrinhoDeItens.forEach((x) => {
    if (x._id === produto._id) {
      alreadyExiste = true;
      x.count++;
    }
  });
  if (!alreadyExiste) {
    carrinhoDeItens.push({ ...produto, count: 1 });
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { carrinhoDeItens },
  });
  localStorage.setItem("carrinhoDeItens", JSON.stringify(carrinhoDeItens));
};

export const removeFromCarrinho = (produto) => (dispatch, getState) => {
  const carrinhoDeItens = getState()
    .carrinho.carrinhoDeItens.slice()
    .filter((x) => x._id !== produto._id);
  dispatch({
    type: REMOVE_FROM_CART,
    payload: { carrinhoDeItens },
  });
  localStorage.setItem("carrinhoDeItens", JSON.stringify(carrinhoDeItens));
};
