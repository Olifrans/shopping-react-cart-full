import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-result">{this.props.count} Produtos</div>

        <div className="filter-sort">
          Ordenar{" "}
          <select value={this.props.sort} onChange={this.props.sortProdutos}>
            <option>Mais Recentes</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </div>

        <div className="filter-size">
          Filtrar{" "}
          <select value={this.props.size} onChange={this.props.filterProdutos}>
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
