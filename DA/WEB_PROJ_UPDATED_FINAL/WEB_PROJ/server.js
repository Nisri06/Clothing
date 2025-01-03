const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Clothes_DB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
});
const mensFormal = mongoose.model("mens_formals", productSchema);
const mensInformal = mongoose.model("mens_informals", productSchema);
const womensFormal = mongoose.model("womens_formals", productSchema);
const womensInformal = mongoose.model("womens_informals", productSchema);

app.use(cors());

// Route to fetch product details
app.get("/api/mens_formalproducts", async (req, res) => {
  try {
    console.log(mensFormal);
    const products = await mensFormal.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
  console.log("Mens_form");
});
app.get("/api/mens_informalproducts", async (req, res) => {
  try {
    const products = await mensInformal.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
  console.log("Mens_inform");
});

app.get("/api/womens_formalproducts", async (req, res) => {
  try {
    const products = await womensFormal.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
  console.log("Women_form");
});

app.get("/api/womens_informalproducts", async (req, res) => {
  try {
    const products = await womensInformal.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
  console.log("Womens_infor");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
