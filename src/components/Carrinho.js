import React, { Component } from "react";
import Modal from "react-modal";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { removeFromCarrinho } from "../actions/carrinhoActions";
import { createOrder, clearOrder } from "../actions/orderActions";
import { Zoom } from "react-reveal";

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
      total: this.props.carrinhoDeItens.reduce(
        (a, c) => a + c.preco * c.count,
        0
      ),
    };
    this.props.createOrder(order);
  };

  closeModal = (e) => {
    this.props.clearOrder();
  };

  render() {
    const { carrinhoDeItens, order } = this.props;
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

          {order && (
            <Modal isOpen={true} onRequestClose={this.closeModal}>
              <Zoom>
                <button className="close-modal" onClick={this.closeModal}>
                  Fechar
                </button>
                <div className="order-details">
                  <h3 className="success-message">
                    Pedido realizado com sucesso
                  </h3>
                  <h3>Pedido order: {order._id}</h3>
                  <ul>
                    <li>
                      <div>Nome:</div>
                      <div>{order.name}</div>
                    </li>
                    <li>
                      <div>Email:</div>
                      <div>{order.email}</div>
                    </li>
                    <li>
                      <div>Endereço:</div>
                      <div>{order.address}</div>
                    </li>
                    <li>
                      <div>Data do pedido:</div>
                      <div>{order.createdAt}</div>
                    </li>
                    <li>
                      <div>Total:</div>
                      <div>{formatCurrency(order.total)}</div>
                    </li>
                    <li>
                      <div>Carrrinho de Itens:</div>
                      <div>
                        {order.carrinhoDeItens.map((x) => (
                          <div>
                            {x.count} {" x "} {x.titulo}
                          </div>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </Zoom>
            </Modal>
          )}

          <div>
            <div className="cart">
              <Fade left cascade>
                <ul className="cart-items">
                  {carrinhoDeItens.map((item) => (
                    <li key={item._id}>
                      <div>
                        <img src={item.image} alt={item.titulo} />
                      </div>

                      <div>
                        <div>{item.titulo}</div>
                        <div className="right">
                          {formatCurrency(item.preco)} x {item.count}{" "}
                          <button
                            className="button"
                            onClick={() => this.props.removeFromCarrinho(item)}
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
    order: state.order.order,
    carrinhoDeItens: state.carrinho.carrinhoDeItens,
  }),
  {
    removeFromCarrinho,
    createOrder,
    clearOrder,
  }
)(Carrinho);
