const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getAllOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  deleteOrganization,
} = require("../controllers/organizationController");

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

router.get("/", getAllOrganizations);
router.get("/:id", getOrganizationById);
router.post("/", upload.single("logo"), createOrganization);
router.put("/:id", upload.single("logo"), updateOrganization);
router.delete("/:id", deleteOrganization);

module.exports = router;
