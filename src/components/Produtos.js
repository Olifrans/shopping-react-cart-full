import React, { Component } from "react";

export default class componentName extends Component {
  render() {
    return (
      <div>
        <ul className="produtos">
          {this.props.produtos.map((produto) => (
            <li key={produto._id}>
                <div className="produtos">

                </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
