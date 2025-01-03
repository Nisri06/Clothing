const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 4000; // You can change the port as needed

app.use(cors());

// MongoDB connection URI (replace with your actual MongoDB URI)
const mongoURI = "mongodb://localhost:27017/luxethreads"; // Assuming "luxethreads" is your database name

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define User schema and model
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

// Middleware to parse JSON data
app.use(express.json());

// Signup endpoint
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
