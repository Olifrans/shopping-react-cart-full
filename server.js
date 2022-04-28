const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

// var data = require("./build/data.json");
const app = express();
app.use(bodyParser.json());

// //Deploy
// app.use("/", express.static(__dirname + "/build"));
// app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"));

/*
Problemas de conexão local no MongoDB:
https://stackoverflow.com/questions/65680842/error-mongooseerror-operation-users-insertone-buffering-timed-out-after-1
https://www.reddit.com/r/node/comments/obqp28/mongooseerror_operation_usersinsertone_buffering/
ATLAS_URI=mongodb+srv://userone:useronepassword1234@cluster0.swye5.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect('mongodb://username:password@host:port/database?options...');
mongoose.connect('mongodb://localhost/shoppindb');
mongoose.connect('mongodb://localhost:27017/shoppindb');
*/

// // //Conexão local MongoDB
// mongoose.connect(
//   process.env.MONGODB - URL || "mongodb://127.0.0.1:27017/shoppindb",
//   {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

//Conexão local MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/shoppindb");

//Model de produtos
const Produto = mongoose.model(
  "produtos",
  new mongoose.Schema({
    id: { type: String, default: shortid.generate },
    titulo: String,
    descricao: String,
    image: String,
    preco: Number,
    tamanhosDisponiveis: [String],
  })
);

//Get All produtos
app.get("/api/produtos", async (req, res) => {
  const produtos = await Produto.find({});
  res.send(produtos);
});

//Post produto
app.post("/api/produtos", async (req, res) => {
  const newProduto = new Produto(req.body);
  const saveProduto = await newProduto.save();
  res.send(saveProduto);
});

//Delete produto
app.delete("/api/produtos/:id", async (req, res) => {
  const deleteProduto = await Produto.findByIdAndDelete(req.params.id);
  res.send(deleteProduto);
});




//Model da Order-Pagamento
const Order = mongoose.model(
  "order",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      email: String,
      name: String,
      address: String,
      total: Number,
      carrinhoDeItens: [
        {
          _id: String,
          titulo: String,
          preco: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

//Post Order
app.post("/api/orders", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.carrinhoDeItens
  ) {
    return res.send({ message: "Os dados são obrigatórios." });
  }
  const order = await Order(req.body).save();
  res.send(order);
});




const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Servidor ativo em http://localhost:5000"));
