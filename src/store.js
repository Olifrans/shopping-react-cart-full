import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { produtosReducers } from "./reducers/produtoReducers";
import { carrinhoReducers } from "./reducers/carrinhoReducers";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    produtos: produtosReducers,
    carrinho: carrinhoReducers,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
