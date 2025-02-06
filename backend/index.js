require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const authRoutes = require('./Routes/AuthRouter');


const app = express();

// Middleware
app.use(cors({ origin: '*', credentials: true })); // Allow cross-origin requests
app.use(express.json());

// MongoDB Connection 
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/fiddle")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit process on failure
  });

// Routes
app.use('/api/auth', authRoutes);


// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
