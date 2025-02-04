const express = require("express");
const {
  getAllAbouts,
  getAboutById,
  createAbout,
  updateAbout,
  deleteAbout,
} = require("../controllers/aboutController");

const router = express.Router();

router.get("/", getAllAbouts);
router.get("/:id", getAboutById);
router.post("/", createAbout);
router.put("/:id", updateAbout);
router.delete("/:id", deleteAbout);

module.exports = router;
