// models/Product.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  quantity: Number,
  price: Number,
});

module.exports = mongoose.model("Product", productSchema);
