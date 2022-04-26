# Projeto React-Shopping e Carrinho de Compra



## React Reveal é um framework de animação para React. É licenciado pelo MIT, tem uma pegada pequena e foi escrito especificamente para React no ES6. Ele pode ser usado para criar várias revelações legais em animações de rolagem em seu aplicativo. 
Para rolagem em cascata 
https://www.react-reveal.com/
yarn add react-reveal



## React-modal 
Componente de diálogo modal acessível para React.JS, Assim, criamos este modal de forma que atenda aos requisitos de acessibilidade da web moderna. 

https://reactcommunity.org/react-modal/
yarn add react-modal


## nodemon reload, automatically.
Nodemon is a utility depended on by over 1.5 million projects, that will monitor for any changes in your source and automatically restart your server. Perfect for development.
Swap nodemon instead of node to run your code, and now your process will automatically restart when your code changes. To install, get node.js, then from your terminal run:
https://nodemon.io/
npm install -g nodemon
yarn add nodemon




## Express4.18.0 Fast, unopinionated, minimalist web framework for Node.js
http://expressjs.com/
yarn add express




## Express4.18.0 Fast, unopinionated, minimalist web framework for Node.js
https://github.com/expressjs/body-parser
yarn add body-parser


## Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
https://mongoosejs.com/
yarn add mongoose

#### Observação Erro (throw new error_1.MongoParseError(`${optionWord} ${Array.from(unsupportedOptions).join(', ')} ${isOrAre} not supported`))

mongoose.connect("mongodb://localhost:27017/react-carrinho-compra", {
  //mongoose.connect('mongodb://localhost/react-carrinho-compra', {
useNewUrlParser: true,
useCreateIndex: true,
useFindAndModify: false,
useUnifiedTopology: true,
});

Correção:
useNewUrlParser, useUnifiedTopology, useFindAndModify e useCreateIndex não são mais opções com suporte. O Mongoose 6 sempre se comporta como se useNewUrlParser, useUnifiedTopology e useCreateIndex fossem verdadeiros e useFindAndModify fosse falso. Remova essas opções do seu código.

mongoose.connect("mongodb://localhost:27017/react-carrinho-compra", {
  //mongoose.connect('mongodb://localhost/react-carrinho-compra', {
});





## hortid is deprecated, because the architecture is unsafe. we instead recommend Nano ID, which has the advantage of also being significantly faster than shortid
https://github.com/dylang/shortid
yarn add shortid













This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
