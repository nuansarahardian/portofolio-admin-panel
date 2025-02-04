const express = require("express");
const {
  getAllLanguages,
  getLanguageById,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} = require("../controllers/languageController");

const router = express.Router();

router.get("/", getAllLanguages);
router.get("/:id", getLanguageById);
router.post("/", createLanguage);
router.put("/:id", updateLanguage);
router.delete("/:id", deleteLanguage);

module.exports = router;
