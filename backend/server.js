const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

// Memuat variabel lingkungan dari file .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Menghubungkan ke MongoDB
mongoose
  .connect(process.env.MONGODB_URI)

  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Mulai server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Welcome to the Portfolio Admin Panel API");
});
