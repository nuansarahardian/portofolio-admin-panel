const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getAllCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} = require("../controllers/certificateController");

const router = express.Router();

// Set storage engine untuk multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Tempat untuk menyimpan file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file yang unik
  },
});

// Inisialisasi multer
const upload = multer({ storage: storage });

// Route POST untuk membuat certificate dengan upload gambar
router.post("/", upload.single("image"), createCertificate);
router.get("/", getAllCertificates);
router.get("/:id", getCertificateById);
router.put("/:id", upload.single("image"), updateCertificate);
router.delete("/:id", deleteCertificate);

module.exports = router;
