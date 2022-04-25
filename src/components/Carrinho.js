import React, { Component } from "react";
import formatCurrency from "../util";

export default class Carrinho extends Component {
  render() {
    const { carrinhoDeItens } = this.props;
    return (
      <>
        <div>
          {carrinhoDeItens.length === 0 ? (
            <div className="cart cart-header">Carrinho esta vazio</div>
          ) : (
            <div className="cart cart-header">
              Voce tem {carrinhoDeItens.length} no carrinho{" "}
            </div>
          )}

          <div>
            <div className="cart">
              <ul className="cart-items">
                {carrinhoDeItens.map((item) => (
                  <li key={item.id}>
                    <div>
                      <img src={item.image} alt={item.titulo} />
                    </div>

                    <div>
                      <div>{item.titulo}</div>
                      <div className="right">
                        {formatCurrency(item.preco)} x {item.count}{" "}
                        <button
                          className="button"
                          onClick={() => this.props.removeDoCarrinho(item)}
                        >
                          Remover{" "}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {carrinhoDeItens.length !== 0 && (
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(
                      carrinhoDeItens.reduce((a, c) => a + c.preco * c.count, 0)
                    )}
                  </div>
                  <button className="button primary" onClick={""}>
                    Efetuar Pagamento
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </>
    );
  }
}
