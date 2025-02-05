const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getAllWorks,
  getWorkById,
  createWork,
  updateWork,
  deleteWork,
} = require("../controllers/workController");

const router = express.Router();

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique file name using timestamp
  },
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

router.get("/", getAllWorks);
router.get("/:id", getWorkById);

// Adjust the post route to handle image upload using multer
router.post("/", upload.single("logo"), createWork); // `image` is the field name in the frontend form
router.put("/:id", upload.single("logo"), updateWork); // Ensure `image` is handled in update as well
router.delete("/:id", deleteWork);

module.exports = router;
