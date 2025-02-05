const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import Routes
const aboutRoutes = require("./routes/aboutRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const heroRoutes = require("./routes/heroRoutes");
const languageRoutes = require("./routes/languageRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const projectRoutes = require("./routes/projectRoutes");
const toolRoutes = require("./routes/toolRoutes");
const workRoutes = require("./routes/workRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Koneksi ke MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Menggunakan Routes
app.use("/abouts", aboutRoutes);
app.use("/certificates", certificateRoutes);
app.use("/heroes", heroRoutes);
app.use("/languages", languageRoutes);
app.use("/organizations", organizationRoutes);
app.use("/projects", projectRoutes);
app.use("/tools", toolRoutes);
app.use("/works", workRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Portfolio Admin Panel API");
});

// Menjalankan Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
