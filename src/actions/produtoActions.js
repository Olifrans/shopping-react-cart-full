import { FETCH_PRODUTOS } from "../types";

export const fetchProdutos = () => async (dispatch) => {
  const res = await fetch("/api/produtos");
  const data = await res.json();
  dispatch({
    type: FETCH_PRODUTOS,
    payload: data,
  });
};
