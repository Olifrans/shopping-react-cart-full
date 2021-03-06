import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProdutos } from "../actions/produtoActions";
import { addToCarrinho } from "../actions/carrinhoActions";

class Produtos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produto: null,
    };
  }

  componentDidMount() {
    this.props.fetchProdutos();
  }

  openModal = (produto) => {
    this.setState({ produto });
  };

  closeModal = () => {
    this.setState({ produto: null });
  };

  render() {
    const { produto } = this.state;

    return (
      <div>
        <Fade bottom cascade>
          {!this.props.produtos ? (
            <div>Loading...</div>
          ) : (
            <ul className="produtos">
              {this.props.produtos.map((produto) => (
                <li key={produto._id}>
                  <div className="produtos">
                    <a
                      href={"#" + produto._id}
                      onClick={() => this.openModal(produto)}
                    >
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
          )}
        </Fade>

        {produto && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                X
              </button>
              <div className="product-details">
                <img src={produto.image} alt={produto.titulo}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{produto.titulo}</strong>
                  </p>
                  <p>{produto.descricao}</p>
                  <p>
                    Tamanhos disponiveis:{" "}
                    {produto.tamanhosDisponiveis.map((X) => (
                      <span>
                        {" "}
                        <button className="button">{X}</button>
                      </span>
                    ))}
                  </p>
                  <div className="produto-price">
                    <div>{formatCurrency(produto.preco)}</div>

                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCarrinho(produto);
                        this.closeModal();
                      }}
                    >
                      Adcionar no Carrinho
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({ produtos: state.produtos.filteredItens }),
  {
    fetchProdutos,
    addToCarrinho,
  }
)(Produtos);
