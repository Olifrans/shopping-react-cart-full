import {
  FETCH_PRODUTOS,
  FILTER_PRODUTOS_BY_SIZE,
  ORDER_PRODUTOS_BY_PRICE,
} from "../types";

export const fetchProdutos = () => async (dispatch) => {
  const res = await fetch("/api/produtos");
  const data = await res.json();
  dispatch({
    type: FETCH_PRODUTOS,
    payload: data,
  });
};

export const filterProdutos = (produtos, size) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUTOS_BY_SIZE,
    payload: {
      size: size,
      itens:
        size === ""
          ? produtos
          : produtos.filter((x) => x.tamanhosDisponiveis.indexOf(size) >= 0),
    },
  });
};

export const sortProdutos = (filteredProdutos, sort) => (dispatch) => {
  const sortedProdutos = filteredProdutos.slice();

  if (sort === "recente") {
    sortedProdutos.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProdutos.sort((a, b) =>
      sort === "menor"
        ? a.preco > b.preco
          ? 1
          : -1
        : a.preco > b.preco
        ? -1
        : 1
    );
  }
  dispatch({
    type: ORDER_PRODUTOS_BY_PRICE,
    payload: {
      sort: sort,
      itens: sortedProdutos,
    },
  });
};
