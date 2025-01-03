const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Clothes_DB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define coupon schema
const couponSchema = new mongoose.Schema({
  code: String,
  valid: Boolean,
});
const Coupon = mongoose.model("Coupon", couponSchema);

app.use(cors());
app.use(express.json());

// Route to fetch coupon details by code
app.get("/api/coupons/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const coupon = await Coupon.findOne({ code: code });
    if (coupon) {
      res.json({ valid: coupon.valid });
    } else {
      res.json({ valid: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
