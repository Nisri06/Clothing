const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Clothes_DB");

// Define payment schema
const paymentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  cardNumber: String,
  expiryDate: String,
  total: Number,
  // Add other fields as needed
});

const Payment = mongoose.model("Payment", paymentSchema);

app.use(cors());
app.use(express.json());

// Route to store payment details
app.post("/api/payments", async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).send("Payment details saved successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
