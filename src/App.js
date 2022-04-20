import React from "react";
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

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping</a>
        </header>

        <main>
          <div className="content">
            <div className="main">Produtos</div>
            <div className="sidebar">Itens do Carrinho</div>
          </div>
        </main>

        <footer>Todos direitos reservados</footer>
      </div>
    );
  }
}

export default App;
