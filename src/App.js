import React from "react";
import Produtos from "./components/Produtos";
import Filter from "./components/Filter";
import Carrinho from "./components/Carrinho";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
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
                <Produtos />
              </div>
              <div className="sidebar">
                <Carrinho />
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
