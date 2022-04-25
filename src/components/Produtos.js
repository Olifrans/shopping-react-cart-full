import React, { Component } from "react";
import formatCurrency from "../util";

export default class Produtos extends Component {
  render() {
    return (
      <div>
        <ul className="produtos">
          {this.props.produtos.map((produto) => (
            <li key={produto.id}>
              <div className="produtos">
                <a href={"#" + produto.id}>
                  <img src={produto.image} alt={produto.titulo}></img>
                  <p>{produto.titulo}</p>
                </a>
              </div>

              <div className="produto-price">
                <div>{formatCurrency(produto.preco)}</div>
                <button
                  onClick={() => this.props.addToCarrinho(produto)}
                  className="button primary"
                >
                  Adcionar ao Carrinho
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
