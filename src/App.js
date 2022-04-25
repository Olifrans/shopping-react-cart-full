import React from "react";
import Filter from "./components/Filter";
import Produtos from "./components/Produtos";
import data from "./data.json";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      produtos: data.produtos,
      size: "",
      sort: "",
    };
  }

  sortProdutos = (evento) => {
    const sort = evento.target.value;

    console.log(evento.target.value);

    this.setState((state) => ({
      sort: sort,
      produtos: this.state.produtos
        .slice()
        .sort((a, b) =>
          sort === "menor"
            ? a.preco > b.preco
              ? 1
              : -1
            : sort === "maior"
            ? a.preco < b.preco
              ? 1
              : -1
            : a.id < b.id
            ? 1
            : -1
        ),
    }));
  };

  filterProdutos = (evento) => {
    console.log(evento.target.value);
    if (evento.target.value === "") {
      this.setState({ size: evento.target.value, produto: data.produtos });
    } else {
      this.setState({
        size: evento.target.value,
        produtos: data.produtos.filter(
          (produto) =>
            produto.tamanhosDisponiveis.indexOf(evento.target.value) >= 0
        ),
      });
    }
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping</a>
        </header>

        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.produtos.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProdutos={this.state.filterProdutos}
                sortProdutos={this.state.sortProdutos}
              />
              <Produtos produtos={this.state.produtos} />
            </div>
            <div className="sidebar">Itens do Carrinho</div>
          </div>
        </main>

        <footer>Todos direitos reservados</footer>
      </div>
    );
  }
}

export default App;
