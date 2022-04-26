

import { connect } from "mongoose";


const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

/*
This is my .env, I'm guessing the problem might be here too, Kindly help:
ATLAS_URI=mongodb+srv://userone:useronepassword1234@cluster0.swye5.mongodb.net/<dbname>?retryWrites=true&w=majority
https://stackoverflow.com/questions/65680842/error-mongooseerror-operation-users-insertone-buffering-timed-out-after-1

https://www.reddit.com/r/node/comments/obqp28/mongooseerror_operation_usersinsertone_buffering/
*/

//mongoose.connect('mongodb://username:password@host:port/database?options...');

//mongoose.connect('mongodb://localhost/shoppindb');

mongoose.connect('mongodb://localhost:27017/shoppindb');




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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Servidor ativo em http://localhost:5000"));
