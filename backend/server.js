const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const About = require("./models/aboutModel");
// Memuat variabel lingkungan dari file .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

app.post("/abouts", async (req, res) => {
  try {
    const about = await About.create(req.body);
    res.status(200).json(about);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
app.get("/abouts", async (req, res) => {
  try {
    const abouts = await About.find({});
    res.status(200).json(abouts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
app.get("/abouts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findById(id);
    res.status(200).json(about);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
app.put("/abouts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findByIdAndUpdate(id, req.body);
    if (!about) {
      return res.status(404).json({ message: `tidak bisa menemukan ID ${id}` });
    }
    const updatedAbout = await About.findById(id);
    res.status(200).json(updatedAbout);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
app.delete("/abouts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findByIdAndDelete(id, req.body);
    if (!about) {
      return res.status(404).json({ message: `tidak bisa menemukan ID ${id}` });
    }
    const updatedAbout = await About.findById(id);
    res.status(200).json(updatedAbout);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
