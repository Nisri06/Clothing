// Import necessary modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/luxethreads';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define User schema and model
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
}, { versionKey: false });

const User = mongoose.model('User', userSchema);

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare passwords directly (plaintext comparison)
        if (password === user.password) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(400).json({ message: 'Incorrect password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
