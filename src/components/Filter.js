import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProdutos, sortProdutos } from "../actions/produtoActions";

class Filter extends Component {
  render() {
    return this.props.filteredProdutos ? (
      <div>Loading...</div>
    ) : (
      <div className="filter">
        <div className="filter-result">
          {this.props.filteredProdutos.length} Produtos
        </div>

        <div className="filter-sort">
          Ordenar{" "}
          <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProdutos(
                this.props.filteredProdutos,
                e.target.value
              )
            }
          >
            <option value="recente">Mais Recentes</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </div>

        <div className="filter-size">
          Filtrar{" "}
          <select
            value={this.props.size}
            onChange={(e) =>
              this.props.filterProdutos(this.props.produtos, e.target.value)
            }
          >
            <option value="">Todos</option>
            <option value="PP">PP</option>
            <option value="P">P</option>
            <option value="M">M</option>
            <option value="G">G</option>
            <option value="GG">GG</option>
            <option value="XGG">XGG</option>
          </select>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    size: state.produtos.size,
    sort: state.produtos.sort,
    produtos: state.produtos.itens,
    filteredProdutos: state.produtos.filteredItens,
  }),
  {
    filterProdutos,
    sortProdutos,
  }
)(Filter);
