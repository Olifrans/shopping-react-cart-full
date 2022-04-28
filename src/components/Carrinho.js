import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";

import { connect } from "react-redux";
import { removeFromCarrinho } from "../actions/carrinhoActions";

class Carrinho extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      carrinhoDeItens: this.props.carrinhoDeItens,
    };
    this.props.createOrder(order);
  };

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
              <Fade left cascade>
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
              </Fade>
            </div>

            {carrinhoDeItens.length !== 0 && (
              <div>
                <div className="cart">
                  <div className="total">
                    <div>
                      Total:{" "}
                      {formatCurrency(
                        carrinhoDeItens.reduce(
                          (a, c) => a + c.preco * c.count,
                          0
                        )
                      )}
                    </div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.setState({ showCheckout: true });
                      }}
                    >
                      Efetuar Pagamento
                    </button>
                  </div>
                </div>

                {this.state.showCheckout && (
                  <Fade right cascade>
                    <div className="cart">
                      <form onSubmit={this.createOrder}>
                        <ul className="form-container">
                          <li>
                            <label>Email</label>
                            <input
                              name="email"
                              type="email"
                              required
                              onChange={this.handleInput}
                            ></input>
                          </li>

                          <li>
                            <label>Nome</label>
                            <input
                              name="name"
                              type="text"
                              required
                              onChange={this.handleInput}
                            ></input>
                          </li>

                          <li>
                            <label>Endereço</label>
                            <input
                              name="address"
                              type="text"
                              required
                              onChange={this.handleInput}
                            ></input>
                          </li>

                          <li>
                            <button type="submit" className="button primary">
                              Efetuar Checkout
                            </button>
                          </li>
                        </ul>
                      </form>
                    </div>
                  </Fade>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default connect(
  (state) => ({
    carrinhoDeItens: state.carrinho.carrinhoDeItens,
  }),
  {
    removeFromCarrinho,
  }
)(Carrinho);
