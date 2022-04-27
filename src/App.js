import React from "react";
import { Provider } from "react-redux";
import Carrinho from "./components/Carrinho";
import Filter from "./components/Filter";
import Produtos from "./components/Produtos";
import data from "./data.json";
import store from "./store";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      produtos: data.produtos,
      carrinhoDeItens: localStorage.getItem("carrinhoDeItens")
        ? JSON.parse(localStorage.getItem("carrinhoDeItens"))
        : [],
      size: "",
      sort: "",
    };
  }

  createOrder = (order) => {
    alert("Salvar pedido ordem da pagamento" + order.name);
  };

  removeDoCarrinho = (produto) => {
    const carrinhoDeItens = this.state.carrinhoDeItens.slice();
    this.setState({
      carrinhoDeItens: carrinhoDeItens.filter((x) => x._id !== produto._id),
    });

    //Mock DB
    localStorage.setItem(
      "carrinhoDeItens",
      JSON.stringify(carrinhoDeItens.filter((x) => x.id !== produto._id))
    );
  };

  addToCarrinho = (produto) => {
    const carrinhoDeItens = this.state.carrinhoDeItens.slice();
    let alreadyInCarrinho = false;
    carrinhoDeItens.forEach((item) => {
      if (item.id === produto.id) {
        item.count++;
        alreadyInCarrinho = true;
      }
    });
    if (!alreadyInCarrinho) {
      carrinhoDeItens.push({ ...produto, count: 1 });
    }
    this.setState({ carrinhoDeItens });

    //Mock DB
    localStorage.setItem("carrinhoDeItens", JSON.stringify(carrinhoDeItens));
  };

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
            : a._id < b._id
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
      <Provider store={store}>

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
                  filterProdutos={this.filterProdutos}
                  sortProdutos={this.sortProdutos}
                />
                <Produtos
                  produtos={this.state.produtos}
                  addToCarrinho={this.addToCarrinho}
                />
              </div>
              <div className="sidebar">
                <Carrinho
                  carrinhoDeItens={this.state.carrinhoDeItens}
                  removeDoCarrinho={this.removeDoCarrinho}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
          <footer>Todos direitos reservados 2022</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
