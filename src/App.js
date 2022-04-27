import React from "react";
import Produtos from "./components/Produtos";
import Filter from "./components/Filter";
import Carrinho from "./components/Carrinho";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      carrinhoDeItens: localStorage.getItem("carrinhoDeItens")
        ? JSON.parse(localStorage.getItem("carrinhoDeItens"))
        : [],
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
    localStorage.setItem("carrinhoDeItens", JSON.stringify(carrinhoDeItens));
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
                <Filter />
                <Produtos addToCarrinho={this.addToCarrinho} />
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
